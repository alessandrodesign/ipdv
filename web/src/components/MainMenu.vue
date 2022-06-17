<template>
  <ul class="nav flex-column">
    <li class="nav-item">
      <router-link :to="{ name: 'dashboard' }" class="nav-link">Dashboard</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'usuarios' }" class="nav-link">Usuários</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'cargos' }" class="nav-link">Cargos</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'departamentos' }" class="nav-link">Departamentos</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'centros' }" class="nav-link">Centros de custo</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "MainMenu"
}
</script>