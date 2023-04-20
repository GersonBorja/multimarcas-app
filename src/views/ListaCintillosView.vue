<script setup>
import axios from 'axios'
  import { RouterLink } from 'vue-router'
  import { ref } from 'vue'
import PaginateCintillos from '../components/PaginateCintillos.vue'
  
  const cintillos = ref([])
  
  const traerCintillos = async () => {
    try {
      const { data } = await axios.get(`https://procter.work/api/cintillos/listado/${localStorage.getItem('usuario')}`)
      cintillos.value = data
      console.log(data)
    }catch (error){
      console.log(error)
    }
  }
  traerCintillos()
  let postXpagina = 6
  const inicio = ref(0)
  const fin = ref(6)
  
  const siguiente = () => {
    inicio.value += postXpagina
    fin.value += postXpagina
  }
  const anterior = () => {
    inicio.value -= postXpagina
    fin.value -= postXpagina
  }
  const user = localStorage.getItem('usuario')
</script>
<template>
  <div class="p-4">
    <h1 class="font-medium text-gray-900">Listado de cintillos agregados</h1>
    <div class="flex items-center justify-center font-light text-3xl h-52" v-if="cintillos.length === 0">
      Aun no has agregado cintillos..
    </div>
    <!-- component -->
    <div class="w-full">
      <div class="flex justify-center">
        <div class="w-full max-w-md">
          <div class="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
            
            <div class="py-3 text-sm" v-for="item in cintillos.slice(inicio, fin)">
              <div
                class="flex justify-start cursor-pointer text-gray-700 hover:text-emerald-400 hover:bg-emerald-100 rounded-md px-1 py-2">
                <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                <div class="flex-grow font-medium px-2">{{ item.descripcion }}</div>
                <div class="text-sm font-normal text-gray-500 tracking-wide">${{ item.precio }}</div>
              </div>
              
            </div>
            <!-- aqui btn -->
            <PaginateCintillos :inicio="inicio" :fin="fin" :maxLength="cintillos.length" @siguiente="siguiente"
              @anterior="anterior"></PaginateCintillos>
            
          </div>
        </div>
      </div>
    </div>
    <div class="p-4" v-if="cintillos.length > 0">
      <h2 class="font-bold text-gray-900 mb-4">¿TERMINASTE?</h2>
      <a :href="`https://procter.work/api/cintillos/generar/${user}`" class="bg-emerald-300 hover:bg-emerald-400 text-emerald-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>DESCARGAR CINTILLOS</span>
      </a>
    </div>
  </div>
  
</template>