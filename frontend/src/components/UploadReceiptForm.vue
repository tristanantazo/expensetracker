<template>
    <div>
        <h2>Camera Preview</h2>
        <video ref="video" autoplay playsinline></video>
        <button @click="startCamera">Start Camera</button>
        <button @click="stopCamera">Stop Camera</button>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const video = ref(null)
let stream = null

const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true })
    if (video.value) {
      video.value.srcObject = stream
    }
  } catch (err) {
    console.error('Error accessing camera:', err)
    alert('Unable to access camera. Check browser permissions.')
  }
}

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
}

onUnmounted(() => {
  stopCamera()
})
</script>

<style scoped>
video {
  width: 100%;
  max-width: 600px;
  border: 1px solid #ccc;
}
</style>