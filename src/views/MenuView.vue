<template>
  <div class="menu-view">
    <h2>&nbsp;Menu</h2>
    <div class="container">
      <div class="row">
        <div class="col">
          <ul class="nav nav-pills nav-fill mb-3">
            <li class="nav-item">
              <router-link to="/menu/appetizer" class="nav-link">Appetizer</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/menu/soup" class="nav-link">Soup</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/menu/meat" class="nav-link">Meat</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/menu/drink" class="nav-link">Drink</router-link>
            </li>
          </ul>

          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuView"
}
</script>

<style scoped>

</style>