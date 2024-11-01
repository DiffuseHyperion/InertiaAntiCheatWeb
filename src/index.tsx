import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./pages/App";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

export function copyText(text: string | undefined) {
    if (text !== undefined) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!")
        }).catch(() => {
            alert("Could not copy to clipboard. Did you give permissions to access your clipboard?")
        })
    } else {
        alert("Checksum is still calculating, please try again later!")
    }
}
