<template>
  <div>
    <h1>Scan 1D/2D Code from Video Camera</h1>
    <div>
        <a class="block m-2 p-4 bg-[steelblue] text-white" @click="startScanner">Encender escanner</a>
        <a class="block m-2 p-4 bg-[steelblue] text-white" @click="resetScanner">Apagar</a>
    </div>
    <video id="video" width="300" height="200"></video>
    <label>Resultado:</label>
    <pre><code>{{ result }}</code></pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const codeReader = new BrowserMultiFormatReader();
const result = ref('');
let selectedDeviceId;

onMounted(() => {
    codeReader.listVideoInputDevices()
      .then((videoInputDevices) => {
        selectedDeviceId = videoInputDevices[videoInputDevices.length - 1].deviceId;
      })
      .catch((err) => {
        console.error(err);
      });
});

const startScanner = () => {
    codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (res, err) => {
        if (res) {
            result.value = res.text;
        } else if (err && !(err instanceof NotFoundException)) {
            result.value = err;
        }
    });
};

const resetScanner = () => {
    codeReader.reset();
    result.value = '';
};
</script>
