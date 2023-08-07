<script setup>
import { ref } from 'vue'
import axios from 'axios'
import PaginateCintillos from '@/components/PaginateCintillos.vue'
 import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useCintillosStore } from '@/stores/cintillos'
import  { useCintillosCreados } from '@/stores/cintillosCreados'
let useCantidad = useCintillosCreados()
let { resetCintillos } = useCantidad

const useProductos = useCintillosStore()
const { listaCintillos } = storeToRefs(useProductos)
const { agregarCintillos, agregarDetallesCintillo } = useProductos

  const user = localStorage.getItem('usuario')
  const token = ref(localStorage.getItem('token'))
  const datos = ref([])
  const total = ref(null)
  
  
  
  const getData = async () => {
    try {
      const headers = {
        'Authorization': 'Bearer ' + token.value,
        'Content-Type': 'application/json'
      }
      let { data } = await axios.post(`https://procter.work/api/cintillo`, null, { headers })
      agregarCintillos(data)
      total.value = data.length
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
  
  
  /* generar archivos */
  const modal = ref(false)
  const router = useRouter()
  const generarButton = () => {
    modal.value = true
    location.href= `https://procter.work/api/cintillos/generar/${user}`
  }
  
</script>
<template>
  <div class="p-4">
    
    <div v-if="listaCintillos.length > 0">
      <h1 class="mb-3 font-bold text-gray-800">GENERAR DOCUMENTO</h1>
      <h1 class="flex items-center justify-between px-4 font-bold text-gray-800"><router-link to="/crear-cintillos"><font-awesome-icon :icon="['fas', 'chevron-left']" /> VOLVER</router-link> <span>GENERAR DOCUMENTO</span></h1>
      <div class="flex items-center justify-between mb-3">
        <div class="text-sm text-gray-400"><font-awesome-icon :icon="['fas', 'gear']" class="fa-spin"/>Llevas {{ total }}/<span class="text-black">448</span></div>
        <router-link :to="`/descargas`"
        class="inline-flex items-center px-4 py-2 text-sm font-medium rounded text-white bg-[#2E3239] hover:bg-[#37474F] border border-solid border-[#303E46] shadow-lg">
        <font-awesome-icon :icon="['fas', 'download']" />
        Generar cintillos
      </router-link>

      </div>
      
    </div>

    <h1 class="mb-3 font-bold text-gray-800">LISTADO DE CINTILLOS</h1>
    <div class="flex items-center justify-center text-2xl font-light text-gray-500 h-52" v-if="datos.length === 0">
      <font-awesome-icon :icon="['fas', 'face-sad-cry']" /> Aun no has agregado datos..
    </div>
    <!-- component -->
    <div class="w-full">
      <div class="flex justify-center">
        <div class="w-full max-w-md">
          <div class="bg-white shadow-md">
            
            <div class="text-sm border border-b-0 border-gray-200 border-solid" v-for="item in datos.slice(inicio, fin)">
              <div
                class="text-gray-700">
                
                <div class="flex items-start justify-between p-3 font-medium">{{ item.descripcion }} <router-link :to="`/editar/${item.uuid}`" v-if="item.uuid" class="text-right font-medium w-[65px]"><font-awesome-icon :icon="['fas', 'pen-to-square']" /> Editar</router-link></div>
                 <div class="flex items-center justify-between p-2">
                <div><b class="font-bold text-black">CANTIDAD:</b> {{ item.cantidad }}</div>
                <div><b class="font-bold text-black">PRECIO:</b> ${{ item.precio }}</div>
              </div>
              </div>
              
            </div>
            <!-- aqui btn -->
            <PaginateCintillos :inicio="inicio" :fin="fin" :maxLength="datos.length" @siguiente="siguiente"
              @anterior="anterior"></PaginateCintillos>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  
 
</template>