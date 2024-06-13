import React from 'react';
import { useRouter } from 'next/router';

export default function Calculator() {
    const router = useRouter();

    const handleLoginRedirect = () => {
        router.push('/login'); // Redirect to the login page
    };

    return (
        <div className="container">
            <h1>Calculator</h1>
            <p>Welcome to the calculator page!!</p>
            {/* This button redirects to the login page */}
            <button onClick={handleLoginRedirect} className="loginButton">Login</button>
            {/* Include your calculator component or details here */}
        </div>
    );
}
