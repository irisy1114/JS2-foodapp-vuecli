<template>
  <div class="home-view">
    <div class="text-center mt-5">
      <div class="container">
        <h2>Check out yummy Chinese food!</h2>
        <img src="@/assets/home-food.jpg" class="w-50 h-50">
      </div>
      <div class="container ">
        <router-link to="/menu/appetizer" class="btn btn-success btn-lg mt-5">View Menu</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  props: {
    authUser: {type: Object}
  },
}
</script>

<style scoped>

</style>