import React from 'react';
import {createRoot} from 'react-dom/client';
import 'web/src/index.css';
import reportWebVitals from 'web/src/reportWebVitals';
import {App} from 'components/src/app';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<>
    <App/>
</>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
