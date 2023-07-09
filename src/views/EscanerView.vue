<template>
    <div>
      <video ref="video" width="300" height="200"></video>
      <button @click="stopScanning">Detener escaneo</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { BarcodeFormat, DecodeHintType, BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
  
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
  
  // Intentar con más esfuerzo
  hints.set(DecodeHintType.TRY_HARDER, true);
  
  // Suponer que la imagen es solo un código de barras
  hints.set(DecodeHintType.PURE_BARCODE, true);
  
  // Especificar posibles formatos
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  
  let codeReader = new BrowserMultiFormatReader(hints);
  
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
  