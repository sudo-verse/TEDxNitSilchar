import { Navigate } from 'react-router-dom';

// Login page has been removed - redirect to home
export const LoginPage = () => {
    return (
        <Navigate
            to='/'
            replace
        />
    );
};
