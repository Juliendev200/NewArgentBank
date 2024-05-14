import axios from "axios";

export async function logUser(email, password) {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    // Gérer les erreurs ici
    console.error(
      "Une erreur s'est produite lors de la tentative de connexion :",
      error
    );
    throw error;
  }
}

export async function getUserProfile(token) {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // Gérer les erreurs ici
    console.error(
      "Une erreur s'est produite lors de la récupération du profil de l'utilisateur :",
      error
    );
    throw error;
  }
}

export async function changeUsername(newUserName, token) {
  try {
    const response = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      { userName: newUserName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    // Gérer les erreurs ici
    console.error(
      "Une erreur s'est produite lors de la modification du nom d'utilisateur :",
      error
    );
    throw error;
  }
}
