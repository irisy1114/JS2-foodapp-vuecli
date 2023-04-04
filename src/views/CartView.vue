<template>
  <div class="cart-view">
    <h2>Cart</h2>
    <div class="container">
      <div class="row">
        <div class="col col-md-8">
          <ul class="nav nav-pills nav-fill mb-3">
            <li class="nav-item">
              <router-link to="/cart/items" class="nav-link">Review</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cart/payment" class="nav-link">Payment</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cart/confirmation" class="nav-link">Confirmation</router-link>
            </li>
          </ul>

          <!-- Add nested view -->
          <router-view :cart="cart" :auth-user="authUser"></router-view>

        </div>
        <div class="col col-md-4">
          <h3>Cart Summary</h3>
          <table class="table table-borderless">
            <tbody>
            <tr>
              <td>{{cart.items.length}} Items</td>
              <td>${{subtotal.toFixed(2)}}</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>${{ tax.toFixed(2) }}</td>
            </tr>
            <tr v-if="cart.payment.cardNo">
              <td>Payment</td>
              <td>**** **** **** {{cart.payment.cardNo.substr(-4, 4)}}</td>
            </tr>
            <tr class="font-weight-bold">
              <td>Total</td>
              <td>${{total.toFixed(2)}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartView",
  data() {
    return {
      cart: {
        items: [],
        payment: {}
      }
    }
  },
  props: {
    authUser: {required: true},
  },
  computed: {
    subtotal() {
      return this.cart.items.reduce((total, item) => (total + item.price * item.qty), 0)
    },
    tax() {
      return this.subtotal * .05;
    },

    total() {
      return this.subtotal + this.tax;
    }
  },

  //add watch and created methods to store/retrieve cart items from session
  created: function () {
    // put list from localStorage in the app, if it exists
    if (localStorage.getItem('foodCart')) {
      this.cart = JSON.parse(localStorage.getItem('foodCart'));
    }
  },
  watch: {
    cart: {
      // call this before the item changes
      handler: function (newList) {
        // newList is the list BEFORE it updates the model/view
        localStorage.setItem('foodCart', JSON.stringify(newList));
      },

      // deep tells vue to watch nested properties
      deep: true
    }
  },
}
</script>

<style scoped>

</style>