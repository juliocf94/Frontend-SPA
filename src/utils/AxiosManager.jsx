"use strict";
import axios from 'axios';

/**
 * Clase que proporciona métodos para realizarr peticiones asincrónicas utilizando Axios.
 * Permite realizarr operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una API RESTful.
 */
class AxiosManager {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.headers = {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Expires": "0",
        };
    }

    /**
     * Configura encabezados personalizados.
     * @date 7/9/2023 - 15:38:04
     *
     * @param {Object} customHeaders - Un objeto con los encabezados personalizados.
     */
    setCustomHeaders(customHeaders) {
        this.headers = { ...this.headers, ...customHeaders };
    }

    /**
     * Realizar una solicitud GET a la API.
     * @date 7/9/2023 - 15:49:58
     *
     * @async
     * @param {string} endpoint - El endpoint de la API a consultar.
     * @returns {Promise} - Promesa que se resuelve con la respuesta de la solicitud.
     */
    async get(endpoint) {
        try {
            const response = await axios.get(`${this.baseUrl}/${endpoint}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Realizar una solicitud POST a la API.
     * @date 7/9/2023 - 15:49:32
     *
     * @async
     * @param {string} endpoint - El endpoint de la API para enviar datos.
     * @param {Object} data - Datos a enviar en el cuerpo de la solicitud (puede ser JSON o FormData).
     * @param {boolean} isFormData - Indica si los datos son una instancia de FormData (opcional).
     * @returns {Promise} - Promesa que se resuelve con la respuesta de la solicitud.
     */
    async post(endpoint, data, isFormData = false) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/${endpoint}`,
                isFormData ? data : JSON.stringify(data),
                {
                    headers: this.headers,
                    validateStatus: false, // Para manejar respuestas no exitosas personalizadas
                }
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Realizar una solicitud PUT a la API.
     * @date 7/9/2023 - 15:49:04
     *
     * @async
     * @param {string} endpoint - El endpoint de la API para actualizar datos.
     * @param {Object} data - Datos a enviar en el cuerpo de la solicitud.
     * @returns {Promise} - Promesa que se resuelve con la respuesta de la solicitud.
     */
    async put(endpoint, data) {
        try {
            const response = await axios.put(`${this.baseUrl}/${endpoint}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Realizar una solicitud HTTP a un endpoint dado utilizando el método especificado.
     * @param {string} endpoint - El endpoint al que se enviará la solicitud.
     * @param {string} method - El método HTTP de la solicitud (POST, PUT).
     * @param {Object} data - Los datos a enviar en la solicitud.
     * @param {boolean} withCredentials - Indica si se deben incluir las credenciales en la solicitud (true o false).
     * @throws {Error} Error si el método HTTP proporcionado no es válido.
     * @throws {Error} Error si ocurre algún problema durante la solicitud.
     * @returns {Promise<Object>} Una promesa que se resuelve con los datos de la respuesta.
     */
    async request(endpoint, method, data, withCredentials) {
        const url = `${this.baseUrl}/${endpoint}`;

        try {
            let response;

            if (method === 'POST' || method === 'PUT') {
                response = await axios({
                    method: method,
                    url: url,
                    data: data,
                    withCredentials: withCredentials,
                    headers: this.headers
                });
            } else {
                throw new Error('Método HTTP no válido. Solo se admiten POST y PUT.');
            }

            return response.data;
        } catch (error) {
            throw new Error(`Error al realizarr la solicitud ${method} a ${url}: ${error.message}`);
        }
    }

    /**
     * Realizar una solicitud DELETE a la API.
     * @date 7/9/2023 - 15:48:33
     *
     * @async
     * @param {string} endpoint - El endpoint de la API para eliminar datos.
     * @returns {Promise} - Promesa que se resuelve con la respuesta de la solicitud.
     */
    async delete(endpoint) {
        try {
            const response = await axios.delete(`${this.baseUrl}/${endpoint}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default AxiosManager;
