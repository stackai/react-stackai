// Constants
const IFRAME_ID = 'responsiveIframe';
const MOBILE_BREAKPOINT = 1000;
const IFRAME_WIDTH_MOBILE = '100vw';
const IFRAME_HEIGHT_MOBILE = '39rem';
const IFRAME_WIDTH_DESKTOP = '35rem';
const IFRAME_HEIGHT_DESKTOP = '39rem';

const initializeStack = () => {
  // Find the current script tag by searching for the one that includes this script's src
  let scripts = document.getElementsByTagName('script');

  // Converting nodes to array form
  let scriptsList = Array.from(scripts);

  let currentScript = scriptsList.find((script) => {
    return script.src.includes('vanilla-stackai.js');
  });

  if (!currentScript) {
    console.error('Current script not found.');
    return;
  }

  const projectUrl = currentScript.getAttribute('data-project-url');

  if (!projectUrl) {
    console.error(
      'Data attribute "data-project-url" not found in the script tag.'
    );
    return;
  }

  let iframe = document.createElement('iframe');
  iframe.id = IFRAME_ID;
  iframe.src = projectUrl;
  iframe.style.position = 'fixed';
  iframe.style.zIndex = '100';
  iframe.style.overflow = 'hidden';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '10px';
  iframe.style.width = IFRAME_WIDTH_MOBILE;
  iframe.style.height = IFRAME_HEIGHT_MOBILE;
  iframe.setAttribute('allow', 'microphone');
  iframe.setAttribute('referrerpolicy', 'origin');

  document.body.appendChild(iframe);

  function handleMessage(event) {
    var iframe = document.getElementById(IFRAME_ID);

    if (iframe && event.data.type === 'chatbotStateChange') {
      if (event.data.isClosed) {
        setTimeout(() => {
          iframe.style.width = IFRAME_WIDTH_MOBILE;
          iframe.style.height = IFRAME_HEIGHT_MOBILE;
        }, 300);
      } else {
        const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

        if (isMobile) {
          // Mobile
          iframe.style.width = IFRAME_WIDTH_MOBILE;
          iframe.style.height = IFRAME_HEIGHT_MOBILE;
        } else {
          // Desktop
          iframe.style.width = IFRAME_WIDTH_DESKTOP;
          iframe.style.height = IFRAME_HEIGHT_DESKTOP;
        }
      }
    }
  }

  window.addEventListener('message', handleMessage);

  return function cleanup() {
    window.removeEventListener('message', handleMessage);
    document.body.removeChild(iframe);
  };
};

initializeStack();
