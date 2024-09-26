import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: Home
  },
  {
    path: '/solicitacao-entrega',
    name: 'SolicitacaoEntrega',
    component: () => import(/* webpackChunkName: "about" */ '../views/SolicitacaoEntrega.vue')
  },
  {
    path: '/listagem-entrega',
    name: 'ListagemEntrega',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListagemEntregas.vue')
  },
  {
    path: '/confirmacao-entrega',
    name: 'ConfirmacaoEntrega',
    component: () => import(/* webpackChunkName: "about" */ '../views/ConfirmacaoEntrega.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
