import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCintillosStore = defineStore('cintillos', () => {

  const listaCintillos = ref([])
  
  const agregarCintillos = (cintillos) => {
    listaCintillos.value = cintillos
  }

  return { listaCintillos, agregarCintillos }
})
