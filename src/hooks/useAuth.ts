// Auth hooks removed - login functionality no longer available
export const useAuth = () => {
    return {
        user: null,
        authenticated: false,
        login: () => console.warn('Login functionality has been removed'),
        logout: () => console.warn('Logout functionality has been removed'),
        isLoginLoading: false,
        isLogoutLoading: false,
        loginError: null
    };
};
