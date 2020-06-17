<template>
  <section class="hero is-warning is-fullheight">
    <div class="hero-body columns is-half is-centered">

      <div class="container-login column ">
        <h1 class="title">
          Try me
        </h1>
        <h2 class="subtitle">
          E-mail: admin@admin.com
          password: adminku
        </h2>
      </div>

      <div class="container-login column ">
        <h1 class="title">Login</h1>
        <form @submit.prevent="login()" class="form-login" action="" method="post">
          <b-field label="Email"
                   >
                   <b-input v-model="email" maxlength="30"></b-input>
          </b-field>

          <b-field label="Password"
                   >
                   <b-input v-model="password" type="password" maxlength="30"></b-input>
          </b-field>
          <div class="buttons">
            <b-button size="is-large" type="submit is-dark" @click.prevent="login()">Login</b-button>
          </div>
        </form>
      </div>

    </div>
  </section>
</template>

<script>
  import { url } from '../functions/url.js'
  import Swal from 'sweetalert2';
    export default {
      name: 'Login',
      data() {
            return {
                email: '',
                password: '',
              }
        },
      methods: {
        login(){
          const user = {
            email: this.email,
            password: this.password,
          }
          console.log(user)
          fetch(`${url}/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(response=>{
              return response.json();
            })
            .then(data=>{
              if(data.message == "Cannot read property 'role' of null") {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message,
                footer: '<a href>Why do I have this issue?</a>'
              })
              } else {
              Swal.fire(
                'Login!',
                'success'
              )
              localStorage.setItem('token', data.token)
              this.$store.commit('SET_ISLOGGEDIN', data.token)
              this.$router.push({ path: '/' })
              }
            })
        }
      },
    }
</script>
