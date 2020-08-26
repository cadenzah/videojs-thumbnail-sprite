import '@testing-library/jest-dom';

import '@testing-library/jest-dom';

const originalConsoleError = console.error;

// HTMLMedeaElement relevant methods are not implemented in jsdom
window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.play = () => Promise.resolve();
window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
