<template>
        <b-navbar class="is-dark">
          <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/products' }">
              <h1 class="has-text-dark">CMS Admin</h1>
            </b-navbar-item>
          </template>

          <template slot="end">
            <b-navbar-item @click="logout" class="has-text-black">
              Log Out
            </b-navbar-item>
          </template>
        </b-navbar>

</template>


<script charset="utf-8">
  export default{
    name:'Navbar',
    methods: {
      logout(){
        localStorage.clear()
        this.$store.commit('SET_ISLOGGEDIN', true)
        this.$router.push({ path: '/login' })
      },
    },
  }
</script>
<style>
.is-dark{
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  width: 100%;
  height: 15vh;
  padding: 0 1rem;
}
.has-text-dark{
  font-size: 2rem;
  font-weight: 500;
}
</style>
