<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import  { useCintillosCreados } from '@/stores/cintillosCreados'
import { v4 as uuidv4 } from 'uuid';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

let useCantidad = useCintillosCreados()
let { cantidadTotal } = storeToRefs(useCantidad)
let { obtenerTotalCintillos } = useCantidad

  const usuario = ref(localStorage.getItem('usuario'))
  
  

  



function formatearDescription(description) {
    // Convierte todo a mayúsculas primero
    description = description.toUpperCase();

    // Añade un espacio antes de las unidades de medida si no existe
    description = description.replace(/(\d)(ML|G|U|L|KG|CÁPSULAS|CAPSULAS|TABLETAS|PIEZAS|G.)/g, '$1 $2');

    // Cambia las unidades de medida a minúsculas si están precedidas por un espacio o un número
    description = description.replace(/(\s|\d)(ML|G|U|KG|CÁPSULAS|CAPSULAS|TABLETAS|PIEZAS|G.)(?=\s|$)/g, function(match, p1, p2) {
        return p1 + p2.toLowerCase();
    });

    return description;
}
  const frmCintillo = ref(null)
  
  // variables reactivas del formulario
  const codeReader = new BrowserMultiFormatReader();
  let selectedDeviceId;
  const scan = ref(false)
  const barra = ref('')
  const descripcion = ref('')
  const cantidad = ref('')
  const precio = ref('')
  const handleInput = (event) => {
    descripcion.value = formatearDescription(event.target.value)
}

onMounted(() => {
    codeReader.listVideoInputDevices()
      .then((videoInputDevices) => {
        selectedDeviceId = videoInputDevices[videoInputDevices.length - 1].deviceId;
      })
      .catch((err) => {
        console.error(err);
      });
});

const startScanner = () => {
  scan.value = true;
    codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (res, err) => {
        if (res) {
            barra.value = res.text;
        } else if (err && !(err instanceof NotFoundException)) {
            console.log(err);
        }
    });
};

const resetScanner = () => {
    codeReader.reset();
};

  const reestablecerFormulario = () => {
    frmCintillo.value.reset()
    barra.value = ''
    descripcion.value = ''
    cantidad.value = ''
    precio.value = ''
  }
  const enviando = ref(false)
  const agregarCintillos = async () => {
    try{
      enviando.value = true
      const dataCintillo = {
      'interno': '',
      'barra': barra.value,
      'descripcion': formatearDescription(descripcion.value),
      'cantidad': cantidad.value,
      'precio': precio.value,
      'autor': usuario.value,
      'uuid': uuidv4()
    }

    const notificacionData = {
      'autor': usuario.value,
      'cantidad': cantidad.value
    }

    let { data } = await axios.post('https://procter.work/api/cintillos/crear', dataCintillo)
    if(data.status === 'OK') {
      let { msg } = await axios.post('https://procter.work/api/notificacion', notificacionData)
      console.log(msg)
    }
    obtenerTotalCintillos()
    reestablecerFormulario()
    alert(data.msg)
    }catch(error){
      console.log(error)
    }finally{
      enviando.value = false
    }
  }
  
  /* script para capturar imagenes */ 
//const scan = ref(false)
//// Definir video como una referencia reactiva
//const video = ref(null);
//const initCameraAndCaptureImage = () => {
//    scan.value = true
//    const constraints = {
//        video: {
//            width: { ideal: 1920 }, // ancho deseado
//            height: { ideal: 1080 }, // altura deseada
//            sharpness: { ideal: 1.0 },
//            focusMode: 'continuous',
//            facingMode: 'environment' // 'environment' para la cámara trasera
//        }
//    }
//    
//
//    // Acceso a la webcam
//    navigator.mediaDevices.getUserMedia(constraints)
//        .then(stream => {
//            video.value.srcObject = stream;
//            video.value.play();
//        });
//}
//
//
//
//// Function to resize the canvas to match the video dimensions
//function resizeCanvasToMatchVideo() {
//    let canvas = document.getElementById('canvas');
//
//    // Make sure the canvas has the same dimensions as the video
//    canvas.width = video.value.videoWidth
//    canvas.height = video.value.videoHeight
//}

//const proceso = ref(false)
//const scanear = async() => {
//    try {
//      proceso.value = true
//      let canvas = document.getElementById('canvas');
//      let ctx = canvas.getContext('2d')
//      
//      resizeCanvasToMatchVideo()
//      ctx.drawImage(video.value, 0, 0, video.value.videoWidth, video.value.videoHeight)
//    
//      let imgData = canvas.toDataURL('image/jpeg', 1.0);
//      const info = {
//        "image": imgData
//      }
//      const { data: postData } = await axios.post('https://procter.work/api/process-image', info)
//      if(postData.result == ""){
//        alert('No se detectaron códigos de barras, intenta que la barra no tenga reflejos ni la captura de imágen sea borrosa.')
//
//        const notificacionData = {
//      'autor': usuario.value,
//      'msg': 'fallo al escanear'
//    }
//    const { data: msgUno } = await axios.post('https://procter.work/api/notificacionScan', notificacionData)
//    console.log(msgUno)
//        cerrar()
//      }else{
//        try {
//          const { data: getData } = await axios.get(`https://procter.work/api/buscador/${postData.result}`)
//          if(getData.length === 0){
//            barra.value = postData.result
//            descripcion.value = ''
//            const notificacionData = {
//      'autor': usuario.value,
//      'msg': 'solo escaneo la barra'
//    }
//    const { data: msgDos } = await axios.post('https://procter.work/api/notificacionScan', notificacionData)
//    console.log(msgDos)
//            cerrar()
//          }else{
//            const notificacionData = {
//      'autor': usuario.value,
//      'msg': 'el escaneo fue un exito y encrotro coincidencias en la db'
//    }
//    const { data: msgTres } = await axios.post('https://procter.work/api/notificacionScan', notificacionData)
//    console.log(msgTres)
//            barra.value = postData.result
//            if(getData.length === 1) descripcion.value = formatearDescription(getData[0].descripcion)            
//            cerrar()
//          }
//          
//        }catch(err) {
//          console.log(err)
//        }
//      }
//    }catch(error){
//    console.log(error)
//  } finally{
//    proceso.value = false
//  }
//  }


//  function cerrar() {
//  if (video.value && video.value.srcObject) {
//    video.value.srcObject.getTracks().forEach(track => track.stop());
//    video.value.srcObject = null;
//  }
//  scan.value = false;
//}

const newfunction = ref(localStorage.getItem('newfunction'))

const cerrarModalFunction = () => {
  newfunction.value = localStorage.setItem('newfunction', false)
}

</script>
<template>
  <div class="w-full max-w-md m-auto">
    <div class="fixed w-full h-full bg-black/[.5] top-0 left-0 flex items-center justify-center" v-if="newfunction === null">
      <div class="bg-[#0099FF] w-[95%] p-4 text-xl"><img src="../../public/papel.png" class="block w-[100px] m-auto">
      <h2 class="py-4 font-medium text-center text-white">NUEVA FUNCION AGREGADA</h2>
      <p class="p-4 text-sm text-white">
        Hemos agregado la funcion de escanner de barras, para autocompletar las descripciones, contamos con 46 mil codigos a disposicion, si al escanear no te sale la descripcion es posible que sea un codigo asociado, recuerda que la eficiencia del escaner depende la calidad de tu camara y de que tan bien logres escanear el producto, procura que la barra sea visible, sin reflejos y este en una buena luz.
      </p>
      <button @click.prevent="cerrarModalFunction" class="bg-white text-[#0099ff] block py-2 text-[15px] w-[90%] m-auto text-center shadow-lg rounded-md">Continuar</button>
    </div>
    </div>
    
    
    
    <div class="p-4 m-auto">
      <h1 class="flex items-center justify-between pb-4 font-medium text-gray-900"><span>Agregar Cintillos</span>
        <div><router-link to="/cintillos" active-class="underline">Cintillos <span class="inline-flex items-center justify-center bg-[#A2B2EE] text-[#2E3239] text-xs font-medium  rounded-full no-underline w-[20px] h-[20px]">{{ cantidadTotal }}</span></router-link></div>
      </h1>
      
      <div class="p-2 mt-2 text-sm border border-solid border-[#FFF59D] bg-[#FFF9C4]">
        Recuerda que solo puedes sacar 252 cintillos (9paginas) por vez.
      </div>
    </div>
    <div class="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50" v-if="scan">
  <div class="relative flex items-center justify-center p-4 bg-white">
    <video id="video" width="300" height="200"></video>
  </div>
</div>


    <div class="p-4 pt-0">
      <form class="w-full max-w-lg" @submit.prevent="agregarCintillos" ref="frmCintillo">
        <div class="flex flex-wrap mb-6 -mx-3">
          <div class="w-full px-3 mb-6">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-first-name">
              CODIGO DE BARRA:
            </label>
 
            <div class="flex items-stretch justify-between">
    <input
        class="flex-grow px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded-l appearance-none focus:outline-none focus:bg-white"
        id="grid-first-name" type="text" placeholder="Ej. 1234567890123" autocomplete="off" v-model="barra">
    <a class="flex items-center justify-center px-4 mb-3 leading-tight text-gray-700 bg-gray-300 border rounded-r" @click.prevent="startScanner">
        <img src="../../public/barcode.png" class="w-[25px] inline-block">
    </a>
</div>


              <p class="text-xs font-light text-gray-600"><font-awesome-icon :icon="['fas', 'info-circle']" />El código de barra es opcional</p>
          </div>
          <div class="w-full px-3 ">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-last-name">
              DESCRIPCIÓN DEL PRODUCTO:
            </label>
            <input
              class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name" type="text" placeholder="DESCRIPCIÓN COMPLETA" autocomplete="off" v-model="descripcion" @input="handleInput" required>
          </div>
        </div>
        <div class="flex flex-wrap mb-6 -mx-3">
          <div class="w-full px-3">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-password">
              CANTIDAD:
            </label>
            <input
              class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password" type="number" placeholder="CANTIDAD" autocomplete="off" v-model="cantidad" required>
            <p class="text-xs font-light text-gray-600"><font-awesome-icon :icon="['fas', 'info-circle']" /> Ingresá la
              cantidad de cintillos que necesitas para este producto</p>
          </div>
        </div>
        <div class="flex flex-wrap mb-6 -mx-3">
          <div class="w-full px-3">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-password">
              PRECIO DEL PRODUCTO:
            </label>
            <input
              class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password" type="text" placeholder="PRECIO" autocomplete="off" v-model="precio" required>
            <p class="text-xs font-light text-gray-600"><font-awesome-icon :icon="['fas', 'info-circle']" /> Ingresá el
              precio correcto para este producto</p>
          </div>
        </div>
        
        <input type="submit"
          class="w-full px-4 py-2 font-bold text-white border rounded bg-[#2E3239] hover:bg-[#37474F] border-[#303E46] shadow-md"
          value="AGREGAR CINTILLO">
      </form>
    </div>
    <div class="fixed w-full h-full bg-black/[.5] top-0 left-0 flex items-center justify-center"  v-if="enviando">
      <div class="flex items-center justify-center text-white bg-[#263238] w-[90%] h-[60%] p-4 text-xl"><font-awesome-icon :icon="['fas', 'spinner']" class="fa-pulse"/> Agregando Cintillos...</div>
    </div>
  </div>
  
</template>
<style>

.video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 133.33%; /* Para un aspect ratio de 3:4, 4/3 = 1.3333 */
    overflow: hidden;
}

.responsive-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.responsive-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

</style>
