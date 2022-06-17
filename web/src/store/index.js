import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: [],
    users: [],

    cargo: [],
    cargos: [],

    departamento: [],
    departamentos: [],

    centroDeCusto: [],
    centrosDeCusto: []
  },
  getters: {
  },
  mutations: {
    //Usuário
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users;
    },
    unsetUser(state, users) {
      state.users = users;
    },
    //Cargo
    setCargo(state, cargo) {
      state.cargo = cargo;
    },
    setCargos(state, cargos) {
      state.cargos = cargos;
    },
    unsetCargo(state, cargos) {
      state.cargos = cargos;
    },
    //Departamento
    setDepartamento(state, departamento) {
      state.departamento = departamento;
    },
    setDepartamentos(state, departamentos) {
      state.departamentos = departamentos;
    },
    unsetDepartamento(state, departamentos) {
      state.departamentos = departamentos;
    },
    //Centro de custo
    setCentroDeCusto(state, centroDeCusto) {
      state.centroDeCusto = centroDeCusto;
    },
    setCentrosDeCusto(state, centrosDeCustos) {
      state.centrosDeCusto = centrosDeCustos;
    },
    unsetCentroDeCusto(state, centrosDeCusto) {
      state.centrosDeCusto = centrosDeCusto;
    }
  },
  actions: {
    //Usuario
    getUser({ commit }, id) {
      axios.get('usuario/' + id)
        .then(response => {
          commit('setUser', response.data)
        })
    },
    getUsers({ commit }) {
      axios.get('usuario')
        .then(response => {
          commit('setUsers', response.data)
        })
    },
    removeUser({ dispatch }, id) {
      if (confirm('Tem certeza de que deseja remover esse item?')) {
        axios.delete('usuario/' + id)
          .then(() => dispatch('getUsers'))
      }
    },
    //Cargo
    getCargo({ commit }, id) {
      axios.get('cargo/' + id)
        .then(response => {
          commit('setCargo', response.data)
        })
    },
    getCargos({ commit }) {
      axios.get('cargo')
        .then(response => {
          commit('setCargos', response.data)
        })
    },
    removeCargo({ dispatch }, id) {
      if (confirm('Tem certeza de que deseja remover esse item?')) {
        axios.delete('cargo/' + id)
          .then(() => dispatch('getCargos'))
      }
    },
    //Departamentos
    getDepartamento({ commit }, id) {
      axios.get('departamento/' + id)
        .then(response => {
          commit('setDepartamento', response.data)
        })
    },
    getDepartamentos({ commit }) {
      axios.get('departamento')
        .then(response => {
          commit('setDepartamentos', response.data)
        })
    },
    getDepartamentoUsers({ commit }, id) {
      axios.get('departamento/' + id + "/usuarios")
        .then(response => {
          commit('setUsers', response.data)
        })
    },
    removeDepartamento({ dispatch }, id) {
      if (confirm('Tem certeza de que deseja remover esse item?')) {
        axios.delete('departamento/' + id)
          .then(() => dispatch('getDepartamentos'))
      }
    },
    //Centro de custo
    getCentroDeCusto({ commit }, id) {
      axios.get('centro-de-custo/' + id)
        .then(response => {
          commit('setCentroDeCusto', response.data)
        })
    },
    getCentroDeCustoDepartamentos({ commit }, id) {
      axios.get('centro-de-custo/' + id + "/departamentos")
        .then(response => {
          commit('setDepartamentos', response.data)
        })
    },
    getCentrosDeCusto({ commit }) {
      axios.get('centro-de-custo')
        .then(response => {
          commit('setCentrosDeCusto', response.data)
        })
    },
    removeCentroDeCusto({ dispatch }, id) {
      if (confirm('Tem certeza de que deseja remover esse item?')) {
        axios.delete('centro-de-custo/' + id)
          .then(() => dispatch('getCentrosDeCusto'))
      }
    },
  },
  modules: {
  }
})
