import axios from "axios";

//https://viacep.com.br/ws/17380000/json/
//Configurando a url base, para utilizar.

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
});

export default api;