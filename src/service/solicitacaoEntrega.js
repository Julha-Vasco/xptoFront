import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const buscarFiliais = async () => {
  try {
    const response = await axios.get(`${API_URL}/filial`);
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar filiais:', error);
    throw error;
  }
};


export const criarEntrega = async (dadosEntrega) => {
  try {
    const response = await axios.post(`${API_URL}/entregas`, dadosEntrega);
    return response.data; 
  } catch (error) {
    console.error('Erro ao criar entrega:', error);
    throw error;
  }
};

export const buscarEntregas = async () => {
  try {
    const response = await axios.get(`${API_URL}/entregas`); 
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar entregas:', error);
    throw error;
  }
};

export const atualizarEntrega = async (idEntrega) => {
  try {
    const response = await axios.patch(`${API_URL}/entregas/${idEntrega}`, { status: 'delivered' });
    return response.data; 
  } catch (error) {
    console.error('Erro ao atualizar entrega:', error);
    throw error;
  }
};