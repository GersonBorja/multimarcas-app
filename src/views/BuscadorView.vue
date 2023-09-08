<script setup>
</script>
<template>
    <h1 class="flex items-center justify-between p-4 font-medium text-gray-800"><router-link to="/crear-cintillos"><font-awesome-icon :icon="['fas', 'chevron-left']" /> VOLVER</router-link> <span>BUSCADOR</span></h1>
    <div class="p-2 mt-2 text-sm border border-solid border-[#FFF59D] bg-[#FFF9C4]">
        Puedes ingresar el codigo de barras del producto o buscar directamente con la descripcion o marca.
      </div>
      <form>
       <div class="flex items-center justify-between">
        <input type="text" placeholder="🔍 Ingresa tu busqueda.. ">
       <button><font-awesome-icon :icon="['fas', 'xmark']" /></button>
       <button><font-awesome-icon :icon="['fas', 'barcode']" /></button>
        <button type="submit"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
       </div> 
      </form>
</template>
