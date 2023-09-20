<script setup>
import { ref } from "vue";
import axios from "axios";
import PaginateCintillos from "@/components/PaginateCintillos.vue";
import { storeToRefs } from "pinia";
import { useCintillosStore } from "@/stores/cintillos";
import dayjs from "dayjs";
import "dayjs/locale/es";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("es");
dayjs.extend(relativeTime);

const useProductos = useCintillosStore();
const { listaCintillos } = storeToRefs(useProductos);
const { agregarCintillos } = useProductos;

const token = ref(localStorage.getItem("token"));
const datos = ref([]);
const total = ref(null);

const getData = async () => {
  try {
    const headers = {
      Authorization: "Bearer " + token.value,
      "Content-Type": "application/json",
    };
    let { data } = await axios.post(`https://procter.work/api/cintillo`, null, {
      headers,
    });
    agregarCintillos(data);
    total.value = data.length;
    let uniqueData = data.filter(
      (v, i, a) => a.findIndex((t) => t.descripcion === v.descripcion) === i
    );
    datos.value = uniqueData;
  } catch (error) {
    console.log(error);
  }
};
getData();

const eliminar = async (uuid) => {
  try {
    const headers = {
      Authorization: "Bearer " + token.value,
      "Content-Type": "application/json",
    };
    const info = {
      uuid: uuid
    }
    let { data } = await axios.post(
      "https://procter.work/api/cintillo/eliminar",
      info,
      {
        headers,
      }
    );
    getData();
    alert(data.message);
  } catch (error) {
    console.log(error);
  }
};

let postXpagina = 6;
const inicio = ref(0);
const fin = ref(6);

const siguiente = () => {
  inicio.value += postXpagina;
  fin.value += postXpagina;
};
const anterior = () => {
  inicio.value -= postXpagina;
  fin.value -= postXpagina;
};
</script>
<template>
  <div>
    <div class="bg-gray-100" v-if="listaCintillos.length > 0">
      <h1
        class="flex items-center justify-between p-4 font-medium text-gray-800"
      >
        <router-link to="/crear-cintillos"
          ><font-awesome-icon :icon="['fas', 'chevron-left']" />
          VOLVER</router-link
        >
        <span>GENERAR DOCUMENTO</span>
      </h1>
      <div class="flex items-center justify-between p-4 pt-0">
        <div>
          <font-awesome-icon
            :icon="['fas', 'gear']"
            class="mr-1 fa-spin"
          />Llevas {{ total }}/<span class="text-black">448</span>
        </div>
        <router-link
          :to="`/descargas`"
          class="inline-flex items-center px-4 py-2 text-sm font-medium rounded text-white bg-[#2E3239] hover:bg-[#37474F] border border-solid border-[#303E46] shadow-lg"
        >
          <font-awesome-icon :icon="['fas', 'download']" class="mr-2" />
          Descargas
        </router-link>
      </div>
    </div>

    <h1
      class="p-4 font-medium text-gray-800 border-b border-[#dddddd] border-solid"
    >
      LISTADO DE CINTILLOS
    </h1>
    <div
      class="flex items-center justify-center text-xl font-light text-gray-500 h-52"
      v-if="datos.length === 0"
    >
      <font-awesome-icon :icon="['fas', 'face-sad-cry']" /> Aun no has agregado
      datos..
    </div>
    <!-- component -->
    <div
      v-for="item in datos.slice(inicio, fin)"
      :key="item.id"
      class="border-b border-[#dddddd] border-solid"
    >
      <div class="flex items-start justify-between p-4">
        <span class="flex-[1]">{{ item.descripcion }}</span>
        <button class="text-gray-900" @click.prevent="eliminar(item.uuid)"><font-awesome-icon :icon="['fas', 'trash-can']" /></button>
      </div>
      <div class="flex p-4 pt-0">
        <router-link
          :to="`/editar/${item.uuid}`"
          v-if="item.uuid"
          class="flex items-center mr-2 text-sm font-medium text-blue-600 underline uppercase"
        >
          Editar</router-link
        >
        <div class="flex items-center mr-2 text-sm">${{ item.precio }}</div>
        <div class="flex items-center mr-2">
          <span v-if="item.cantidad < 2" class="text-sm"
            >({{ item.cantidad }} cintillo)</span
          >
          <span v-else class="text-sm">({{ item.cantidad }} cintillos)</span>
        </div>
        <div class="text-sm text-gray-500">
          {{ dayjs(item.fecha).fromNow() }}
        </div>
      </div>
    </div>
    <!-- aqui btn -->
    <PaginateCintillos
      :inicio="inicio"
      :fin="fin"
      :maxLength="datos.length"
      @siguiente="siguiente"
      @anterior="anterior"
    ></PaginateCintillos>
  </div>
  <div id="container-1ac063648180197409e096574f95a0cf"></div>
</template>
