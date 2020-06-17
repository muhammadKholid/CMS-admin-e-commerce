<template>
    <section>
        <h2 class="title">Ubah Data</h2>
      <form @submit.prevent="edit" class="edit-form" action="" method="post">
        <b-field label="Name">
          <b-input v-model="oneProduct.name"></b-input>
        </b-field>

        <b-field label="Image"
                 >
                 <b-input v-model="oneProduct.image_url"
                          >
                 </b-input>
        </b-field>

          <b-field label="Price"
                   type="number is-success"
                   >
                   <b-input v-model="oneProduct.price"></b-input>
          </b-field>

          <b-field label="Stock">
            <b-input v-model="oneProduct.stock" type="number"
                                     >
            </b-input>
          </b-field>

          <div class="buttons is-centered">
            <b-button size="is-large" type="submit is-dark" @click.prevent="edit()">Edit barang</b-button>
          </div>
      </form>
    </section>
</template>

<script charset="utf-8">
  import { url } from '../functions/url.js'
  import Swal from 'sweetalert2';
  export default{
    name: 'Edit',
    computed: {
      oneProduct(){
        return this.$store.state.oneProduct
      }
    },
    methods: {
      edit(){
        const editItem = {
          name: this.oneProduct.name,
          image_url: this.oneProduct.image_url,
          price: Number(this.oneProduct.price),
          stock: Number(this.oneProduct.stock),
        }
        fetch(`${url}/products/${this.oneProduct.id}`, {
          method: 'PUT',
          body: JSON.stringify(editItem),
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
          }
        })
        .then(response=>{
          return response.json()
        })
        .then(edited=>{
       
            if(edited.message == "Validation min on price failed"){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: edited.message,
              footer: '<a href>Why do I have this issue?</a>'
            })

            } else if (edited.message == 'Nama barang tidak boleh kosong!') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: edited.message,
              footer: '<a href>Why do I have this issue?</a>'
            })

            } else { 
            Swal.fire(
              'edited!',
              'Your file has been edited.',
              'success'
            )
              this.name = '';
              this.image_url = '';
              this.price = '';
              this.stock = '';
              this.$store.dispatch('getProducts')
            }
        })
        .catch(err=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Form tidak boleh kosong',
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
      }
    }
  }
</script>
