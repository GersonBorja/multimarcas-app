<script setup>
  defineProps(['inicio', 'fin', 'maxLength'])
</script>
<template>
  <div class="flex justify-end bg-gray-200">
    <button class="hover:text-gray-600 text-gray-500 font-bold py-2 px-4 didsabled:cursor-not-allowed disabled:opacity-50" @click="$emit('anterior')"
      :disabled="inicio <= 0">
      Anterior
    </button>
    <button class="hover:text-gray-600 text-gray-500 font-bold py-2 px-4 didsabled:cursor-not-allowed disabled:opacity-50" @click="$emit('siguiente')"
      :disabled="fin >= maxLength">
      Siguiente
    </button>
  </div>
  
</template>