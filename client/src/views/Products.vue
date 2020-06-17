<template>
  <section class="hero is-white is-fullheight">
    <Navbar></Navbar>
    <!-- Content barang -->

    <div class="container">
      <h2 class="title">Tambah Barang</h2>
      <button class="button is-primary is-large" type="button" @click="showAddForm">Tambah Produk</button>
      <button class="button is-warning is-large" type="button" @click="gaJadiTambah">Ga jadi</button>
      <Add v-if="showAdd"></Add>

    </div>


    <div class="hero-body columns" v-for="product in products" :key="product">

        <Card
        :items="product"
        ></Card>

    </div>
  </section>
</template>

<script>
  import { url } from '../functions/url.js'
  import Card from '../components/Card.vue'
  import Add from '../components/Add.vue'
  import Navbar from './Navbar.vue'
  import { mapState } from 'vuex';
    export default {
      name: 'Products',
      components: {
        Card,
        Add,
        Navbar,
      },
        data() {
            return {
              showAdd: false,
            }
        },
      computed: {
        ...mapState(['products'])
      },
      created(){
        this.$store.dispatch('getProducts');
      },
      methods: {
        showAddForm(){
          this.showAdd = true;
        },
        gaJadiTambah(){
          this.showAdd = false;
        }
      }
    }
</script>

<style>
.container{
  margin: 8vh 30vw;
}
  .hero-body{
    margin: 1rem 10vw;
    padding: .5rem 0;
  }
.container-card{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  display: flex;
  flex-direction: column;
}

</style>
