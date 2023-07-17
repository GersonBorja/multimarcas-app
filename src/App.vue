<script setup>
import { computed, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import  { useCintillosCreados } from '@/stores/cintillosCreados'

let useCantidad = useCintillosCreados()
let { obtenerTotalCintillos } = useCantidad
let { cantidadTotal } = storeToRefs(useCantidad)
obtenerTotalCintillos()


const user_tmp = ref(localStorage.getItem('token'))
const validar = ref(false)
const validarUsuario = computed(() => {
  if(localStorage.getItem('usuario') !== null){
    return true
  }
})
</script>

<template>
  <header class="sticky top-0 flex items-center justify-between px-4 py-6 bg-[#26292B] text-[#ECF0F1]">
    <h1 class="font-bold text-[#ECF0F1]">MULTIMARCAS <span class="text-[#5F7ADB]">APP</span></h1>
      <nav v-if="user_tmp !== null">
        <router-link to="/" class="mr-2" active-class="underline">Inicio</router-link>
        <!--<router-link to="/cintillos" active-class="underline">Cintillos <span class="inline-flex items-center justify-center bg-[#A2B2EE] text-[#2E3239] text-xs font-medium  rounded-full no-underline w-[20px] h-[20px]">{{ cantidadTotal }}</span></router-link>-->
      </nav>
  </header>

  <RouterView />
</template>
