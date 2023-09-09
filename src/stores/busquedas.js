import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBusquedas = defineStore('buscador', () => {
  
  const resultados = ref([])
  
  const busquedasEncontradas= (data) => {
    resulados.value = data
  }
  
  return {
    resultados,
    busquedasEncontradas
  }
})
