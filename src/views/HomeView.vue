<script setup>
import { onMounted } from "vue";
import { Client } from "@pusher/push-notifications-web";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const token = ref(localStorage.getItem("token"));

const validarUsuario = async () => {
  try {
    const headers = {
      Authorization: "Bearer " + token.value,
      "Content-Type": "application/json",
    };

    const { data } = await axios.get(
      "https://procter.work/api/validar-usuario",
      { headers }
    );
    if (data.length == 0) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_uuid");
      localStorage.removeItem("usuario");
      router.push("/login");
    }
  } catch (error) {
    console.log(error);
  }
};
validarUsuario();
// Crea el cliente de Pusher Beams
const beamsClient = new Client({
  instanceId: "90b80143-5f43-4ed9-a447-8ad08e3ca889",
});


onMounted(() => {
  // Verificar si ya está suscrito
  if (localStorage.getItem("subscribedToEventosApp") === "true") {
    console.log(
      "El dispositivo ya está suscrito a eventosapp. No se intentará suscribir de nuevo."
    );
    return;
  }

  beamsClient
    .start()
    .then(() => beamsClient.addDeviceInterest("eventosapp"))
    .then(() => {
      // Marcar el dispositivo como suscrito
      localStorage.setItem("subscribedToEventosApp", "true");
      console.log("¡Registro y suscripción exitosos!");
    })
    .catch(console.error);
});

</script>
<template>
<div>
  <h1
      class="flex items-center justify-between col-span-1 p-4 pb-4 font-medium text-gray-900"
    >
      EVENTOS 
       <font-awesome-icon :icon="['fas', 'earth-americas']" />
    </h1>
    <p class="px-4 text-gray-800 text-sm">Hemos agregado publicidad a la aplicación para que siga siendo gratuita para todos, y darle soporte a los servidores.</p>
</div>
  <div class="grid grid-cols-1 sm:grid-cols-2">
    <div
      class="flex items-stretch justify-between border-b border-black border-solid"
    >
      <div class="relative bg-black">
        <img
          src="../../public/market.jpg"
          class="w-[100px] h-[125px] object-cover"
        />
        <div class="absolute top-0 left-0 w-full h-full b"></div>
      </div>

      <div class="relative flex-1 p-4 text-white bg-neutral-800">
        <h2>Crear Cintillos</h2>
        <p class="pt-2 text-xs">La posibilidad de crear hasta 448 etiquetas.</p>
        <a href="crear-cintillos"
          class="absolute bottom-0 right-0 p-4"
          
        >
          Comenzar <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </a>
      </div>
    </div>

    <div
      class="flex items-stretch justify-between border-b border-black border-solid"
    >
      <div class="relative bg-black">
        <img
          src="../../public/afiches.jpg"
          class="w-[100px] h-[125px] object-cover"
        />
        <div class="absolute top-0 left-0 w-full h-full b"></div>
      </div>

      <div class="relative flex-1 p-4 text-white bg-neutral-800">
        <h2>Crear Rotulos</h2>
        <p class="pt-2 text-xs">La posibilidad de crear hasta 200 rotulos.</p>
        <a href="/afiches-seleccion"
          class="absolute bottom-0 right-0 p-4"
          >Comenzar <font-awesome-icon :icon="['fas', 'arrow-right']"
        /></a>
      </div>
    </div>

    <div
      class="flex items-stretch justify-between border-b border-black border-solid"
    >
      <div class="relative bg-black">
        <img
          src="../../public/buscador.jpg"
          class="w-[100px] h-[125px] object-cover"
        />
        <div class="absolute top-0 left-0 w-full h-full b"></div>
      </div>

      <div class="relative flex-1 p-4 text-white bg-neutral-800">
        <h2>Buscar Internos</h2>
        <p class="pt-2 text-xs">
          Escanea o digita la descripcion, ideal para sacar el correlativo.
        </p>
        <a href="/buscador" class="absolute bottom-0 right-0 p-4"
          >Comenzar <font-awesome-icon :icon="['fas', 'arrow-right']"
        /></a>
      </div>
    </div>
  </div>

    <div id="container-1ac063648180197409e096574f95a0cf"></div>
  <div class="p-4 bg-green-200">
    Si deseas que el correo de tu sala sea agregado a la aplicación, puedes
    compartirlo a nuestro correo para que lo agregamos.<br />
    Comparte el correo y el nombre de la sala de ventas.<br />
    <a
      href="mailto: multimarcasapp@outlook.com?subject=COMPARTO CORREO"
      class="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium rounded text-white bg-[#2E3239] hover:bg-[#37474F] border border-solid border-[#303E46] shadow-lg"
      ><font-awesome-icon :icon="['fas', 'paper-plane']" class="mr-2" />
      Enviarnos mensaje</a
    >
  </div>
</template>

<style>
.b {
  background: rgb(38, 38, 38);
  background: linear-gradient(
    90deg,
    rgba(38, 38, 38, 0.5) 0%,
    rgba(38, 38, 38, 1) 100%
  );
}
</style>
