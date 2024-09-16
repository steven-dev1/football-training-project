import { httpPostActions } from "./helpers";


export const customFetcher = async (url: string, remapFunction: Function) => {
  const response = await fetch(url);
  const data = await response.json();

  // Aplicar la función de remapeo proporcionada
  const remappedData = remapFunction ? remapFunction(data) : data;

  return remappedData;
};

export const handleAddFavorite = async (id: string, sessionId: string) => {
  if (!sessionId) {
    console.error('No session found');
    return;
  }
  try {
    const response = await fetch(`/api/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'match_id': id, sessionId, 'action': httpPostActions.POST }),
    });
    if (!response.ok) {
      console.error(`Error en la respuesta de la API:`, response);
    }
    const data = await response.json();
    console.log(data)
  } catch (err) {
    alert('Error en la API');
    console.log(err);
  }
};