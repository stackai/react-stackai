import { forwardRef, useEffect, LegacyRef } from 'react';

const Stack = forwardRef(function Stack({
  project,
  innerRef,
  width = 35, 
  fixed = true 
}: StackProps) {

  const height = '38rem';

  const adjustWidth = (w: number) => {
    const minWidth = 15; 
    
    if (w < minWidth) {
      console.warn(`Width is too small (${w}rem). Adjusting to minimum width (${minWidth}rem).`);
    }

    return {
      adjustedWidth: w < minWidth ? `${minWidth}rem` : `${w}rem`,
    };
  };

  useEffect(() => {
    const iframe = document.getElementById('responsiveIframe');
    if (iframe) {
      // Adjust width only as height is now constant
      const { adjustedWidth } = adjustWidth(width);
      iframe.style.width = adjustedWidth;
      iframe.style.height = height;
    }

    const handleMessage = (event: MessageEvent) => {
      const iframe = document.getElementById('responsiveIframe');
      if (iframe && event.data.type === 'chatbotStateChange') {
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
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [width]); // Removed height from dependency array

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

