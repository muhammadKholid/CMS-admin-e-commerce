<template>
  <section>
    <form  @submit.prevent="addItem" class="add-form" action="" method="post">
      <b-field label="Name">
        <b-input v-model="name"></b-input>
      </b-field>

      <b-field label="Image"
               >
               <b-input v-model="image_url"
                        >
               </b-input>
      </b-field>

        <b-field label="Price"
                 type="is-success"
                 >
                 <b-input type="number" v-model="price"></b-input>
        </b-field>

        <b-field label="Stock">
          <b-input v-model="stock"  type="number"
                   >
          </b-input>
        </b-field>

        <div class="buttons is-centered">
          <b-button size="is-large" type="submit is-dark" @click.prevent="addItem()">Tambah barang</b-button>
        </div>

    </form>
  </section>
</template>


<script>
  import { url } from '../functions/url.js'
  import Swal from 'sweetalert2'
  export default{
    name: 'Add',
    data(){
      return {
          name: '',
          image_url: '',
          price: 0,
          stock: 0,
      }
    },
    methods: {
      addItem(){
        const newItem = {
          name: this.name,
          image_url: this.image_url,
          price: Number(this.price),
          stock: Number(this.stock)
        }
        console.log(newItem);
        fetch(`${url}/products`, {
          method: 'POST',
          body: JSON.stringify(newItem),
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
          }
        })
          .then(response=>{
            return response.json()
          })
          .then(added=>{
            if(added.message == "Validation min on price failed"){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: added.message,
              footer: '<a href>Why do I have this issue?</a>'
            })

            } else if (added.message == 'Nama barang tidak boleh kosong!') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: added.message,
              footer: '<a href>Why do I have this issue?</a>'
            })

            } else {
            Swal.fire(
              'Added!',
              'Your file has been Added.',
              'success'
            )
              this.name = '';
              this.image_url = '';
              this.price = '';
              this.stock = '';
            this.$store.dispatch('getProducts')
            this.$router.push({ path: '/products'})
            }
          })
          .catch(err=>{
            console.log(err)
          })
      }
    }
  }
</script>
