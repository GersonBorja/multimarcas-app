<script setup>
import { ref } from 'vue';
import axios from 'axios';

const token = ref(localStorage.getItem('token'))
const user_uuid = ref(localStorage.getItem('user_uuid'))
// variables reactivas del formulario
const enviando = ref(false)
const barra = ref('')
const descripcion = ref('')
const cantidad = ref('')
const precio = ref('')
const f_inicio = ref('')
const f_fin = ref('')
const handleInput = (event) => {
    descripcion.value = formatearDescription(event.target.value)
}

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

const reestablecerFormulario = () => {
    barra.value = ''
    descripcion.value = ''
    f_inicio.value = ''
    f_fin.value = ''
    cantidad.value = ''
    precio.value = ''
  }
const agregarAfiches = async () => {
    try{
      enviando.value = true
      const dataCintillo = {
      'barra': barra.value,
      'descripcion': formatearDescription(descripcion.value),
      'precio': precio.value,
      'f_inicio': f_inicio.value,
      'f_fin': f_fin.value,
      'cantidad': cantidad.value,
      'user_uuid': user_uuid.value
    }
    
    const headers = {
        'Authorization': 'Bearer ' + token.value,
        'Content-Type': 'application/json'
}

    let { data } = await axios.post('https://procter.work/api/crear/rotulos', dataCintillo, { headers })
    alert(data.message)
    reestablecerFormulario()
    }catch(error){
      console.log(error)
    }finally{
      enviando.value = false
    }
  }
</script>
<template>
    <div>
      <h1 class="flex items-center justify-between p-4 pb-4 font-medium text-gray-900"><span>Crear Afiches</span>
        <div><router-link to="/afiches" active-class="underline">Afiches <span class="inline-flex items-center justify-center bg-[#A2B2EE] text-[#2E3239] text-xs font-medium  rounded-full no-underline w-[20px] h-[20px]">?</span></router-link></div>
      </h1>

    <div class="p-4 pt-0">
      <form class="w-full max-w-lg" @submit.prevent="agregarAfiches">
        <div class="flex flex-wrap mb-6 -mx-3">
          <div class="w-full px-3 mb-6">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-first-name">
              CODIGO DE BARRA:
            </label>
 
            <div class="flex items-stretch justify-between">
    <input
        class="flex-grow px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded-l appearance-none focus:outline-none focus:bg-white"
        id="grid-first-name" type="text" placeholder="Ej. 1234567890123" autocomplete="off" v-model="barra">
    
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
              PRECIO DEL PRODUCTO:
            </label>
            <input
              class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password" type="text" placeholder="PRECIO" autocomplete="off" v-model="precio" required>
            <p class="text-xs font-light text-gray-600"><font-awesome-icon :icon="['fas', 'info-circle']" /> Ingresá el
              precio correcto para este producto</p>
          </div>
        </div>

        <div class="flex flex-wrap mb-6 -mx-3">
          <div class="w-full px-3">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-password">
              FECHA DE INICIO:
            </label>
            <input
              class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password" type="text" placeholder="10/06/1998" autocomplete="off" v-model="f_inicio" required>
            <p class="text-xs font-light text-gray-600"><font-awesome-icon :icon="['fas', 'info-circle']" /> Ingresá la
              Ingresa una fecha de inicio veridica. usa este formato 10/06/1998</p>
          </div>
        </div>

        <div class="flex flex-wrap mb-6 -mx-3">
          <div class="w-full px-3">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-password">
              FECHA FIN:
            </label>
            <input
              class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password" type="text" placeholder="10/06/1998" autocomplete="off" v-model="f_fin" required>
            <p class="text-xs font-light text-gray-600"><font-awesome-icon :icon="['fas', 'info-circle']" /> Ingresá la
                Ingresa una fecha de inicio veridica. usa este formato 10/06/1998</p>
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
              cantidad de rotulos que necesitas para este producto</p>
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

    <div class="fixed w-full h-full bg-black/[.5] top-0 left-0 flex items-center justify-center"  v-if="enviando">
      <div class="flex items-center justify-center text-white bg-[#263238] w-[90%] h-[60%] p-4 text-xl"><font-awesome-icon :icon="['fas', 'spinner']" class="fa-pulse"/> Agregando Rotulos...</div>
    </div>
  </div>
</template>