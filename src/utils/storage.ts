export const setToken = (token: string) => {
    sessionStorage.setItem('token', token);
};
export const removeToken = () => {
    sessionStorage.removeItem('token');
};

export const getToken = () => {
    return sessionStorage.getItem('token');
};
