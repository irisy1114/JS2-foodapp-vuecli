<template>
  <div>
    <div v-if="item" class="alert alert-success"><strong>{{ newItem.name }}</strong> is successfully added to your cart!</div>
    <h3>Items</h3>
    <table class="table">
      <thead>
      <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Price</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, i) in cart.items" :key="i">
        <td>{{item.name}}</td>
        <td>
          <button class="btn btn-tiny" @click="subtractQty(item)"><fa :icon="['fas', 'circle-minus']" /></button>
          {{item.qty}}
          <button class="btn btn-tiny" @click="addQty(item)"><fa :icon="['fas', 'circle-plus']" /></button>
        </td>
        <td>${{lineTotal(item)}}</td>
      </tr>

      </tbody>
      <tfoot>
      <tr>
        <td>Subtotal</td>
        <td>{{qtyTotal.toFixed(0)}}</td>
        <td>${{cartTotal.toFixed(2)}}</td>
      </tr>
      </tfoot>
    </table>

    <router-link to="/cart/payment" class="w-100 btn btn-success btn-lg">Continue</router-link>

  </div>
</template>

<script>
export default {
  name: "CartItemsView",
  props: {
    cart: {
      type: Object,
      required: true
    },
    item: {
      type: String, // JSON string coming in from router
    },
    id: {
      type: String,
    },
  },
  data(){
    return {
      newItem : this.item ? JSON.parse(this.item) : false,
    }
  },

  computed: {
    cartTotal(){
      return this.cart.items.reduce((total, item) => total += item.price * item.qty, 0)
    },
    qtyTotal(){
      return this.cart.items.reduce((total, item) => total += item.qty, 0)
    }
  },
  mounted() {
    if (this.newItem) {
      // remove duplicates and update qty
      const found = this.cart.items.find(i => i.name === this.newItem.name);
      if(found) {
        found.qty += this.newItem.qty;
      }
      else {
        // eslint-disable-next-line
        this.cart.items.push(this.newItem);
      }
    }
  },
  methods: {
    addQty(item){
      item.qty++;
    },
    subtractQty(item){
      if(item.qty>0)
        item.qty--;
      if(item.qty == 0)
          // eslint-disable-next-line
        this.cart.items.splice(this.cart.items.indexOf(item),1);

    },
    lineTotal(item){
      const total = item.price * item.qty;
      return total.toFixed(2);
    }
  },
}
</script>

<style scoped>

</style>