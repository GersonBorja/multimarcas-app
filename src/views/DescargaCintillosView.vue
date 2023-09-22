<script setup>
import { ref } from 'vue'
import axios from 'axios'
 import { useRouter } from 'vue-router'
import  { useCintillosCreados } from '@/stores/cintillosCreados'

const router = useRouter()
let useCantidad = useCintillosCreados()
let { resetCintillos } = useCantidad
const user = localStorage.getItem('usuario')
const token = ref(localStorage.getItem('token'))

const nombreCintillo = () => {
    const objDate = new Date()
    const objName = {
        "year": objDate.getFullYear(),
        "month": ("0" + (objDate.getMonth() + 1)).slice(-2),
        "day": ("0" + objDate.getDate()).slice(-2),
        "hour": ("0" + objDate.getHours()).slice(-2),
        "minute": ("0" + objDate.getMinutes()).slice(-2),
        "second": ("0" + objDate.getSeconds()).slice(-2)
    }
    const { year, month, day, hour, minute, second } = objName
    const filename = `CINTILLOS-${year}-${month}-${day}-${hour}${minute}${second}.xlsx`
    return filename 
}
const windowOne = ref(false)
const windowTwo = ref(false)
const modal = ref(false)
const generarDocumento = async () => {
    try {
        modal.value = true
        windowOne.value  = true
        const headers = {
        'Authorization': 'Bearer ' + token.value,
        'Content-Type': 'application/json'
}
        const { data } = await axios.post(`https://procter.work/api/generar/cintillos`, null, { headers })
          location.href = `https://procter.work/${data.path_tmp_full}`
        if(data.status === 'OK') {
          window.open('https://www.highcpmrevenuegate.com/snidd0ff?key=d5add209c5ea339d1d4e0f8df6a2e610', '_parent');
        }
        console.log(`https://procter.work/${data.path_tmp_full}`)
    }catch(error) {
        console.log(error)
    }finally{
      windowOne.value = false
      windowTwo.value = true
    }
}
const cerrarModal = () => {
    modal.value = false
    windowOne.value = false
    windowTwo.value = false
    window.open('https://www.highcpmrevenuegate.com/snidd0ff?key=d5add209c5ea339d1d4e0f8df6a2e610', '_parent');
    router.push('/')
    resetCintillos()
  }

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
    "asuntoEmisor": `CINTILLOS DE ${asunto.value.toUpperCase()} #${uuidNumerico()}`
  }
  const headers = {
        'Authorization': 'Bearer ' + token.value,
        'Content-Type': 'application/json'
}
      const { data } = await axios.post(`https://procter.work/api/generar/cintillos`, datos, { headers })
      console.log(datos)
      console.log(data)
      
          
    }
  }catch(error){
    console.log(error)
  } finally{
    let texto = document.getElementById('textoEnvio')
    texto.innerHTML = "CORREO ENVIADO"
    setTimeout(() => {
      enviando.value = false
      router.push('/')
      resetCintillos()
    }, 1000)
  }
}
const show = ref(false)
const abrirModalCorreos = () => {
  show.value = true
}
</script>

<template>
    <div class="bg-black/[.5] fixed top-0 left-0 w-full h-full z-30 flex items-center justify-center" v-if="modal">
        <div class="bg-white w-[90%] p-4" v-if="windowTwo">
          <h1 class="mb-4 text-sm font-bold text-gray-700">ARCHIVO GENERADO EXITOSAMENTE</h1>
          <p class="text-gray-700">
            <font-awesome-icon :icon="['fas', 'face-smile-beam']" />Tu documento ha sido descargado...<br>Gracias por usar nuestra aplicación, si te ha gustado compártela!!
          </p>
          <div class="flex justify-end">
            <button class="inline-flex items-center px-4 py-2 mt-2 font-medium rounded bg-emerald-400 hover:bg-emerald-400 text-emerald-900" @click="cerrarModal">Terminar</button>
          </div>
        </div>
        <div class="bg-white w-[90%] p-4" v-if="windowOne">
          <h1 class="mb-4 text-sm font-bold text-gray-700">GENERANDO DOCUMENTO</h1>
          <p class="text-gray-700">
            <font-awesome-icon :icon="['fas', 'spinner']" class="mr-2 fa-pulse"/> Espera unos segundos, estamos creando tus cintillos..
          </p>
        </div>
      </div>
      <h1 class="flex items-center justify-between p-4 pb-0 font-medium text-gray-800"><router-link to="/cintillos"><font-awesome-icon :icon="['fas', 'chevron-left']" /> VOLVER</router-link> <span>DESCARGAS</span></h1>
    <div class="p-4 border-b border-gray-400 border-dashed">
        <h1 class="pb-4 font-medium text-gray-800"><font-awesome-icon :icon="['fas', 'circle']" /> OPCION 1 (Descargar archivo)</h1>
        <p class="py-4 pt-0 text-gray-800"><font-awesome-icon :icon="['fas', 'circle-info']" /> Esta opcion guarda en tu dispositivo un archivo excel con todos los cintillos que has creado. Este lo puedes compartir posteriormente.</p>
        <div class="py-4 pt-0 text-sm font-medium text-black"><font-awesome-icon :icon="['fas', 'file-excel']" /> {{ nombreCintillo() }}</div>

          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium rounded text-white bg-[#2E3239] hover:bg-[#37474F] border border-solid border-[#303E46] shadow-lg" @click.prevent="generarDocumento"><span></span>
             <font-awesome-icon :icon="['fas', 'download']" class="mr-2" /> Descargar</a>
    </div>
    <div class="p-4 border-b border-gray-400 border-dashed">
        <h1 class="mb-4 font-medium text-gray-800"><font-awesome-icon :icon="['fas', 'circle']" /> OPCION 2 (Enviar por correo)</h1>
        <p class="py-4 pt-0 text-gray-800"><font-awesome-icon :icon="['fas', 'circle-info']" /> Con esta opcion podras enviar tus cintillos directamente al operador(computo), por el momento el envio por correo esta disponible para  <b class="font-extrabold text-black">41 SALAS</b>.</p>
        <a class="inline-flex items-center px-4 py-2 text-sm font-medium rounded text-white bg-[#2E3239] hover:bg-[#37474F] border border-solid border-[#303E46] shadow-lg" @click.prevent="abrirModalCorreos"><font-awesome-icon :icon="['fas', 'envelope']" class="mr-2" /> Enviar por correo</a>
    </div>

    <div class="p-4">
        <h1 class="mb-4 font-medium text-gray-800"><font-awesome-icon :icon="['fas', 'circle']" /> OPCION 3 (Correo personalizado)</h1>
        <p class="py-4 pt-0 text-gray-800"><font-awesome-icon :icon="['fas', 'circle-info']" /> Con esta opcion puedes mandar tus cintillos al correo que tu quieras.</p>
        <router-link to="/correo-personalizado" class="inline-flex items-center px-4 py-2 text-sm font-medium rounded text-white bg-[#2E3239] hover:bg-[#37474F] border border-solid border-[#303E46] shadow-lg"><font-awesome-icon :icon="['fas', 'envelope']" class="mr-2" /> Correo personalizado</router-link>
    </div>
    <div class="fixed top-0 left-0 z-30 w-full h-full bg-white" v-if="show">
      
        <h1 class="flex items-center justify-between p-4 font-bold text-gray-800"><router-link to="/cintillos"><font-awesome-icon :icon="['fas', 'chevron-left']" /> VOLVER</router-link> <span><font-awesome-icon :icon="['fas', 'at']" /> ENVIAR POR CORREO</span></h1>
        
        <div class="p-2 mt-2 text-sm border border-solid border-[#FFF59D] bg-[#FFF9C4]">
        Por el momento el envio de cintillos por correo a traves de la aplicacion no esta disponible para todas las salas.<br>
        Usa esta funcion solo si vas a enviar cintillos validos.
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
<div id="container-1ac063648180197409e096574f95a0cf"></div>
</template>