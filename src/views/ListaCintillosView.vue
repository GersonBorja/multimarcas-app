<script setup>
import { ref } from 'vue'
import axios from 'axios'
import PaginateCintillos from '@/components/PaginateCintillos.vue'
 
import { storeToRefs } from 'pinia';
import { useCintillosStore } from '@/stores/cintillos'


const useProductos = useCintillosStore()
const { listaCintillos } = storeToRefs(useProductos)
const { agregarCintillos } = useProductos

  const user = localStorage.getItem('usuario')
  const datos = ref([])
  const total = ref(null)
  
  
  
  const getData = async () => {
    try {
      let { data } = await axios.get(`https://procter.work/api/cintillos/listado/${user}`)
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
  
</script>
<template>
  <div class="p-4">
    
    <div v-if="listaCintillos.length > 0">
      <h1 class="font-bold text-gray-800 mb-3">GENERAR DOCUMENTO</h1>
      
      <div class="flex items-center justify-between mb-3">
        <div class="text-gray-400 text-sm"><font-awesome-icon :icon="['fas', 'gear']" class="fa-spin"/>Llevas {{ total }}/<span class="text-red-400">135</span></div>
        <a :href="`https://procter.work/api/cintillos/generar/${user}`"
        class="bg-emerald-300 hover:bg-emerald-400 text-emerald-800 text-sm font-medium py-2 px-4 rounded inline-flex items-center">
        <font-awesome-icon :icon="['fas', 'download']" />
        <span> Generar cintillos</span>
      </a>

      </div>
      
    </div>

    <h1 class="font-bold text-gray-800 mb-3">LISTADO DE CINTILLOS</h1>
    <div class="flex items-center justify-center font-light text-2xl h-52 text-gray-500" v-if="datos.length === 0">
      <font-awesome-icon :icon="['fas', 'face-sad-cry']" /> Aun no has agregado datos..
    </div>
    <!-- component -->
    <div class="w-full">
      <div class="flex justify-center">
        <div class="w-full max-w-md">
          <div class="bg-white shadow-md">
            
            <div class="text-sm border border-solid border-gray-200 border-b-0" v-for="item in datos.slice(inicio, fin)">
              <div
                class="text-gray-700 hover:text-emerald-400 hover:bg-emerald-100">
                
                <div class="font-medium p-3">{{ item.descripcion }}</div>
                 <div class="p-2 flex items-center justify-between">
                <div><b class="font-bold font-black">CANTIDAD:</b> {{ item.cantidad }}</div>
                <div><b class="font-bold font-black">PRECIO:</b> ${{ item.precio }}</div>
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