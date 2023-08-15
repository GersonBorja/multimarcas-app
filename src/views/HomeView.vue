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
  <h1 class="font-medium text-xl flex items-center justify-between">COMUNICADO IMPORTANTE <button @click.prevent="cerrar"><font-awesome-icon :icon="['fas', 'xmark']" class="text-xl"/></button></h1><br>
  Estimados usuarios de Multimarcas App,<br><br>
Soy Gerson Borja, un joven programador de 25 años creador de esta aplicación. Quiero comunicarles sobre la situación actual de nuestra aplicación en relación con problemas de privacidad y fuga de información asociados a la empresa Callejas.<br><br>
Es importante aclarar que la preocupación no proviene de nuestra aplicación, sino de la empresa Callejas. El motivo es la posibilidad de que nuestra aplicación pueda ser utilizada de manera indebida y que la información de precios pueda llegar a manos de competidores como Walmart u otras cadenas de supermercados.<br><br>
Sin embargo, quiero enfatizar que Multimarcas App es creada y gestionada únicamente por mí. Tanto el desarrollo del backend como del frontend está a mi cargo. Nadie más tiene acceso a la base de datos ni a las direcciones de correo electrónico. Esta información no es pública en la aplicación y solo puede ser enviada a través de ella de manera segura. El escáner de códigos de barras es una función común y no implica riesgos adicionales.<br><br>
Mi intención es mantener la aplicación en funcionamiento sin interrupciones, a menos que sea absolutamente necesario para proteger mi posición laboral y la integridad de los usuarios. Hago un llamado a las entidades y jefes pertinentes en esta área para que analicen minuciosamente el funcionamiento y la seguridad de nuestra aplicación. En caso de hacer caso omiso a las autoridades pertinentes, quiero dejar en claro que este comunicado servirá como advertencia.<br><br>
Si comparten la preocupación por la fuga de información, les animo a enviarnos un correo electrónico. Estaríamos dispuestos a considerar y discutir cualquier término y condición que propongan para asegurar la continuidad del proyecto.<br><br>
Es importante resaltar que Multimarcas App está siendo 100% financiada con mi dinero personal. Esta aplicación ha sido diseñada como una plataforma cerrada y segura, sin intenciones de compartir información de manera indebida.<br><br>
Es posible que en el futuro se nos impongan términos y condiciones para continuar con este proyecto que, hasta ahora, ha sido desarrollado sin fines de lucro. La aplicación seguirá siendo gratuita, pero es importante informarles que este proyecto es un pasatiempo personal y seguirá siéndolo hasta que no represente una carga financiera insostenible para mí.<br><br>
Agradezco profundamente el apoyo que nos han brindado hasta ahora, ya que hemos recibido más de 111.000 cintillos en menos de un mes. Esto demuestra el apoyo y alcance de nuestra aplicación, que no sería posible con el trabajo actual de los operadores. Además, es importante mencionar que nuestra aplicación puede contribuir significativamente a mantener los estándares de etiquetado, tanto para las auditorías internas de Grupo Calleja como para las auditorías de Defensoría del Consumidor.<br><br>
En un último recurso, quiero manifestar que, si las autoridades pertinentes hacen caso omiso a este comunicado, me veré en la necesidad de hacer público el código fuente de mi proyecto y la base de datos, permitiendo que cualquier persona pueda replicar mi aplicación y contribuir a la transparencia en este campo.<br><br>
Estoy comprometido a hacer todo lo posible para mantener la seguridad y eficacia de la aplicación, y espero que juntos podamos superar este desafío y mantener nuestro servicio en beneficio de todos.<br><br>
Atentamente,<br>
Gerson Borja.
</div>
  </template>

  <style>
  .b {
    background: rgb(38,38,38);
    background: linear-gradient(90deg, rgba(38,38,38,0.5) 0%, rgba(38,38,38,1) 100%);
  }
</style>