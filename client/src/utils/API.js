import axios from "axios";

export const saveGame = gameData => {
  return axios.post("/api/games", gameData);
}

export const getSavedGames = () => {
  return axios.get("/api/games");
}

export const removeGame = gameId => {
  return axios.delete(`/api/games/${gameId}`);
}

export const updateGame = (gameId, gameData) => {
  return axios.put(`/api/games/${gameId}`, gameData);
}

export const saveUser = userData => {
  return axios.post("/api/users", userData);
}

export const getSavedUsers = () => {
  return axios.get("/api/users");
}

export const checkAuthUser = userData => {
  return axios.post("/api/auth", userData);
}

export default {
  saveGame,
  getSavedGames,
  removeGame,
  updateGame,
  saveUser,
  getSavedUsers
}