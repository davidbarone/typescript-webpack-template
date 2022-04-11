import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './style/index.css';
import App from './components/App';

var a = process.env.APP_SETTINGS as any;

const container = document.getElementById('root') as Element;
const root = createRoot(container);
alert(a.API_DOMAIN);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
