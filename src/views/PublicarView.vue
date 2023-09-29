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
      localStorage.setItem('sug', 'true')
      alert('Muchas gracias por tu comentario!')
    }catch(error){
      console.log(error)
    }
    
  }
</script>
<template>
<div class="p-4 bg-amber-100">
  ¡Queremos escuchar tus ideas! 💡 Envíanos tus sugerencias para mejorar la app y nuevas funciones que te gustaría ver.
</div>
 
  
  
  
<form class="p-4" @submit.prevent="publicar">
   <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-100 border-gray-300">
       <div class="px-4 py-2 bg-white rounded-t-lg">
           <label for="comment" class="sr-only">Tu sugerencia:</label>
           <textarea id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0  focus:ring-0 placeholder-gray-400 outline-0" placeholder="Escribe tu sugerencia..." required v-model="comentario"></textarea>
       </div>
       <div class="flex items-center justify-between px-3 py-2 border-t border-gray-300">
           <input type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" value="Enviar comentarios">
           
       </div>
   </div>
</form>
<p class="p-4 pt-0 ml-auto text-xs text-gray-500 dark:text-gray-400">Estos comentarios solo serán leidos por el administrador de la app</p>

  
</template>