import axios from "axios";

const api = axios.create({
  baseURL: "/api"
})

const pumaAPI = axios.create({
  baseURL: "https://api.pumahelp.com/api/v1/"
})

pumaAPI.interceptors.request.use((config) => {
  const basicAuthToken = Buffer.from(`${process.env.PUMA_HELP_API_EMAIL}/token:${process.env.PUMA_HELP_API_TOKEN}`).toString('base64');

  config.headers.Authorization = `Basic ${basicAuthToken}`;

  return config;
});

export { pumaAPI, api };