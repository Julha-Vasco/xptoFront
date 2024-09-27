<template>
  <div id="app">
    <Navbar :logo="logo_src" :alt="app_name" />
    <div class="content">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  data() {
    return {
      logo_src: require('@/assets/logo.png'),
      app_name: "XPTO Inc"
    }
  },
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
#app {
  display: flex; 
  flex-direction: column; 
  min-height: 100vh; 
}

.content {
  flex: 1; 
}

* {
  font-family: Helvetica;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main-container {
  margin: 50px;
  min-height: 250px;
}

h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #222;
}
</style>
