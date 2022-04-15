import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './style/index.css';
import App from './components/App';

type SettingsType = {
    API_DOMAIN: string
}

// Do something with environment settings
const a = process.env.APP_SETTINGS as unknown as SettingsType;
console.debug(a.API_DOMAIN);

const container = document.getElementById('root') as Element;
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
