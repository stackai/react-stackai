import React, { forwardRef, LegacyRef, useEffect } from 'react';

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
  fixed = true 
}: StackProps) {

  const height = '38.5rem';

  const adjustWidth = (w: string) => {
    const minWidth = 15;
    let adjustedWidth = '';

    if (w.match(/(rem|px|em|%)$/)) {
      adjustedWidth = w;
    } else {
      // If no unit is found, treat the string as a number and append 'rem'
      const numericWidth = parseFloat(w);
      if (isNaN(numericWidth)) {
        throw new Error(`Invalid width: "${w}". Width must be a numeric value followed by a unit (e.g., '35rem', '100px').`);
      }

      if (numericWidth < minWidth) {
        console.warn(`Width is too small (${numericWidth}rem). Adjusting to minimum width (${minWidth}rem).`);
        adjustedWidth = `${minWidth}rem`;
      } else {
        adjustedWidth = `${numericWidth}rem`;
      }
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
        borderRadius: '10px'
      }}
    />
  );
});

export default Stack;
