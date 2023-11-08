import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App'; // Import your main App component
import { registerServiceWorker } from './serviceWorkerRegistration';

const root = document.getElementById('root');
const reactRoot = createRoot(root);
reactRoot.render(<App />);

// Register the service worker (make sure to create this file)
registerServiceWorker();