import apiClient from "@/interceptors/axios.interceptors";
import { httpPostActions } from "./helpers";


export const customFetcher = async (url: string, remapFunction: Function) => {
  const response = await apiClient.get(url);
  const data = await response?.data;
  const remappedData = remapFunction ? remapFunction(data) : data;

  return remappedData;
};


export const fetchFavorites = async (sessionId: string) => {
  if (!sessionId) return 'No session id provided';
  
  const response = await apiClient.post('/favorites', {
    sessionId: sessionId,
    action: httpPostActions.GET_FAVORITES,
  });
  if (response.status !== 200) {
    console.error('Error en la respuesta de la API:', response.status);
    return false;
  }

  const data = await response?.data
  return data
};

export const handleAddFavorite = async (id: string, sessionId: string) => {
  if (!sessionId) {
    console.error('No session found');
    return false;
  }
    const response = await apiClient.post('/favorites', {
      match_id: id,
      sessionId: sessionId,
      action: httpPostActions.POST_FAVORITES,
    });
    const data = await response?.data;
    return Boolean(data);
};


export const handleRemoveFavorite = async (id: string, sessionId: string) => {
  if (!sessionId) {
    console.error('No session found');
    return false;
  }
  try {
    const response = await apiClient.post(`/favorites`, {
      match_id: id,
      sessionId: sessionId,
      action: httpPostActions.DELETE_FAVORITES,
    });
    if (response.status !== 200) {
      console.error(`Error en la respuesta de la API:`, response);
      return false
    }
    const data = await response?.data;
    console.log(data)
    return Boolean(data)
  } catch (err) {
    alert('Error en la API');
    console.log(err);
  }
  return false;
}