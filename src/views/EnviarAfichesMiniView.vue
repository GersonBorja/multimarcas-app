<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter()

const correos = ref([])
  const obtenerCorreos = async() => {
    try {
      const { data } = await axios.get('https://procter.work/api/correos')
      correos.value = data
    }catch(error){
      console.log(error)
    }
  }
  obtenerCorreos()
  
  const infoSala = ref('')
  const asunto = ref('')
  const enviando = ref(false)
  const token = ref(localStorage.getItem('token'))

  function uuidNumerico() {
  return Math.floor(Math.random() * 1000000000);
}

const enviar = async() => {
  try {
    if(infoSala.value === '' || asunto.value === ''){
      alert('COMPLETA TODOS LOS CAMPOS')
    }else{
      enviando.value = true
      const datos = {
    "receptor": infoSala.value.correo,
    "nombreReceptor": infoSala.value.sala,
    "asuntoEmisor": `AFICHES DE ${asunto.value.toUpperCase()} #${uuidNumerico()}`
}
const headers = {
        'Authorization': 'Bearer ' + token.value,
        'Content-Type': 'application/json'
}
      const { data } = await axios.post(`https://procter.work/api/generar/rotulos-mini`, datos, { headers })
    }
  }catch(error){
    console.log(error)
  } finally{
    let texto = document.getElementById('textoEnvio')
    texto.innerHTML = "📨 CORREO ENVIADO"
    setTimeout(() => {
      enviando.value = false
      router.push('/')
    }, 1000)
  }
}
</script>
<template>
    <div class="bg-white ">
      
      <h1 class="flex items-center justify-between p-4 font-bold text-gray-800"><router-link to="/afiches"><font-awesome-icon :icon="['fas', 'chevron-left']" /> VOLVER</router-link> <span><font-awesome-icon :icon="['fas', 'at']" /> ENVIAR POR CORREO</span></h1>
      
      <div class="p-2 mt-2 text-sm border border-solid border-[#FFF59D] bg-[#FFF9C4]">
      Por el momento el envio de afiches por correo a traves de la aplicacion no esta disponible para todas las salas.<br>
      Usa esta funcion solo si vas a enviar afiches validos.
    </div>
<div class="p-4">
<select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="infoSala">
  <option disabled value="">SELECCIONA UNA SALA</option>
<option v-for="correo in correos" :value="correo">{{ correo.sala }}</option>
</select>

<div class="flex flex-wrap mt-4 mb-6 -mx-3">
        <div class="w-full px-3">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-password">
            ESCRIBE LA MARCA DE TUS CINTILLOS: (ej. Mercosal, Unilever,, etc)
          </label>
          <input
            class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="ESCRIBE TU MARCA DE MERCADISTA" autocomplete="off" v-model="asunto" required>
          <p class="text-xs font-light text-gray-600"><font-awesome-icon :icon="['fas', 'info-circle']" /> 
            Esto servira para que el contralor encuentre tus cintillos mas facilemnte</p>
        </div>
      </div>
      <button
        class="w-full px-4 py-2 font-bold text-white border rounded bg-[#455A64] hover:bg-[#37474F] border-[#303E46] shadow-md" @click.prevent="enviar">ENVIAR A COMPUTO
    </button>
    <div class="fixed w-full h-full bg-black/[.5] top-0 left-0 flex items-center justify-center" v-if="enviando">
    <div class="bg-[#2E3239] text-2xl text-white w-[90%] h-[60%] p-4 flex items-center justify-center" id="textoEnvio"><font-awesome-icon :icon="['fas', 'spinner']" class="fa-pulse"/> Enviando correo..</div>
  </div>
</div>

    </div>
</template>