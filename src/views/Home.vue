<template>
  <div>
    <Banner />
    <div class="main-container">
      <h1>Bem vindo a XPTO Inc</h1>
      <FormPreCad />
    </div>
    <nav class="top-right-nav">
      <router-link to="/solicitacao-entrega">Solicitação de Entrega</router-link>
      <router-link to="/listagem-entrega">Listagem de Entregas</router-link>
      <router-link to="/Confirmacao-entrega">Confirmação de Entrega</router-link>
    </nav>
  </div>
</template>

<script>
import FormPreCad from '../components/FormPreCad.vue'
import Banner from '../components/Banner'

export default {
  name: 'HomePage',
  components: {
    Banner,
    FormPreCad,
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
