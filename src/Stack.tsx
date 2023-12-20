import { forwardRef, LegacyRef, useEffect } from 'react';

type StackProps = {
  project: string;
  innerRef?: LegacyRef<HTMLIFrameElement> | undefined;
  width?: string;
  fixed?: boolean;
};

const Stack = forwardRef(function Stack({
  project,
  innerRef,
  width = '35rem',
  fixed = true,
}: StackProps) {
  const height = '38.5rem';

  const adjustWidth = (w: string) => {
    const minWidth = '15rem';
    const minWidthNumeric = parseFloat(minWidth);
    const unitMatch = w.match(/(rem|px|em|%)$/);
    let adjustedWidth = '';

    if (unitMatch) {
      const numericPart = parseFloat(w);
      if (isNaN(numericPart)) {
        throw new Error(
          `Invalid width: "${w}". The numeric part of the width is not a valid number.`
        );
      }

      if (numericPart < minWidthNumeric) {
        console.warn(
          `Width is too small (${numericPart}${unitMatch[0]}). Adjusting to minimum width (${minWidth}${unitMatch[0]}).`
        );
        adjustedWidth = minWidth;
      } else {
        adjustedWidth = w;
      }
    } else {
      throw new Error(
        `Invalid width: "${w}". Width must be a numeric value followed by a unit (e.g., '35rem', '100px').`
      );
    }

    return { adjustedWidth };
  };

  useEffect(() => {
    const iframe = document.getElementById('responsiveIframe');
    if (iframe) {
      try {
        // Adjust width only as height is now constant
        const { adjustedWidth } = adjustWidth(width);
        iframe.style.width = adjustedWidth;
        iframe.style.height = height;
      } catch (error) {
        console.error(error);
      }
    }

    const handleMessage = (event: MessageEvent) => {
      const iframe = document.getElementById('responsiveIframe');
      if (iframe && event.data.type === 'chatbotStateChange') {
        try {
          const isMobile = window.innerWidth < 1000;
          if (isMobile) {
            // Mobile
            iframe.style.width = '100vw';
            iframe.style.height = height;
          } else {
            // Desktop
            const { adjustedWidth } = adjustWidth(width);
            iframe.style.width = adjustedWidth;
            iframe.style.height = height;
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [width]);

  return (
    <iframe
      ref={innerRef}
      src={project}
      id="responsiveIframe"
      className="chatbot-container"
      allow="microphone"
      style={{
        position: fixed ? 'fixed' : 'static',
        zIndex: '100',
        overflow: 'hidden',
        bottom: '0',
        right: '0',
        border: 'none',
        borderRadius: '10px',
      }}
    />
  );
});

export default Stack;
