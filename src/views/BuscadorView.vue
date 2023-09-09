<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useBusquedasStore } from "@/stores/busquedas";
import axios from "axios";

// variables iniciales
const busqueda = ref("");
const token = ref(localStorage.getItem("token"));

// variables de estado
const useBusquedas = useBusquedasStore();
const { resultados } = storeToRefs(useBusquedas);
const { busquedasEncontradas } = useBusquedas;

const resetSearch = () => {
  busqueda.value = "";
};

const buscar = async () => {
  try {
    const { data } = await axios.get(
      `https://procter.work/api/buscador/${busqueda.value}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    busquedasEncontradas(data);
  } catch (error) {
    console.log(error);
  }
};

</script>
<template>
  <h1 class="flex items-center justify-between p-4 font-medium text-gray-800">
    <router-link to="/crear-cintillos"
      ><font-awesome-icon :icon="['fas', 'chevron-left']" /> VOLVER</router-link
    >
    <span>BUSCADOR</span>
  </h1>
  <div
    class="p-2 mt-2 text-sm border border-solid border-[#FFF59D] bg-[#FFF9C4]"
  >
    Puedes ingresar el codigo de barras del producto o buscar directamente con
    la descripcion o marca.
  </div>
  <form class="w-full p-4 bg-gray-50" @submit.prevent="buscar">
    <div
      class="flex items-center justify-between border border-solid border-[#ddd]"
    >
      <input
        type="text"
        placeholder="Ingresa tu busqueda.. "
        class="block w-full p-3 bg-white border-0 outline-none"
        v-model="busqueda"
      />
      <button
        type="reset"
        @click.prevent="resetSearch"
        v-if="busqueda.length > 0"
        class="block p-3 bg-white"
      >
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>
      <button class="block p-3 bg-white">
        <font-awesome-icon :icon="['fas', 'barcode']" />
      </button>
      <button type="submit" class="block p-3 bg-white">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </button>
    </div>
  </form>

  <div v-if="resultados.length">{{ resultados }}</div>
</template>
<style>
* {
  box-sizing: border-box;
}
</style>
