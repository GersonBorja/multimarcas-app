<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter()
  const correo = ref('')
  const destino = ref('')
  const enviando = ref(false)
  const usuario = ref(localStorage.getItem('usuario'))
  const token = ref(localStorage.getItem('token'))

  function uuidNumerico() {
  return Math.floor(Math.random() * 1000000000);
}

const enviar = async() => {
    try {
        if(correo.value === '' || destino.value === ''){
            alert('COMPLETA TODOS LOS CAMPOS')
        }else{
            enviando.value = true
            const datos = {
                "receptor": correo.value,
                "nombreReceptor": destino.value,
                "asuntoEmisor": `CINTILLOS DE ${usuario.value.toUpperCase()} #${uuidNumerico()}`
            }
            const headers = {
                'Authorization': 'Bearer ' + token.value,
                'Content-Type': 'application/json'
            }
            const { data } = await axios.post(`https://procter.work/api/generar/cintillos`, datos, { headers })
            console.log(data)
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
    <div class="bg-white">
      
      <h1 class="flex items-center justify-between p-4 text-base font-medium text-gray-800"><router-link to="/descargas"><font-awesome-icon :icon="['fas', 'chevron-left']" /> VOLVER</router-link> <span><font-awesome-icon :icon="['fas', 'at']" /> ENVIAR POR CORREO</span></h1>
<form class="p-4 pt-0" @submit.prevent="enviar">
        <div class="w-full pt-0">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-password">
            ESCRIBE EL CORREO:
          </label>
          <input
            class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder="example@example.com" autocomplete="off" v-model="correo" required>
          <p class="text-xs font-light text-gray-600"><font-awesome-icon :icon="['fas', 'info-circle']" /> 
            Ingresa el correo a donnde quieres enviar los cintillos</p>
        </div>

        <div class="w-full my-4">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-password">
            NOMBRE DEL DESTINATARIO:
          </label>
          <input
            class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Nombre del destino" autocomplete="off" v-model="destino" required>
          <p class="text-xs font-light text-gray-600"><font-awesome-icon :icon="['fas', 'info-circle']" /> 
            Ingresa el nombre de la sala o persona a quien le enviaras los cintillos.</p>
        </div>
      <input type="submit"
        class="w-full px-4 py-2 font-bold text-white border rounded bg-[#455A64] hover:bg-[#37474F] border-[#303E46] shadow-md" value="COMPARTIR CINTILLOS">
    
</form>
<div class="fixed w-full h-full bg-black/[.5] top-0 left-0 flex items-center justify-center" v-if="enviando">
    <div class="bg-[#2E3239] text-2xl text-white w-[90%] h-[60%] p-4 flex items-center justify-center" id="textoEnvio"><font-awesome-icon :icon="['fas', 'spinner']" class="fa-pulse"/> Enviando correo..</div>
  </div>
    </div>
</template>