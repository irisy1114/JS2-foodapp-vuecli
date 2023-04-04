<template>
  <div>
    <h3>Payment</h3>
    <div class="row gy-3">
      <div class="col-md-6">
        <label for="cc-name" class="form-label">Name on card *</label>
        <input type="text" class="form-control" id="cc-name" placeholder="" required v-model="myCart.payment.nameOnCard">
        <small class="text-muted">Full name as displayed on your card</small><br>
<!--        <span class="text-danger" v-if="!nameIsValid">Name on card is required</span>-->
      </div>

      <div class="col-md-6">
        <label for="cc-number" class="form-label">Credit card number *</label>
        <input type="text" class="form-control" id="cc-number" placeholder="" required  v-model="myCart.payment.cardNo">
<!--        <span class="text-danger" v-if="!cardNoIsValid">Credit card number is required</span>-->
      </div>

      <div class="col-md-3">
        <label for="cc-expiration" class="form-label">Expiration *</label>
        <input type="text" class="form-control" id="cc-expiration" placeholder="" required v-model="myCart.payment.expiration">
      </div>

      <div class="col-md-3">
        <label for="cc-cvv" class="form-label">CVV *</label>
        <input type="text" class="form-control" id="cc-cvv" placeholder="" required maxlength="3" v-model="myCart.payment.cvv">
      </div>

      <div class="col-md-6">
        <label for="phone" class="form-label">Phone Number *</label>
        <input type="text" class="form-control" id="phone" placeholder="" v-model="myCart.payment.phoneNo" required>
      </div>
    </div>

    <hr class="my-4">
    <label v-if="!validInfo" class="warninglb" >{{validationMsg}}</label>
    <router-link to="/cart/confirmation" :class="{ disabled: !validInfo}" class="w-100 btn btn-success btn-lg">Continue</router-link>
  </div>
</template>

<script>
export default {
  name: "CartPaymentView",
  props: {
    cart: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      validationMsg: 'Please enter required information * to continue.',
      myCart: this.cart
    }
  },
  computed: {
    validInfo(){
      return this.cart.payment
          && this.cart.payment.nameOnCard
          && this.cart.payment.cardNo
          && this.cart.payment.expiration
          && this.cart.payment.cvv
          && this.cart.payment.phoneNo;
    },
    // nameIsValid(){
    //   return this.cart.payment.nameOnCard.length > 0
    // },
    // cardNoIsValid(){
    //   return this.cart.payment.cardNo.length > 0
    // }
  }
}
</script>

<style scoped>

</style>