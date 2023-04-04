<template>
  <div class="soup-view">
    <h3 class="mb-3 text-center">Soup</h3>
    <div class="container food">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        <div class="col mb-4" v-for="(soup, i) in soups" :soup="soups" :key="i">
          <div class="card h-100">
            <div class="card-img-top pt-3">
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ soup.name }}</h5>
              <p class="card-text mt-auto">${{ soup.price }}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <label class="m-0">
                <select v-model="soup.qty" class="form-select">
                  <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
                </select>
              </label>
              <button @click="addToCart(soup)" class="btn btn-success">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shared from "@/shared";
import {db, firebase} from "@/firebase"; firebase

export default {
  name: "SoupView",
  created(){
    this.addItemToCart = shared.AddItemToCart;
  },
  data: function () {
    return {
      soups: [], // placeholder until firebase data is loaded
    };
  },
  mounted() {
    this.loadSoups();
  },
  methods:{
    addToCart(soup){
      this.addItemToCart(soup);
    },

    loadSoups(){
      // load soups from firebase in to results array
      db.collection('food/sTVJ2CjaEshhHtMJaHXb/soups')
          .onSnapshot(snapshot => {
            // snapshot == the collection at a moment in time
            this.soups = [];

            // loop through each document in the array
            snapshot.forEach(doc => {
              // my app did not have models
              this.soups.push({qty:1, ...doc.data()})
            })
          })
    },
  },
}
</script>

<style scoped>

</style>