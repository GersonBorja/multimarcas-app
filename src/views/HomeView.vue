<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import  { useCintillosCreados } from '@/stores/cintillosCreados'
import { onMounted } from 'vue';
import { Client } from '@pusher/push-notifications-web';
import { v4 as uuidv4 } from 'uuid';

// Crea el cliente de Pusher Beams
const beamsClient = new Client({
  instanceId: '90b80143-5f43-4ed9-a447-8ad08e3ca889',
});

// Inicializa Pusher Beams cuando el componente se monte
onMounted(() => {
  beamsClient.start()
    .then(() => beamsClient.addDeviceInterest('noticias'))
    .then(() => console.log('¡Registro y suscripción exitosos!'))
    .catch(console.error);
});


let useCantidad = useCintillosCreados()
let { obtenerTotalCintillos } = useCantidad

  const usuario = ref('')
  const user = ref('')
  const usuarioCreado = ref(false)
  
  
  const crearUsuario = (user) => {
    let usuarioMayuscula = user.toUpperCase()
    localStorage.setItem('usuario', usuarioMayuscula)
    usuarioCreado.value = true
    localStorage.setItem('validar', 'true')
    usuario.value = localStorage.getItem('usuario')
    location.reload()
  }
  
  const validarUsuario = computed(() => {
    let user = localStorage.getItem('validar')
    if(user === 'true'){
      usuario.value = localStorage.getItem('usuario')
      return true
    }else{
      return false
    }
  })



function formatearDescription(description) {
    // Convierte todo a mayúsculas primero
    description = description.toUpperCase();

    // Añade un espacio antes de las unidades de medida si no existe
    description = description.replace(/(\d)(ML|G|U|L|KG|CÁPSULAS|CAPSULAS|TABLETAS|PIEZAS)/g, '$1 $2');

    // Cambia las unidades de medida a minúsculas si están precedidas por un espacio o un número
    description = description.replace(/(\s|\d)(ML|G|U|KG|CÁPSULAS|CAPSULAS|TABLETAS|PIEZAS)(?=\s|$)/g, function(match, p1, p2) {
        return p1 + p2.toLowerCase();
    });

    return description;
}
  const frmCintillo = ref(null)
  
  // variables reactivas del formulario
  const barra = ref('')
  const descripcion = ref('')
  const cantidad = ref('')
  const precio = ref('')
  const handleInput = (event) => {
    descripcion.value = formatearDescription(event.target.value)
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
  
  
</script>
<template>
  <div v-if="usuarioCreado || validarUsuario " class="max-w-md w-full m-auto">
    <div class="p-4 m-auto">
      <h1 class="text-gray-800 pb-4 font-medium flex items-center justify-between"><span><font-awesome-icon
            :icon="['fas', 'house']" class="mr-1" />Inicio</span>
        <div><font-awesome-icon :icon="['fas', 'user']" /> Bienvenido {{ usuario }}</div>
      </h1>
      
      <h2 class="text-gray-700 font-medium">Agregar Cintillos</h2>
    </div>
    <div class="p-4">
      <form class="w-full max-w-lg" @submit.prevent="agregarCintillos" ref="frmCintillo">
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
              id="grid-last-name" type="text" placeholder="DESCRIPCIÓN COMPLETA" autocomplete="off" v-model="descripcion" @input="handleInput" required>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              CANTIDAD:
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password" type="number" placeholder="CANTIDAD" autocomplete="off" v-model="cantidad" required>
            <p class="text-gray-600 text-xs font-light"><font-awesome-icon :icon="['fas', 'info-circle']" /> Ingresá la
              cantidad de cintillos que necesitas para este producto</p>
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
    <div class="fixed w-full h-full bg-black/[.5] top-0 left-0 flex items-center justify-center" v-if="enviando">
      <div class="bg-white w-[90%] p-4"><font-awesome-icon :icon="['fas', 'spinner']" class="fa-pulse"/> Agregando Cintillos...</div>
    </div>
  </div>
  <div class="p-4" v-else>
    <h1 class="font-medium text-gray-900"><font-awesome-icon :icon="['fas', 'user']" /> CREA TU CUENTA {{ user }}</h1>
    <form @submit.prevent="crearUsuario(`${user}`)">
      <div class="w-full mt-4">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
          USUARIO:
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-password" type="text" placeholder="USUARIO" autocomplete="off" v-model="user" required>
        <p class="text-gray-400 text-xs font-light"><font-awesome-icon :icon="['fas', 'info-circle']" /> Ingresá la
          El nombre de usuario no debe llevar espacios ni carácteres especiales</p>
      </div>
      <input type="submit"
        class="w-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 border border-emerald-600 rounded mt-4"
        value="CREAR CUENTA">
    </form>
  </div>
</template>