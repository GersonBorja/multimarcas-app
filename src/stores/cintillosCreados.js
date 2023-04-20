import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCintillosCreados = defineStore('cantidadTotal', () => {
  const cantidadTotal = ref('')
  
  const obtenerTotalCintillos = async () => {
    try {
      let { data } = await axios.get(`https://procter.work/api/cintillos/cantidad/${localStorage.getItem('usuario')}`)
      cantidadTotal.value = data.cantidadCintillos
    }catch(error) {
      console.log(error)
    }
  }
  
  return {
    cantidadTotal,
    obtenerTotalCintillos
  }
})
