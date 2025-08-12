function makeUserService() {
  const baseUrl = '/api/v1/user';

  async function efetch(url, options = {}) {
    let result = {};
    let json = {};
    try {
      result = await fetch(url, options);
      json = await result.json();
    } catch (error) {
      throw new Error(error.message);
    }
    if (!result.ok || json.status !== 'success') {
      throw new Error(json.message || 'An error occurred');
    }
    return json.data;
  }

  async function register(userData) {
    return efetch(`${baseUrl}/register`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async function login(credentials) {
    return efetch(`${baseUrl}/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async function getAllUser() {
    const users = await efetch(`${baseUrl}`);
    return {
      users
    };
  }

  async function getUser(userId) {
    const user = await efetch(`${baseUrl}/${userId}`);

    return {
      user
    };
  }

  async function updateUser(userId, userData) {
    return efetch(`${baseUrl}/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async function deleteUser(userId) {
    return efetch(`${baseUrl}/${userId}`, {
      method: 'DELETE'
    });
  }

  return {
    register,
    login,
    getAllUser,
    getUser,
    updateUser,
    deleteUser
  };
}

export default makeUserService();
