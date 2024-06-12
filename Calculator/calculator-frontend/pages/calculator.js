import { useRouter } from 'next/router';
import styles from '../styles/Calculator.module.css';

export default function Calculator() {
    const router = useRouter();

    const handleDashboardRedirect = () => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Calculator</h1>
            <p>Welcome to the calculator page!</p>
            <button onClick={handleDashboardRedirect}>Admin Login</button>
        </div>
    );
}
