<script setup>
import { computed, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import  { useCintillosCreados } from '@/stores/cintillosCreados'

let useCantidad = useCintillosCreados()
let { obtenerTotalCintillos } = useCantidad
let { cantidadTotal } = storeToRefs(useCantidad)
obtenerTotalCintillos()

const validar = ref(false)
const validarUsuario = computed(() => {
  if(localStorage.getItem('usuario') !== null){
    return true
  }
})
</script>

<template>
  <header class="bg-gray-100 flex items-center justify-between p-4">
    <h1 class="font-bold">MULTIMARCAS <span class="text-emerald-700">APP</span></h1>
      <nav v-if="validarUsuario">
        <router-link to="/" class="mr-2" active-class="text-emerald-500">Inicio</router-link>
        <router-link to="/cintillos" active-class="text-emerald-500">Cintillos <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{ cantidadTotal }}</span></router-link>
      </nav>
  </header>

  <RouterView />
</template>
