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
      const { data } = await axios.post('https://procter.work/api/post/publicar', param, { headers })
      alert(data.message)
    }catch(error){
      console.log(error)
    }
    
  }

const loadAd = () => {
  const scriptElement = document.querySelector('[src="//ophoacit.com/1?z=6366295"]');

  // Evita agregar el script si ya está en el DOM.
  if (!scriptElement) {
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//ophoacit.com/1?z=6366295';

    // Cuando el script se haya cargado y ejecutado, se puede eliminar
    script.onload = () => {
      setTimeout(() => {
        document.body.removeChild(script);
      }, 5000); // Aquí estoy suponiendo que después de 5 segundos se elimina el script. Ajusta según tus necesidades.
    };

    document.body.appendChild(script);
  }
};

</script>
<template>
  <form @submit.prevent="publicar">
    <input type="text" placeholder="Escribe tu comentario " v-model="comentario">
    <input type="submit" value="Comentar">
    
  </form>
  
  <button @click="loadAd">Mostrar anuncio</button>
</template>