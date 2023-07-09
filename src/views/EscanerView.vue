<template>
    <div>
      <video ref="video" width="300" height="200"></video>
      <button @click="stopScanning">Detener escaneo</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType, NotFoundException } from '@zxing/library';
  
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
  
  let hints = new Map();
  hints.set(DecodeHintType.TRY_HARDER, true);
  
  let codeReader = new BrowserMultiFormatReader(null, formats);
  codeReader.setHints(hints);
  
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
          console.log('Resultado obtenido: ', result.getText());
          // Detener el escaneo después de obtener el resultado
          stopScanning();
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
          // Detener el escaneo si se produce un error
          stopScanning();
        }
      })
      .catch(err => console.error(err));
  };
  
  const stopScanning = () => {
    codeReader.reset();
    scanning.value = false;
  };
  </script>
  