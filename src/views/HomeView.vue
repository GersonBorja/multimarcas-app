<script setup>
import { onMounted } from 'vue';
import { Client } from '@pusher/push-notifications-web';
import { ref } from 'vue';


// Crea el cliente de Pusher Beams
const beamsClient = new Client({
  instanceId: '90b80143-5f43-4ed9-a447-8ad08e3ca889',
});

onMounted(() => {
  // Verificar si ya está suscrito
  if (localStorage.getItem('subscribedToEventosApp') === 'true') {
    console.log('El dispositivo ya está suscrito a eventosapp. No se intentará suscribir de nuevo.');
    return;
  }
  
  beamsClient.start()
    .then(() => beamsClient.addDeviceInterest('eventosapp'))
    .then(() => {
      // Marcar el dispositivo como suscrito
      localStorage.setItem('subscribedToEventosApp', 'true');
      console.log('¡Registro y suscripción exitosos!');
    })
    .catch(console.error);
});

const username = ref(localStorage.getItem('usuario'))
const comunicado = ref(localStorage.getItem("comunicado"))
const cerrar = () => {
  comunicado.value = localStorage.setItem('comunicado', true)
}
</script>
<template>
  <div class="p-4 pb-0 m-auto">
    <h1 class="flex items-center justify-between pb-4 font-medium text-gray-900"><span><font-awesome-icon :icon="['fas', 'house']" class="mr-1" />Inicio</span>
      <div><font-awesome-icon :icon="['fas', 'user']" /> Bienvenido {{ username }}</div>
    </h1>


</div>




<div class="flex items-stretch justify-between border-b border-black border-solid">
  <div class="relative bg-black">
    <img src="../../public/market.jpg" class="w-[100px] h-[125px] object-cover">
    <div class="absolute top-0 left-0 w-full h-full b"></div>
  </div>

  <div class="relative flex-1 p-4 text-white bg-neutral-800">
    <h2>Crear Cintillos</h2>
    <p class="pt-2 text-xs">La posibilidad de crear hasta 448 etiquetas.</p>
    <router-link to="/crear-cintillos" class="absolute bottom-0 right-0 p-4">Comenzar <font-awesome-icon :icon="['fas', 'arrow-right']" /></router-link>
  </div>
</div>

<div class="flex items-stretch justify-between border-b border-black border-solid">
  <div class="relative bg-black">
    <img src="../../public/afiches.jpg" class="w-[100px] h-[125px] object-cover">
    <div class="absolute top-0 left-0 w-full h-full b"></div>
  </div>

  <div class="relative flex-1 p-4 text-white bg-neutral-800">
    <h2>Crear Rotulos</h2>
    <p class="pt-2 text-xs">La posibilidad de crear hasta 200 rotulos.</p>
    <router-link to="/crear-afiches" class="absolute bottom-0 right-0 p-4">Comenzar <font-awesome-icon :icon="['fas', 'arrow-right']" /></router-link>
  </div>
</div>

<div class="p-4 bg-green-200">
  Si deseas que el correo de tu sala sea agregado a la aplicación, puedes compartirlo a nuestro correo para que lo agregamos.<br>
  Comparte el correo y el nombre de la sala de ventas.<br>
  <a href="mailto: multimarcasapp@outlook.com?subject=COMPARTO CORREO" class="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium rounded text-white bg-[#2E3239] hover:bg-[#37474F] border border-solid border-[#303E46] shadow-lg"><font-awesome-icon :icon="['fas', 'paper-plane']" class="mr-2"/> Enviarnos mensaje</a>
  
</div>
<div class="fixed top-0 left-0 bg-white z-50 p-6 overflow-scroll h-full" v-if="comunicado === null">
  <h1 class="font-medium text-xl flex items-center justify-between">sitio web cerrado</h1><br>
 </div>
  </template>

  <style>
  .b {
    background: rgb(38,38,38);
    background: linear-gradient(90deg, rgba(38,38,38,0.5) 0%, rgba(38,38,38,1) 100%);
  }
</style>