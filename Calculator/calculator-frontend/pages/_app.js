// pages/_app.js
import { AdminProvider } from '../context/AdminContext';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <AdminProvider>
                <Component {...pageProps} />
            </AdminProvider>
        </ThemeProvider>
    );
}

export default MyApp;
