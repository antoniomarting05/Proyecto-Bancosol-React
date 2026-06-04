const API_URL = 'http://localhost:8080/api/auth/';

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }) 
        });

        if (response.ok) {
            const data = await response.json();
            
            if (data.token) {
                localStorage.setItem('jwt_bancosol', data.token);
                localStorage.setItem('usuario_nombre', data.usuario.nombre);
                localStorage.setItem('usuario_rol', data.usuario.rol);
                
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
    localStorage.removeItem('jwt_bancosol');
    localStorage.removeItem('usuario_nombre');
    localStorage.removeItem('usuario_rol');
    window.location.href = '/'; 
};

export const getToken = () => {
    return localStorage.getItem('jwt_bancosol');
};

export const getUsuarioNombre = () => {
    return localStorage.getItem('usuario_nombre');
};

export const isAuthenticated = () => {
    return getToken() !== null; 
};