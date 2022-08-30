import axios from "axios";

const base_url = 'http://localhost:5000/';

export const API = axios.create({
    baseURL: base_url
})