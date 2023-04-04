import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import MenuView from "@/views/MenuView";
import AppetizerView from "@/views/AppetizerView";
import SoupView from "@/views/SoupView";
import MeatView from "@/views/MeatView";
import DrinkView from "@/views/DrinkView";
import CartView from "@/views/CartView";
import CartItemsView from "@/views/CartItemsView";
import CartPaymentView from "@/views/CartPaymentView";
import CartConfirmationView from "@/views/CartConfirmationView";
// import OrderHistoryView from "@/views/OrderHistoryView";

const routes = [
      { path: '', component: HomeView},
      { path: '/home', component: HomeView},
      { path: '/menu', component: MenuView, children: [
          {path: 'appetizer', component: AppetizerView},
          {path: 'soup', component: SoupView},
          {path: 'meat', component: MeatView},
          {path: 'drink', component: DrinkView}
        ]},
      { path: '/cart', component: CartView, children: [
          {path: '', redirect: '/cart/items'},
          {path: 'items', component: CartItemsView},
          {path: 'payment', component: CartPaymentView},
          {path: 'confirmation', component: CartConfirmationView, props: true},

        ]},
    // { path: '/orderHistory', component: OrderHistoryView},
    ]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
