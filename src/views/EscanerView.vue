<script setup>
import 'core-js';
 import 'webrtc-adapter';
import { ref, onMounted } from 'vue';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

let selectedDeviceId = null;
const codeReader = new BrowserMultiFormatReader();
const videoRef = ref(null);
const result = ref('');

const startDecoding = () => {
  codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.value, (decodedResult, err) => {
    if (decodedResult) {
      console.log(decodedResult);
      result.value = decodedResult.text;
    }
    if (err && !(err instanceof NotFoundException)) {
      console.error(err);
      result.value = err;
    }
  });
  console.log(`Started continuous decoding from camera with id ${selectedDeviceId}`);
};

const resetDecoding = () => {
  codeReader.reset();
  result.value = '';
  console.log('Reset.');
};

onMounted(async () => {
  try {
    const videoInputDevices = await codeReader.listVideoInputDevices();

    // Try to select the default back camera
    const backCamera = videoInputDevices.find(
      (device) =>
        device.label.toLowerCase().includes('back') ||
        device.label.toLowerCase().includes('environment')
    );
    selectedDeviceId = backCamera ? backCamera.deviceId : videoInputDevices[1].deviceId;
  } catch (error) {
    console.error(error);
  }
});
</script>


<template>
  <div>
    <button @click="startDecoding">Start</button>
    <button @click="resetDecoding">Reset</button>

    <video ref="video" width="400" height="300" style="border: 1px solid gray"></video>

    <label>Result:</label>
    <pre><code>{{ result }}</code></pre>
  </div>
</template>