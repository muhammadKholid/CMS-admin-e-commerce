<template>
  <div class="card">
    <div class="card-image">
      <figure class="image">
        <img :src="items.image_url" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4 has-text-black">{{ items.name }}</p>
          <p class="subtitle is-6 has-text-black"> Harga: {{ formatRupiah(items.price) }}</p>
          <p class="subtitle is-6 has-text-black"> Stock: {{ items.stock }}</p>
        </div>
      </div>

      <div class="content">

        <time datetime="2016-1-1">{{ new Date(items.createdAt).toString().slice(0, 15) }}</time>
        <br>

        <div class="buttons is-centered">
          <a class="button is-danger" @click="deleteItem(items.id)">
            <strong>Delete</strong>
          </a>
          <a class="button is-primary" @click="edit(items)">
            Edit product
          </a>
          <a class="button is-primary" @click="gaJadiEdit()">
            Ga jadi Edit
          </a>
        </div>
      </div>
      <div class="actions-content">
        <Edit
          v-if="showEdit"
        ></Edit>
      </div>
    </div>
  </div>
</template>

<script>
  import Edit from '../components/Edit.vue';
  import Swal from 'sweetalert2';
  import { url } from '../functions/url.js'
    export default {
      name: 'Products',
      components: {
        Edit,
      },
      data(){
        return {
          showEdit: false,
        }
      },
      props: ['items'],
      methods: {
    formatRupiah(angka) {
      let reverse = angka
        .toString()
        .split('')
        .reverse()
        .join('');
      let ribuan = reverse.match(/\d{1,3}/g);
      let rupiah = ribuan
        .join('.')
        .split('')
        .reverse()
        .join('');
      return 'Rp. ' + rupiah;
    },
        deleteItem(id){
          console.log(id, '==============')
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if(result.value){
            return fetch(`${url}/products/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token'),
              }
            })
            }
          })
            .then(response=>{
              return response.json();
            })
            .then(deleted=>{
              this.$store.dispatch('getProducts');
              if (deleted) {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
              }
            })
            .catch(err=>{
              console.log(err);
              })
        },
        edit(data){
          this.$store.commit('SET_ONEPRODUCT', data)
          this.showEdit = true;
        },
        gaJadiEdit(){
          this.showEdit = false;
        }
      }
    }
</script>

<style type="text/css" media="screen">
.card{
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  padding: 1rem;
  display: grid;
  border: 0;
  border-radius: 12px;
  grid-template-columns: 1fr 1fr;
  flex-wrap: wrap;
}
 .image img{
   display: block;
 }
</style>
