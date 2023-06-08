<script setup>
import axios from 'axios'
import { storeToRefs } from 'pinia';
import { useCintillosStore } from '@/stores/cintillos'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const useProductos = useCintillosStore()
const { cintilloDetalles } = storeToRefs(useProductos)
const { agregarDetallesCintillo } = useProductos

const barra = ref('')
const descripcion = ref('')
const precio = ref('')
const autor = ref('')

const traerDetallesCintillo = async() => {
  try {
    const { data } = await axios.get(`https://procter.work/api/cintillo/detalles/${route.params.uuid}`)
    console.log(data)
    agregarDetallesCintillo(data)
    barra.value = cintilloDetalles.value[0].barra
    descripcion.value = cintilloDetalles.value[0].descripcion
    precio.value = cintilloDetalles.value[0].precio
    autor.value = cintilloDetalles.value[0].autor
  }catch(error){
    console.log(error)
  }
}
traerDetallesCintillo()

const guardarDatos = async() => {
  try {
    const datosFrm = {
      "barra": barra.value,
      "descripcion": descripcion.value,
      "precio": precio.value,
      "autor": autor.value,
      "uuid": route.params.uuid
    }
    const { data } = await axios.post('https://procter.work/api/cintillo/editar', datosFrm)
    alert(data.msg)
  }catch(error){
    console.log(error)
  }
}
</script>
<template>
    <h1 class="p-4 font-bold text-gray-800 flex align-items justify-between"><router-link to="/cintillos"><font-awesome-icon :icon="['fas', 'chevron-left']" /> VOLVER</router-link> EDITAR CINTILLO</h1>

    <div class="p-4">
      <form class="w-full max-w-lg" @submit.prevent="guardarDatos">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              CODIGO DE BARRA:
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" type="text" placeholder="Ej. 1234567890123" autocomplete="off" v-model="barra">
              <p class="text-gray-600 text-xs font-light"><font-awesome-icon :icon="['fas', 'info-circle']" />El código de barra es opcional</p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              DESCRIPCIÓN DEL PRODUCTO:
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name" type="text" placeholder="DESCRIPCIÓN COMPLETA" autocomplete="off" v-model="descripcion" required>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              PRECIO DEL PRODUCTO:
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password" type="text" placeholder="PRECIO" autocomplete="off" v-model="precio" required>
            <p class="text-gray-600 text-xs font-light"><font-awesome-icon :icon="['fas', 'info-circle']" /> Ingresá el
              precio correcto para este producto</p>
          </div>
        </div>
        
        <input type="submit"
          class="w-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 border border-emerald-700 rounded"
          value="AGREGAR CINTILLO">
      </form>
    </div>
    </template>