import { forwardRef, useEffect, LegacyRef } from 'react';

type StackProps = {
  project: string;
  innerRef?: LegacyRef<HTMLIFrameElement> | undefined;
  width?: number;
  height?: number;
  fixed?: boolean;
};

// We are forwarding the ref to the iframe so that the user has access to it.
const Stack = forwardRef(function Stack({
  project,
  innerRef,
  width = 35, 
  height = 38,
  fixed = true 
}: StackProps) {

  const adjustDimensions = (w: number, h: number) => {
    const minWidth = 15; 
    const minHeight = 38;

    if (w < minWidth) {
      console.warn(`Width is too small (${w}rem). Adjusting to minimum width (${minWidth}rem).`);
    }
    if (h < minHeight) {
      console.warn(`Height is too small (${h}rem). Adjusting to minimum height (${minHeight}rem).`);
    }

    return {
      adjustedWidth: w < minWidth ? `${minWidth}rem` : `${w}rem`,
      adjustedHeight: h < minHeight ? `${minHeight}rem` : `${h}rem`,
    };
  };

  useEffect(() => {
    const iframe = document.getElementById('responsiveIframe');
    if (iframe) {
      // Adjust width and height based on the condition
      const { adjustedWidth, adjustedHeight } = adjustDimensions(width, height);

      iframe.style.width = adjustedWidth;
      iframe.style.height = adjustedHeight;
    }

    const handleMessage = (event: MessageEvent) => {
      const iframe = document.getElementById('responsiveIframe');
      if (iframe && event.data.type === 'chatbotStateChange') {
        const isMobile = window.innerWidth < 1000;
        if (isMobile) {
          // Mobile
          iframe.style.width = '100vw';
          iframe.style.height = '38.5rem';
        } else {
          // Desktop
          const { adjustedWidth, adjustedHeight } = adjustDimensions(width, height);
            iframe.style.width = adjustedWidth;
            iframe.style.height = adjustedHeight;
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [width, height]);

  console.log(width, height)

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
