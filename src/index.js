import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import AuthState from './context/AuthState'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthState>
        <App />
    </AuthState>
);

