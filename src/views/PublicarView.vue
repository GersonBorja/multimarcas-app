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



const adLoaded = ref(false);

const loadAd = () => {
  adLoaded.value = true
  const scriptElement = document.querySelector('[src="//ophoacit.com/1?z=6366295"]');

  // Evita agregar el script si ya está en el DOM.
  if (!scriptElement) {
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//ophoacit.com/1?z=6366295';

    script.onload = () => {
      adLoaded.value = false;

      // Aquí puedes llamar a cualquier otra función o lógica adicional si lo necesitas.
      
      setTimeout(() => {
        document.body.removeChild(script);
      }, 5000); 
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
  <div v-if="adLoaded">Un momento antes de enviar tu correo te mostraremos un anuncio.. una vez se muestre solo cierra la ventana y listo</div>
</template>