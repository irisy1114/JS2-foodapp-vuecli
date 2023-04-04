<template>
  <div class="meat-view">
    <h3 class="mb-3 text-center">Meat</h3>
    <div class="container food">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        <div class="col mb-4" v-for="(meat, i) in meats" :meat="meats" :key="i">
          <div class="card h-100">
            <div class="card-img-top pt-3">
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ meat.name }}</h5>
              <p class="card-text mt-auto">${{ meat.price }}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <label class="m-0">
                <select v-model="meat.qty" class="form-select">
                  <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
                </select>
              </label>
              <button @click="addToCart(meat)" class="btn btn-success">Add to Cart</button>
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
  name: "MeatView",
  created(){
    this.addItemToCart = shared.AddItemToCart;
  },
  data: function () {
    return {
      meats: [], // placeholder until firebase data is loaded
    };
  },
  mounted() {
    this.loadMeats();
  },
  methods:{
    addToCart(meat){
      this.addItemToCart(meat);
    },

    loadMeats(){
      // load meats from firebase in to results array
      db.collection('food/sTVJ2CjaEshhHtMJaHXb/meats')
          .onSnapshot(snapshot => {
            // snapshot == the collection at a moment in time
            this.meats = [];

            // loop through each document in the array
            snapshot.forEach(doc => {
              // my app did not have models
              this.meats.push({qty:1, ...doc.data()})
            })
          })
    },
  },
}
</script>

<style scoped>

</style>