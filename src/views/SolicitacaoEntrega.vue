<template>
  <div>
     <nav class="top-right-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/listagem-entrega">Listagem de Entregas</router-link>
      <router-link to="/Confirmacao-entrega">Confirmação de Entrega</router-link>
    </nav>
    <FormSolicitacaoEntrega/>
  </div>
</template>

<script>
import FormSolicitacaoEntrega from '../components/FormSolicitacaoEntrega.vue'

export default {
  name: 'SolicitacaoEntrega',
  components: {
    FormSolicitacaoEntrega,
  }
}
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
</style>
