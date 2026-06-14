import { BASE_URL } from '../config';

const API_URL = `${BASE_URL}/auth`;

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }) 
        });

        if (response.ok) {
            const data = await response.json();
            
            console.log("Respuesta del servidor:", data);
            if (data.token) {
                sessionStorage.setItem('token', data.token)
                sessionStorage.setItem('user', JSON.stringify(data.usuario))

                return true; 
            } else {
                return false; 
            }
        }
        return false; 
    } catch (error) {
        console.error("Error en petición de login:", error);
        return false;
    }
};

export const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    window.location.href = '/'; 
};

export const getToken = () => {
    return sessionStorage.getItem('token');
};

export const getUsuarioNombre = () => {
    const userGuardado = sessionStorage.getItem('user');
    if (userGuardado) {
        const userObj = JSON.parse(userGuardado);
        return userObj.nombre;
    }
    return null;
};

export const isAuthenticated = () => {
    return getToken() !== null; 
};