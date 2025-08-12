import { jwtDecode } from 'jwt-decode';

function decodeToken() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.id) {
      localStorage.setItem('user_id', decoded.id);
    }
    if (decoded.role === 'admin') {
      localStorage.setItem('role', decoded.role);
    }
    return decoded;
  } catch (error) {
    console.error('Token is invalid:', error);
    return null;
  }
}

export default decodeToken;
