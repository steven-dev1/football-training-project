# Football Training Project ⚽
Este proyecto es parte de una práctica guiada por mi mentor, con el objetivo de mejorar mis habilidades en desarrollo front-end. Utilizo tecnologías como Next.js, TypeScript y herramientas modernas, enfocándome en componentes reutilizables, manejo de estados y buenas prácticas de código, aplicando lo aprendido para enfrentar desafíos del desarrollo web.
####**Desarrollado con:**
- `Next.js`
- `TypeScript`
- `Supabase`
- `Tailwind`
- `Redux`
- `SWR`


## 🚀 Comenzando 
#### 1. Configuración
Para inicializar el proyecto se necesita conectarse con la API y la base de datos utilizada en el mismo.
⚽ [APIFootballl](https://apifootball.com/ "APIFootballl")
🌐 [Supabase](https://supabase.com/ "Supabase")

En la carpeta raiz del proyecto crear un archivo .env donde se colocaran las credenciales de la API y la base de datos.
![Screenshot 2024-10-07 143224](https://github.com/user-attachments/assets/67959009-3ab6-4301-849a-31c8a085fa4a)

*Importante crearlo con esos nombre en las variables.*
##### - APIFotball
Crear una cuenta con el plan free y le dará una key que deberá colocarse en la variable:

```bash
NEXT_PUBLIC_API_KEY_FOOTBALL = APIKey
```

##### - Supabase
Crear un proyecto en Supabase que contará con dos tablas la cual estarán relacionadas:

##### Tabla: session

| Nombre |  Formato |
|----------|----------|----------|
| id    | int8   |
| created_at    | timestamptz   |
| session_id | uuid |
##### Tabla: favorites

| Nombre |  Formato |
|----------|----------|----------|
| id    | int8   |
| created_at    | timestamptz   |
| match_id    |  varchar   |
| session_id | uuid |

En la tabla de **favorites** el session_id se relaciona con el session_id de la tabla **session.**
![Screenshot 2024-10-07 151508](https://github.com/user-attachments/assets/1eebfbf8-ed93-49d5-884d-7194b08fb539)


Para conenctar la base de datos con el proyecto se debe configurar las variables de entorno en el archivo **.env**
![Screenshot 2024-10-07 151833](https://github.com/user-attachments/assets/f19a3cc1-afcd-4e33-8f3d-10b9dcb50323)

```bash 
	NEXT_PUBLIC_SUPABASE_URL = Project URL
	NEXT_PUBLIC_SUPABASE_ANON_KEY = Project API Key
```

#### 2. Ejecución para desarrollo
```bash
npm install
# luego
npm run dev
```
Abre [**`http://localhost:3000/`**](http://localhost:3000/) para ver el proyecto en funcionamiento.

## 🧑‍💻Acerca del proyecto
##### - TypeScript
TypeScript se utiliza para definir tipos de datos en el proyecto, lo que permite detectar errores en tiempo de desarrollo y asegura que los componentes reciban la información en el formato correcto. Por ejemplo, en `types/Api.model.ts`, definí las estructuras de datos para equipos, ligas y competiciones que vienen desde la API, en base a eso creé mis propios tipos e interfaces que fui necesitando en la aplicación.
##### - Llamadas a la API externa
Utilicé la API del servidor de nextjs para hacer peticiones a la API externa, haciendo que las llamadas a la API, siendo desde el serividor, sean más seguras encapsulando información sensible del cliente. `app/api/` 

##### - Uso de incerceptors en las peticiones
Crée un interceptor usando Axios para hacer más escalable el código en cuanto a las peticiones a APIs manejando las solicitudes y respuestas en un solo sitio. `interceptors/axios.interceptors.tsx`
```javascript
import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: '/api'
    }
)
apiClient.interceptors.request.use(
    (config) => {
        const sessionId = config.data?.sessionId
        if (sessionId) {
            config.headers['Authorization'] = `Bearer ${sessionId}`;
        }
        return config;
    }, (error) => {
        console.log('Error: ', error.message)
        return Promise.reject(error.message);
    });

axios.interceptors.response.use(
    (response) => {
        console.log('Response ' + JSON.stringify(response.data, null, 2));
        return response
    },
    (error) => {
        console.log('Error: ' + error.code) //
        return Promise.reject(error.message)
    }
)

export default apiClient;
```

##### - Redux Toolkit
Redux se utilizó principalmente para manejar el estado global de los favoritos en la aplicación, añadiendo y eliminando partidos sin necesidad de recargar la página. Creando un store, hooks, provider y un slice donde pasa casi toda la lógica principal de los favoritos. `redux/` 

##### - SWR Hook
SWR fue utlizado también para realizar fetch de datos, manejando la información en tiempo real y aprovechando también la funcionanlidad de caché., `hooks/useCustomData.ts`

```typescript
import { customFetcher } from '@/infrastructure/utils/fetchers';

export function useCustomData(remapFunction: Function, queryParams: Object) {
  const { data, error } = useSWR([`/routes?${queryParams.toString()}`, remapFunction], ([url, remapFn]) => customFetcher(url, remapFn));

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}
```

##### - Estructuración de carpetas y archivos.
La organización y estructura del proyecto permite que cualquier desarrollador pueda entenderlo fácilmente, ya que los archivos están separados según su tipo de funcionamiento.
![Screenshot 2024-10-09 110056](https://github.com/user-attachments/assets/0d280fea-fd8e-4f13-9033-b496f0275898)


En la aplicación predomina un mismo componente el cual es `componets/Teams/LogoItem.tsx`. Este se encuentra en todo el proyecto y en cada una de las secciones, permitiendo tener código reutilizable, configurable y facil de leer.

```typescript
export default function LogoItem({ srcLogo, name, orientation, logoPosition, href }: LogoItemProps) {

  const [error, setError] = useState(false)
  const isVertical = orientation == 'vertical'
  const fallbackImage = '/no-image.svg'
  const validSrcLogo = srcLogo || fallbackImage;

  const containerClasses = {
    vertical: 'flex flex-col transition-all duration-200 hover:opacity-75 items-center min-w-[70px] max-w-[70px] cursor-pointer',
    horizontal: `flex gap-2 transition-all duration-200 hover:opacity-75 items-center ${logoPosition == 'right' ? 'justify-end' : 'justify-start'} cursor-pointer max-w-auto`
  }
  const verticalExtraParagraphClass = "max-w-[80px] mt-2 leading-3"

  const bodyContent = [
    <Image key={validSrcLogo} className={`${error || !srcLogo ? 'bg-white rounded-full' : ''}`} src={error ? fallbackImage : validSrcLogo} alt={name} width={isVertical ? 50 : 20} height={isVertical ? 50 : 20} onError={()=> setError(true)}/>,
    <p key={name} className={`${isVertical && verticalExtraParagraphClass} font-medium text-xs text-center whitespace-nowrap overflow-hidden text-ellipsis`}>
      {name}
    </p>
  ]

  useEffect(() => {
    setError(false)
  },[srcLogo])

  return (
    <a href={href} className={isVertical ? containerClasses.vertical : containerClasses.horizontal}>
      {isVertical || logoPosition !== 'right' ? bodyContent : bodyContent.reverse()}
    </a>
  )
}
```

Se manejan y controlan los errores o imagenes corruptas que puedan llegar desde la API.

------------
El proyecto no solo tiene una base solida para el seguimiento de eventos deportivos en tiempo real, sino que tambien esta preparado para futuras expansiones, como la integración de nuevas funcionalidades, autenticación de usuarios y mejoras en la personalización de contenido.