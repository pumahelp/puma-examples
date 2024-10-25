import axios from "axios";

const api = axios.create({
  baseURL: "/api"
})

const pumaAPI = axios.create({
  baseURL: "https://api.pumahelp.com/v2/"
})

pumaAPI.interceptors.request.use(async (config) => {
  const basicAuthToken = Buffer.from(`${process.env.PUMA_HELP_API_EMAIL}/token:${process.env.PUMA_HELP_API_TOKEN}`).toString('base64');

  const basicAuthorization = `Basic ${basicAuthToken}`;

  if (!config.headers.Authorization) {
    try {
      const response = await pumaAPI.post('/oauth2/token', {}, {
        headers: {
          Authorization: basicAuthorization
        }
      });

      const axiosResponse = response.data;
      
      config.headers.Authorization = `Bearer ${axiosResponse.data.access_token}`;
    } catch (error) {
      console.error("Erro ao obter o token:", error);
    }
  }

  return config;
});

export { pumaAPI, api };