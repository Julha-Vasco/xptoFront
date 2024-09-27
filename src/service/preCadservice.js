import axios from 'axios';

const API_URL = 'http://localhost:3000/filial'; 

export const FilialService = {
  async createFilial(filialData) {
    try {
      const response = await axios.post(API_URL, filialData);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao criar filial: ${error.message}`);
    }
  },
  async getFiliais() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar filiais: ${error.message}`);
    }
  },
 
};
