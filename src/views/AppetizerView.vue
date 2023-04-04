<template>
  <div class="appetizer-view">
    <h3 class="mb-3 text-center">Appetizer</h3>
    <div class="container food">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        <div class="col mb-4" v-for="(appetizer, i) in appetizers" :appetizer="appetizer" :key="i">
          <div class="card h-100">
            <div class="card-img-top pt-3">
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ appetizer.name }}</h5>
              <p class="card-text mt-auto">${{ appetizer.price }}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <label class="m-0">
                <select v-model="appetizer.qty" class="form-select">
                  <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
                </select>
              </label>
              <button @click="addToCart(appetizer)" class="btn btn-success">Add to Cart</button>
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
  name: "AppetizerView",
  created(){
    this.addItemToCart = shared.AddItemToCart;
  },
  data: function () {
    return {
      appetizers: [], // placeholder until firebase data is loaded
    };
  },
  mounted() {
    this.loadAppetizers();
  },
  methods:{
    addToCart(appetizer){
      this.addItemToCart(appetizer);
    },

    loadAppetizers(){
      // load appetizers from firebase in to results array
      db.collection('food/sTVJ2CjaEshhHtMJaHXb/appetizers')
          .onSnapshot(snapshot => {
            // snapshot == the collection at a moment in time
            this.appetizers = [];

            // loop through each document in the array
            snapshot.forEach(doc => {
              // my app does not have models of appetizers
              this.appetizers.push({qty:1, ...doc.data()})

            })
          })
    },
  },
}
</script>

<style scoped>

</style>