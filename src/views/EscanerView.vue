<template>
    <div>
      <video ref="video" width="300" height="200"></video>
      <button @click="stopScanning">Detener escaneo</button>
    </div>
  </template>
  
  <script>
  import { BrowserMultiFormatReader } from '@zxing/library';
  
  export default {
    data() {
      return {
        video: null,
        codeReader: new BrowserMultiFormatReader(),
        scanning: false,
      };
    },
    mounted() {
      this.video = this.$refs.video;
      this.startScanning();
    },
    beforeUnmount() {
      this.stopScanning();
    },
    methods: {
      startScanning() {
        this.scanning = true;
        this.codeReader
          .decodeFromVideoDevice(undefined, this.video, (result, err) => {
            if (result) {
              console.log('Resultado obtenido: ', result.getText());
              // Detener el escaneo después de obtener el resultado
              this.stopScanning();
            }
            if (err && !(err instanceof NotFoundException)) {
              console.error(err);
              // Detener el escaneo si se produce un error
              this.stopScanning();
            }
          })
          .catch(err => console.error(err));
      },
      stopScanning() {
        this.codeReader.reset();
        this.scanning = false;
      },
    },
  };
  </script>
  