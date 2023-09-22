<script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  const token = ref(localStorage.getItem('token'))
  const comentario = ref('')
  
  const publicar = async () => {
    try {
      const headers = {
        'Authorization': 'Bearer ' + token.value,
        'Content-Type': 'application/json'
      }
      const param = {
        message: comentario.value
      }
      const { data } = axios.post('https://procter.work/api/post/publicar', param, headers)
      alert(data.message)
    }catch(error){
      console.log(error)
    }
    
  }
</script>
<template>
  <form @submit.prevent="publicar">
    <input type="text" placeholder="Escribe tu comentario " v-modal="comentario">
    <input type="submit" value="Comentar">
    
  </form>
</template>