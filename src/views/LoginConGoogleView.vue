<script setup>
import { ref } from "vue";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
provider.addScope('email');
const foto = ref("");
const nombre = ref('')
const email = ref('')
const firebaseConfig = {
  apiKey: "AIzaSyB0z01S4THMA_8x6jKtV1OodLHXs0J9kZ8",
  authDomain: "multimarcasapp-2fa97.firebaseapp.com",
  projectId: "multimarcasapp-2fa97",
  storageBucket: "multimarcasapp-2fa97.appspot.com",
  messagingSenderId: "732835844626",
  appId: "1:732835844626:web:d5fd4d29dd760b66bd7ecb",
  measurementId: "G-0SQH2EVZX3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

const login = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      foto.value = user.photoURL;
      nombre.value = user.displayName
      email.value = user.providerData[0].email
      console.log(user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
</script>

<template>
  <div v-if="foto" class="flex items-center">
    <img :src="foto" />
  <h3>{{ nombre }}</h3>
  {{ email }}
  </div>

  <button
    class="flex gap-2 px-4 py-2 m-4 transition duration-150 border rounded-lg border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow" @click.prevent="login">
    <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo">
    <span>Iniciar sesion con Google</span>
</button>
</template>
