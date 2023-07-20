<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import axios from 'axios'

const router = useRouter()
const enviando = ref(false)

// PARA USUARIOS DE LA BETA
const user_tmp = ref(localStorage.getItem('usuario'))
const clave = ref('')

// PARA USUARIOS ACTUALES
const username = ref('')
const pass = ref('')

const loginDirect = async() => {
    try {
        let credenciales;
        if(localStorage.getItem('usuario') === null){
            credenciales = {
                'username': username.value,
                'pass': pass.value
            }
        }else {
            credenciales = {
                'username': user_tmp.value,
                'pass': clave.value
            }
        }
        
        const { data } = await axios.post('https://procter.work/api/login', credenciales)
        
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_uuid', data.user_uuid)

        if(localStorage.getItem('usuario') === null){
            localStorage.setItem('usuario', data.username)
        }
        
    } catch (error) {
        console.log(error)
    } finally {
        router.push('/')
        enviando.value = fa-pulse
    }
}

const registerWithPass = async () => {
    try {
        enviando.value = true
        
        let credenciales;
        if(localStorage.getItem('usuario') === null){
            credenciales = {
                'username': username.value,
                'pass': pass.value
            }
        }else {
            credenciales = {
                'username': user_tmp.value,
                'pass': clave.value
            }
        }
        const { data } = await axios.post('https://procter.work/api/register', credenciales)
        if(data.status === 'OK'){
            loginDirect()
        }else{
        alert(data.message)
        }
    } catch (error) {
        console.log(error)
    } finally {
        enviando.value = false
    }
}
</script>
<template>

<div class="fixed w-full h-full bg-black/[.5] top-0 left-0 flex items-center justify-center"  v-if="enviando">
    <div class="flex items-center justify-center text-white bg-[#263238] w-[90%] h-[60%] p-4 text-xl"><font-awesome-icon :icon="['fas', 'spinner']" class="fa-pulse"/> Cargando...</div>
</div>
<div v-if="user_tmp !== null">
    <div>
        <h1 class="p-4 text-xl font-medium">Estimado {{ user_tmp.toLocaleLowerCase() }}</h1>
        <p class="p-4 text-sm bg-[#b8e994] rounded-md">Nos complace anunciar que nuestra aplicación ahora permite <b class="font-medium">crear rotulos</b> de oferta. Además, debido al registro masivo de nuevos usuarios, hemos actualizado nuestros mecanismos de acceso, por lo que ahora se requiere una contraseña segura para utilizar nuestros servicios. Su seguridad es nuestra prioridad.</p>
    </div>
    
    <div class="p-4">
        <label class="block mb-2 text-xs font-bold tracking-wide text-black uppercase" for="grid-last-name">
          CREA UNA CONTRASEÑA:
    </label>
    <input class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="INGRESA UNA CONTRASEÑA" autocomplete="off" v-model="clave" required>

    <p class="pt-2 text-xs font-light text-gray-400"><font-awesome-icon :icon="['fas', 'info-circle']" /> No debes olvidar esta contraseña.</p>
    <input type="submit"
        class="w-full px-4 py-2 mt-4 font-bold text-white border rounded bg-[#455A64] hover:bg-[#37474F] border-[#303E46] shadow-md" @click="registerWithPass"
        value="GUARDAR">
    </div>
</div>
<div v-else>
    <div>
        <p class="p-4 text-sm bg-[#b8e994] rounded-md">
            Para el uso de nuestros servicios debes crear una cuenta.
        </p>

        <div class="p-4">
            <label class="block mb-2 text-xs font-bold tracking-wide text-black uppercase" for="grid-last-name">
                NOMBRE DE USUARIO:
            </label>
            <input class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="INGRESA UN USUARIO" autocomplete="off" v-model="username" required>
        
            <p class="pt-2 mb-4 text-xs font-light text-gray-400"><font-awesome-icon :icon="['fas', 'info-circle']" /> Usa un nombre adecuado.</p>

            <label class="block mb-2 text-xs font-bold tracking-wide text-black uppercase" for="grid-last-name">
          CREA UNA CONTRASEÑA:
        </label>
        <input class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="INGRESA UNA CONTRASEÑA" autocomplete="off" v-model="pass" required>
        <p class="pt-2 text-xs font-light text-gray-400"><font-awesome-icon :icon="['fas', 'info-circle']" /> No debes olvidar esta contraseña.</p>
            <input type="submit"
            class="w-full px-4 py-2 mt-4 font-bold text-white border rounded bg-[#455A64] hover:bg-[#37474F] border-[#303E46] shadow-md" @click="registerWithPass"
            value="CREAR CUENTA">
        </div>
    </div>
</div>


</template>