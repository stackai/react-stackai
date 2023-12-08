import { forwardRef, useEffect, LegacyRef } from 'react';

type StackProps = {
  project: string;
  innerRef?: LegacyRef<HTMLIFrameElement> | undefined;
  width?: string;
  height?: string;
  fixed?: boolean;
};

// We are forwarding the ref to the iframe so that the user has access to it.
const Stack = forwardRef(function Stack({
  project,
  innerRef,
  width = '35rem',
  height = '38.5rem',
  fixed = true
}: StackProps) {

  // Resizes based on the open/close state of the chatbot
  useEffect(() => {
    const iframe = document.getElementById('responsiveIframe');
    if (iframe) {
      iframe.style.width = width;
      iframe.style.height = height;
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
          iframe.style.width = width;
          iframe.style.height = height;
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <iframe
      ref={innerRef}
      src={project}
      id="responsiveIframe"
      className="chatbot-container"
      allow="microphone"
      style={{
        position: fixed? 'fixed' : 'relative',
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
