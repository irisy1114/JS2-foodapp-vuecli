<template>
  <div class="drink-view">
    <h3 class="mb-3 text-center">Drink</h3>
    <div class="container food">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        <div class="col mb-4" v-for="(drink, i) in drinks" :drink="drinks" :key="i">
          <div class="card h-100">
            <div class="card-img-top pt-3">
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ drink.name }}</h5>
              <p class="card-text mt-auto">${{ drink.price }}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <label class="m-0">
                <select v-model="drink.qty" class="form-select">
                  <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
                </select>
              </label>
              <button @click="addToCart(drink)" class="btn btn-success">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shared from "@/shared";
import {db} from "@/firebase";

export default {
  name: "DrinkView",
  created(){
    this.addItemToCart = shared.AddItemToCart;
  },
  data: function () {
    return {
      drinks: [], // placeholder until firebase data is loaded

    };

  },
  mounted() {
    this.loadDrinks();
  },
  methods:{
    addToCart(drink){
      // this.$router.push({name: 'addToCart', params: {item: JSON.stringify(drink)}})
      this.addItemToCart(drink);
    },

    loadDrinks(){
      // load drinks from firebase in to results array
      db.collection('food/sTVJ2CjaEshhHtMJaHXb/drinks')
          .onSnapshot(snapshot => {
            // snapshot == the collection at a moment in time
            this.drinks = [];

            // loop through each document in the array
            snapshot.forEach(doc => {
              // app did not have models
              this.drinks.push({qty:1, ...doc.data()})
            })
          })
    },
  },
}
</script>

<style scoped>

</style>