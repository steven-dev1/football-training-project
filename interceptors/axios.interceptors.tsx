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