<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBusquedas } from '@/stores/busquedas'
const busqueda = ref('')

const resetSearch = () => {
  busqueda.value = ''
}
</script>
<template>
    <h1 class="flex items-center justify-between p-4 font-medium text-gray-800"><router-link to="/crear-cintillos"><font-awesome-icon :icon="['fas', 'chevron-left']" /> VOLVER</router-link> <span>BUSCADOR</span></h1>
    <div class="p-2 mt-2 text-sm border border-solid border-[#FFF59D] bg-[#FFF9C4]">
        Puedes ingresar el codigo de barras del producto o buscar directamente con la descripcion o marca.
      </div>
      <form class="w-full bg-gray-50 p-4">
       <div class="flex items-center justify-between border border-solid border-[#ddd]">
        <input type="text" placeholder="Ingresa tu busqueda.. " class="block w-full p-3 outline-0 bg-white" v-model="busqueda">
       <button type="reset" @click.prevent="resetSearch" v-if="busqueda.length > 0" class="block bg-white p-3"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
       <button class="block bg-white p-3"><font-awesome-icon :icon="['fas', 'barcode']" /></button>
        <button type="submit" class="block bg-white p-3"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
       </div> 
      </form>
      
      {{ busqueda }}
</template>
<style>
  * {
    box-sizing: border-box;
  }
</style>