import { getToken, logout } from './authService';

const API_URL = 'http://localhost:8080/api/tiendas/';

export const getTiendas = async () => {
    const token = getToken();

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, //jwt
                'Content-Type': 'application/json'
            }
        });

        // si  token = caducado o invalido
        if (response.status === 401 || response.status === 403) {
            logout(); 
            throw new Error("Token expirado o inválido");
        }

        if (!response.ok) throw new Error("Error del servidor");
        
        return await response.json();
    } catch (error) {
        console.error("Error cargando tiendas:", error);
        return [];
    }
};