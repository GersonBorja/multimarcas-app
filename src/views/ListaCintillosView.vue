<script setup>
import { ref } from 'vue'
import axios from 'axios'
  import { RouterLink } from 'vue-router'
import PaginateCintillos from '@/components/PaginateCintillos.vue'
 
  const user = localStorage.getItem('usuario')
  const datos = ref([])
  
  
  
  const getData = async () => {
    try {
      let { data } = await axios.get(`https://procter.work/api/cintillos/listado/${user}`)
      let uniqueData = data.filter((v,i,a)=>a.findIndex(t=>(t.descripcion === v.descripcion))===i);
      datos.value = uniqueData
    } catch (error) {
      console.log(error)
    }
  }
  getData()
  
  
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
  
</script>
<template>
  <div class="p-4">
    <h1 class="font-medium text-gray-900">Listado de datos agregados</h1>
    <div class="flex items-center justify-center font-light text-3xl h-52" v-if="datos.length === 0">
      Aun no has agregado datos..
    </div>
    <!-- component -->
    <div class="w-full">
      <div class="flex justify-center">
        <div class="w-full max-w-md">
          <div class="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
            
            <div class="py-3 text-sm" v-for="item in datos.slice(inicio, fin)">
              <div
                class="cursor-pointer text-gray-700 hover:text-emerald-400 hover:bg-emerald-100 rounded-md px-1 py-2 border-b border-solid border-gray-400">
                <div class="flex items-center space-between">
                  
                <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                <div class="flex-grow font-medium px-2">{{ item.descripcion }}</div>
                <div class="text-sm font-normal text-gray-500 tracking-wide">${{ item.precio }}</div>
                </div>
                <div class="px-1 py-2 font-medium font-black">CANTIDAD: {{ item.cantidad }}</div>
              </div>
              
            </div>
            <!-- aqui btn -->
            <PaginateCintillos :inicio="inicio" :fin="fin" :maxLength="datos.length" @siguiente="siguiente"
              @anterior="anterior"></PaginateCintillos>
            
          </div>
        </div>
      </div>
    </div>
    <div class="p-4" v-if="datos.length > 0">
      <h2 class="font-bold text-gray-900 mb-4">¿TERMINASTE?</h2>
      <a :href="`https://procter.work/api/cintillos/generar/${user}`"
        class="bg-emerald-300 hover:bg-emerald-400 text-emerald-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>DESCARGAR datos</span>
      </a>
    </div>
  </div>
  
 
</template>