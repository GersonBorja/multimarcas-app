<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter()
const enviando = ref(false)
// PARA USUARIOS ACTUALES
const username = ref('')
const pass = ref('')

const loginDirect = async() => {
    try {
        enviando.value = true
        let credenciales = {
            'username': username.value,
            'pass': pass.value
        }
        const { data } = await axios.post('https://procter.work/api/login', credenciales)
        
        if(data.status === 'OK'){
            
          localStorage.setItem('token', data.token)
          localStorage.setItem('user_uuid', data.user_uuid)
          localStorage.setItem('usuario', data.username)
          router.push('/')
        }else{
            enviando.value = false
            alert(data.message)
        }
        
    } catch (error) {
        console.log(error)
    }
}

const today = new Date()
const year = today.getFullYear()
</script>
<template>
    <div class="fixed w-full h-full bg-black/[.5] top-0 left-0 flex items-center justify-center z-50"  v-if="enviando">
    <div class="flex items-center justify-center text-white bg-[#263238] w-[90%] h-[60%] p-4 text-xl"><font-awesome-icon :icon="['fas', 'spinner']" class="mr-2 fa-pulse"/> Iniciando sesion...</div>
</div>
    <div class="relative bg-cover bg-image">
        <div class="w-full py-6 overlay banner">
            <h1 class="p-4 text-xl font-medium text-center text-white uppercase">cintillos en tiempo record.</h1>
            <p class="p-4 pt-0 text-sm text-center text-white">
                ¡Revolutiona tu supermercado! Genera etiquetas de precio y rótulos de oferta de forma automática y en minutos. Eficiencia y rapidez al alcance de un clic.
            </p>
        </div>
    </div>
    <h2 class="p-4 font-medium text-gray-800">INICIAR SESION</h2>
    <form class="p-4 border-t border-solid border-[#ddd]" @submit.prevent="loginDirect">
            <label class="block mb-2 text-xs font-bold tracking-wide text-black uppercase" for="grid-last-name" id="login">
                USUARIO:
            </label>
            <input class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="INGRESA UN USUARIO" autocomplete="off" v-model="username" required>

            <label class="block mt-4 mb-2 text-xs font-bold tracking-wide text-black uppercase" for="grid-last-name">
          CONTRASEÑA:
        </label>
        <input class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="INGRESA UNA CONTRASEÑA" autocomplete="off" v-model="pass" required>
        <input type="submit"
            class="block mt-6 w-full px-4 py-2 text-sm font-medium rounded text-white bg-[#2E3239] hover:bg-[#37474F] border border-solid border-[#303E46] shadow-lg" value="ENTRAR">
    </form>
    <footer class="p-4 border-t border-solid border-[#ddd]">
        Multimarcas app || {{  year }}
    </footer>
</template>

<style>
.bg-image {
    background-image: url('../../public/banner.jpeg');
}

.banner {
    background: rgb(38,38,38);
    background: linear-gradient(rgba(38,38,38,0.8) 10%, rgba(38,38,38, 1) 80%);
}
</style>
