<template>
  <div>
    <h3>Confirmation</h3>
    <p>Name: {{cart.payment.nameOnCard}}</p>
    <p>Payment: {{cart.payment.cardNo.substr(-4, 4)}}</p>
    <p>Phone number: {{cart.payment.phoneNo}}</p>
    <hr class="my-4">
    <label v-if="!validInfo" class="warninglb" >{{validationMsg}}</label>
    <button v-if="cart.payment" @click="saveOrder" type="button" :class="{ disabled: !validInfo }" class="w-100 btn btn-success btn-lg">Checkout</button>
    <div class="modal fade" role="dialog" id="checkoutModal" tabindex="-1" aria-labelledby="checkoutModal_label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="checkoutModal_label">Your Order number is: {{orderNo}}
            </h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            Thanks for shopping with us!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shared from "@/shared";
import {Order} from "@/models/Order";
import {OrderItem} from "@/models/OrderItem";
import * as bootstrap from 'bootstrap';
import {db} from "@/firebase";

export default {
  name: "CartConfirmationView",
  props: {
    cart: {
      type: Object,
      required: true
    },
    authUser: {required: true},
  },
  data() {
    return {
      bsModel: {},
      orderNo: '',
      cartCacheKey:'foodCart',
      validationMsg:'Please add items to cart and complete payment section in order to checkout.'
    }
  },
  computed: {
    validInfo(){
      // const cart = this.getCart();
      return this.cart
          && this.cart.items
          && this.cart.items.length >= 1
          && this.cart.payment
          && this.cart.payment.nameOnCard
          && this.cart.payment.cardNo
          && this.cart.payment.expiration
          && this.cart.payment.cvv
          && this.cart.payment.phoneNo;
    }
  },
  created(){
    this.getCart = shared.GetCart;
    this.prompt = shared.Prompt;
  },
  mounted(){
    this.bsModel = new bootstrap.Modal(document.getElementById('checkoutModal'));
    const dt = new Date();
    this.orderNo = (dt.getFullYear().toString()+(dt.getMonth() + 1).toString()+dt.getDate().toString()+dt.getMilliseconds().toString())
  },
  methods: {
    saveOrder() {
      //get current cart from cache/localstorage
      const myCartString = localStorage.getItem(this.cartCacheKey);
      if(!myCartString){
        alert("You have not added anything to your cart yet.");
        return;
      }

      const shoppingCart = JSON.parse(myCartString);
      //map cart to a new order
      const myOrder = new Order();
      myOrder.Id = this.orderNo;
      if(this.authUser && this.authUser.email)
        myOrder.Email = this.authUser.email;
        myOrder.CustomerName = shoppingCart.payment.nameOnCard;
        myOrder.OrderNumber = this.orderNo;
        myOrder.Items = [];
      //map cart items to order items
      for (let i = 0; i < shoppingCart.items.length; i++) {
        const item = shoppingCart.items[i];
        const myOrderItem = new OrderItem;
        myOrderItem.Id = item.id;
        myOrderItem.Desc = item.description;
        myOrderItem.Qty = item.price;
        myOrder.Items.push(myOrderItem);
      }
      // add order to firebase
      try {
        db.collection('orders')
            .add(JSON.parse(JSON.stringify(myOrder)))
            .then(docRef => {
              console.log('Doc added.', docRef);
              this.bsModel.show();
              //clear the cache
              localStorage.removeItem(this.cartCacheKey);

            });
      }
      catch (e){
        this.prompt('Error processing order, please try again later.',true)
        console.error('Error adding orders. ', e);
      }
    },
    closeModal(){
      this.bsModel.hide();
      //redirect to home page
      window.location.href = '/';
    }
  },
}
</script>

<style scoped>

</style>