const TOKEN_KEY = 'access_token';
const EXPIRES_KEY = 'token_expires';

export function saveToken(token, expiresInSec) {
    const expiryTime = Date.now() + expiresInSec * 1000;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRES_KEY, expiryTime);
}

export function getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiryTime = localStorage.getItem(EXPIRES_KEY);
    
    if (!token || !expiryTime || Date.now() > expiryTime) {
        return null; // Token is either missing or expired
    }
    
    return token;
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
} 

