export const customFetcher = async (url: string, remapFunction: Function) => {
    const response = await fetch(url);
    const data = await response.json();
  
    // Aplicar la función de remapeo proporcionada
    const remappedData = remapFunction ? remapFunction(data) : data;
  
    return remappedData;
  };