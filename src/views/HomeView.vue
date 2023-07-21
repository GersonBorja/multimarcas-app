<script setup>
import { onMounted } from 'vue';
import { Client } from '@pusher/push-notifications-web';
import { ref } from 'vue';


// Crea el cliente de Pusher Beams
const beamsClient = new Client({
  instanceId: '90b80143-5f43-4ed9-a447-8ad08e3ca889',
});

// Inicializa Pusher Beams cuando el componente se monte
onMounted(() => {
  beamsClient.start()
    .then(() => beamsClient.addDeviceInterest('eventosapp'))
    .then(() => console.log('¡Registro y suscripción exitosos!'))
    .catch(console.error);
});

const username = ref(localStorage.getItem('usuario'))
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
    <p class="pt-2 text-xs">La posibilidad de crear hasta 256 etiquetas.</p>
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
  </template>

  <style>
  .b {
    background: rgb(38,38,38);
    background: linear-gradient(90deg, rgba(38,38,38,0.5) 0%, rgba(38,38,38,1) 100%);
  }
</style>