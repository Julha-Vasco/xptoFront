<template>
  <div>
    <nav class="top-right-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/solicitacao-entrega">Solicitação de Entrega</router-link>
      <router-link to="/confirmacao-entrega">Confirmação de Entrega</router-link>
    </nav>
    <div>
      <h1>Listagem de Entregas</h1>
      <table class="entregas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição da mercadoria</th>
            <th>Filial destino</th>
            <th>Prazo de entrega</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entrega in entregas" :key="entrega.id">
            <td>{{ entrega.id }}</td>
            <td>{{ entrega.descricaoMercadoria }}</td>
            <td>{{ entrega.filialDestino}}</td>
            <td>{{ entrega.prazo }}</td>
            <td>{{ entrega.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { buscarEntregas } from '../service/solicitacaoEntrega'; 

export default {
  name: 'ListagemEntregas',
  data() {
    return {
      entregas: [], 
    };
  },
  created() {
    this.fetchEntregas(); 
  },
  methods: {
    async fetchEntregas() {
      try {
        this.entregas = await buscarEntregas(); 
      } catch (error) {
        console.error('Erro ao buscar entregas:', error);
      }
    },
  },
};
</script>

<style scoped>
.top-right-nav {
  position: absolute; 
  top: 20px; 
  right: 20px; 
  z-index: 1000; 
}

.top-right-nav a {
  color: rgb(12, 12, 12); 
  font-weight: bold; 
  margin-right: 15px; 
}

.top-right-nav a:last-child {
  margin-right: 0; 
}

.entregas-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 50px; 
  margin-bottom: 80px; 
  border-radius: 8px; 
  overflow: hidden; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

.entregas-table th, .entregas-table td {
  border: 1px solid #ccc; 
  padding: 10px;
  text-align: left;
}

.entregas-table th {
  background-color: #f4f4f4;
}
</style>
