<template>
  <div>
    <nav class="top-right-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/solicitacao-entrega">Solicitação de Entrega</router-link>
      <router-link to="/confirmacao-entrega">Confirmação de Entrega</router-link>
    </nav>
    <h1>Listagem de Entregas</h1>
    <table class="entregas-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Destinatário</th>
          <th>Endereço</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entrega in entregas" :key="entrega.id">
          <td>{{ entrega.id }}</td>
          <td>{{ entrega.destinatario }}</td>
          <td>{{ entrega.endereco }}</td>
          <td>{{ entrega.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ListagemEntregas',
  data() {
    return {
      entregas: [
        { id: 1, destinatario: 'João Silva', endereco: 'Rua A, 123', status: 'Entregue' },
        { id: 2, destinatario: 'Maria Oliveira', endereco: 'Rua B, 456', status: 'Pendente' },
        { id: 3, destinatario: 'Carlos Pereira', endereco: 'Rua C, 789', status: 'Em trânsito' },
        // Adicione mais entregas conforme necessário
      ],
    };
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
  margin-top: 50px; /* Espaço entre o nav e a tabela */
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
