import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './mui.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <Provider store={store}>
            <Router>
                <ThemeProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <App />
                    </LocalizationProvider>
                </ThemeProvider>
            </Router>
        </Provider>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </>,
);
