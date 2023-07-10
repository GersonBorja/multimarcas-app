<template>
    <div class="z-40 flex flex-col items-center justify-center fullscreen">
      <video ref="video" class="w-full h-full"></video>
      <button @click="stopScanning" class="mt-4">Detener escan!</button>
    </div>
  </template>
  
 <script setup>
 import 'core-js';
 import 'webrtc-adapter';
 
import { ref, onMounted, onUnmounted } from 'vue';
import { BarcodeFormat, BrowserMultiFormatReader, NotFoundException } from '@zxing/library';


const video = ref(null);
let scanning = ref(false);

// Especifica los formatos de códigos de barras que deseas soportar
const formats = [
  BarcodeFormat.CODE_128,
  BarcodeFormat.CODE_39,
  BarcodeFormat.EAN_13,
  BarcodeFormat.EAN_8,
  BarcodeFormat.UPC_A,
  BarcodeFormat.UPC_E
];

let codeReader = new BrowserMultiFormatReader(null, formats);

const constraints = {
  video: {
    width: { ideal: 1920 }, // ancho desead
    height: { ideal: 1080 },
    frameRate: { ideal: 60 },
    sharpness: { ideal: 1.0 },
    focusMode: 'continuous',
    facingMode: 'environment' // 'environment' para la cámara trasera
  }
};

onMounted(() => {
  startScanning();
});

onUnmounted(() => {
  stopScanning();
});

const startScanning = () => {
  scanning.value = true;
  codeReader
    .decodeFromVideoDevice(undefined, video.value, (result, err) => {
      if (result) {
        alert('Resultado obtenido: ' + result.getText());
        // Detener el escaneo después de obtener el resultado
        //stopScanning();
      }
      if (err && !(err instanceof NotFoundException)) {
        console.error(err);
        // Detener el escaneo si se produce un error
        stopScanning();
      }
    }, constraints)
    .catch(err => alert(err));
};

const stopScanning = () => {
  codeReader.reset();
  scanning.value = false;
};
</script>
