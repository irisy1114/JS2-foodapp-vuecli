<template>
  <div id="app" class="container">
    <div class="mt-1">
      <div class="row">
        <div class="col-md-4">
          <img class="restaurant-logo" src="./assets/restaurant-logo.jpg" alt="Restaurant Logo">
        </div>
        <div class="col-md-4 pt-4">

        </div>
        <div class="col-md-4">
          <router-link class="btn btn-outline-success" to="/cart/items" title="View cart"><fa :icon="['fas', 'shopping-cart']" /></router-link>
          <a v-if="authUser" href="#" class="btn btn-outline-success" @click.prevent="logout">Log out</a>
          <a v-else href="#" class="btn btn-outline-success" @click.prevent="loginWithGoogle">Login</a>
          <div v-if="authUser" class="btn btn-outline-success" style="border: none" >
            <img :src="authUser.photoURL" class="avatar">
            {{authUser.displayName}}
          </div>
        </div>
      </div>
    </div>

    <nav class="sidebar">
      <div class="text mt-2">Restaurant</div>
      <ul>
        <li class="nav-item">
          <router-link to="/home" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/menu" class="nav-link" data-bs-toggle="collapse" href="#menuCollapse" role="button" aria-expanded="false" aria-controls="menuCollapse">Menu
            <span><fa :icon="['fas', 'caret-down']" /></span>
          </router-link>
          <ul class="collapse menu-collapse" id="menuCollapse">
            <li class="nav-item">
              <router-link to="/menu/appetizer" class="nav-link">Appetizer</router-link>
            </li>
            <li><router-link to="/menu/soup" class="nav-link">Soup</router-link></li>
            <li><router-link to="/menu/meat" class="nav-link">Meat</router-link></li>
            <li><router-link to="/menu/drink" class="nav-link">Drink</router-link></li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link to="/cart" class="nav-link" data-bs-toggle="collapse" href="#cartCollapse" role="button" aria-expanded="false" aria-controls="cartCollapse">Cart
            <span><fa :icon="['fas', 'caret-down']" /></span>
          </router-link>
          <ul class="collapse cart-collapse" id="cartCollapse">
            <li><router-link to="/cart/items" class="nav-link">Review</router-link></li>
            <li><router-link to="/cart/payment" class="nav-link">Payment</router-link></li>
            <li><router-link to="/cart/confirmation" class="nav-link">Confirmation</router-link></li>
          </ul>
        </li>
      </ul>
    </nav>
    <router-view :auth-user="authUser"></router-view>
  </div>


  <div class="footer">
    <div>&copy; 2022 — <strong>Chinese Food Restaurant</strong></div>
  </div>
</template>

<script>

import firebase from "firebase";

export default {
  name: "app",
  data() {
    return {
      authUser: null,
      icon: ""
    }
  },
  methods: {
    loginWithGoogle(){
      // Login with Google
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth()
          .signInWithPopup(provider)
          .catch(function(error) {

            //let the user know
            console.error('Sign in error: ', error);
          });
    },

    logout(){
      // logout
      firebase.auth().signOut();
      window.location.href ='/';
    },
  },

  // called after the instance has been created
  created() {
    // check for logged in user
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Signed in as: ', user);

        // store the current user
        this.authUser = user; // without models

      } else {
        // User is signed out.
        console.log('Not signed in.');

        // remove the current user
        this.authUser = null;

      }
    });
  },
}
</script>

<style>

</style>
