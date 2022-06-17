import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import EmptyView from '../views/EmptyView.vue'
import UsuariosView from '../views/UsuariosView.vue'
import UsuarioView from '../views/UsuarioView.vue'
import CargosView from '../views/CargosView.vue'
import CargoView from '../views/CargoView.vue'
import DepartamentosView from '../views/DepartamentosView.vue'
import DepartamentoView from '../views/DepartamentoView.vue'
import DepartamentoUsuariosView from '../views/DepartamentoUsuariosView.vue'
import CentrosDeCustoView from '../views/CentrosDeCusto.vue'
import CentroDeCustoView from '../views/CentroDeCusto.vue'
import CentroDeCustoDepartamentosView from '../views/CentroDeCustoDepartamentosView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: EmptyView,
    props: true,
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: UsuariosView,
    props: true,
  },
  {
    path: '/usuario/:id?',
    name: 'usuario',
    component: UsuarioView,
    props: true,
  },
  {
    path: '/cargos',
    name: 'cargos',
    component: CargosView,
    props: true,
  },
  {
    path: '/cargo/:id?',
    name: 'cargo',
    component: CargoView,
    props: true,
  },
  {
    path: '/departamentos',
    name: 'departamentos',
    component: DepartamentosView,
    props: true,
  },
  {
    path: '/departamento/:id?',
    name: 'departamento',
    component: DepartamentoView,
    props: true,
  },
  {
    path: '/usuarios-do-departamento/:id?',
    name: 'departamento-usuarios',
    component: DepartamentoUsuariosView,
    props: true,
  },
  {
    path: '/centros',
    name: 'centros',
    component: CentrosDeCustoView,
    props: true,
  },
  {
    path: '/centro/:id?',
    name: 'centro',
    component: CentroDeCustoView,
    props: true,
  },
  {
    path: '/departamentos-do-centro/:id?',
    name: 'centro-departamentos',
    component: CentroDeCustoDepartamentosView,
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
