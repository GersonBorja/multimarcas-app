<template>
  <div>
    <div>
      <button @click="startScan">Escanear</button>
    </div>

    <div>
      <video id="video" width="300" height="200" style="border: 1px solid gray"></video>
    </div>

    <label>Resultado:</label>
    <pre><code>{{ result }}</code></pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const result = ref('');

let selectedDeviceId;
const codeReader = new BrowserMultiFormatReader();

const startScan = () => {
  console.log("startScan llamado");
  
  const constraints = {
    video: {
      facingMode: "environment"
    }
  };

  codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (scanResult, err) => {
    if (scanResult) {
      console.log(scanResult);
      result.value = scanResult.text;
    }
    if (err && !(err instanceof NotFoundException)) {
      console.error(err);
      result.value = err.toString();
    }
  }, constraints);
};

onMounted(() => {
  codeReader.listVideoInputDevices()
    .then((videoInputDevices) => {
      const rearCamera = videoInputDevices.find(device => device.label.toLowerCase().includes('back'));
      selectedDeviceId = rearCamera ? rearCamera.deviceId : videoInputDevices[0].deviceId;
      console.log("Dispositivo seleccionado:", selectedDeviceId);
    })
    .catch((err) => {
      console.error(err);
    });
});

</script>

<script>
export default {
  name: 'BarcodeScanner',
};
</script>
