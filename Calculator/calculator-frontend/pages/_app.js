import { ThemeProvider } from '../context/ThemeContext';
import '../styles/global.css'; // Ensure you have this style file to handle the dark mode styles

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
