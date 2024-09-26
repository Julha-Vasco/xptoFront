<template>
  <div id="main-banner">
    <h1>XPTO Inc</h1>
  </div>
</template>

<script>
export default {
  name: "BannerPage"
}
</script>

<style scoped>
#main-banner {
  background-image: url('@/assets/logo.png');
  background-position: 0 -250px;
  background-size: cover;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

#main-banner h1 {
  color: #FFF;
  text-align: center;
  font-size: 60px;
  background-color: #222;
  padding: 20px 40px;
  font-style: italic; 
}
</style>
