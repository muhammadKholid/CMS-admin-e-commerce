<template>
  <div class="hello">
    <section class="hero is-dark is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Selamat Datang Admin
          </h1>
          <h2 class="subtitle">
            Semoga harimu Menyenangkan.
          </h2>
          <button v-on:click="login" class="login-btn">
            Log in
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn 
    }
    
  },
  methods: {
    login(){
      return this.$router.push({ path: '/products' })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.login-btn{
  width: 10vw;
  height: 5vh;
  background-color: #f5f5f5;
  border: 0;
  border-radius: 12px;
}
.login-btn:hover{
  width: 10vw;
  height: 5vh;
  background-color: #2d2d2d;
  color: white;
  border: 0;
  border-radius: 12px;
}
</style>
