<template>
    <div class="px-5 text-black">
        <video class="rounded-2xl h-100 my-3" ref="video" autoplay playsinline></video>
        
        <div class="text-center">
            <button class="bg-gray-500" @click="takePhoto">
              <Camera class="" size="20" />
            </button>
        </div>
        <canvas ref="canvas" style="display: none;"></canvas>
        <p class="text-gray-700 text-center my-5 py-3">
          Please review the store, date, and amount details above, then click the save button to record this expense.
        </p>
    </div>
</template>

<script setup>
import {GoogleGenAI} from '@google/genai';
import { ref, onUnmounted, onMounted } from 'vue'
import { useExpenseStore } from '../store/ExpenseStore';
import { Camera } from 'lucide-vue-next';

const expenseStore = useExpenseStore()
const props = defineProps(['changePage'])
const video = ref(null)
const canvas = ref(null)
const photo = ref(null)
let stream = null

const ai = new GoogleGenAI({apiKey: import.meta.env.GEMINI_API_KEY});

const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ 
        // video: { facingMode: "user" },
        video: { facingMode: { exact: "environment" } },
     })
    if (video.value) {
      video.value.srcObject = stream
    }
  } catch (err) {
    console.error('Error accessing camera:', err)
    alert('Unable to access camera. Check browser permissions.')
  }
}

const takePhoto = async () => {
  if (!video.value || !canvas.value) return

  const width = video.value.videoWidth
  const height = video.value.videoHeight

  canvas.value.width = width
  canvas.value.height = height
  const context = canvas.value.getContext('2d')
  context.drawImage(video.value, 0, 0, width, height)
  photo.value = canvas.value.toDataURL('image/png') // base64 image

  const base64Data = photo.value.split(",")[1];

    const contents = [
        {
          inlineData: {
              mimeType: "image/png",
              data: base64Data,
          },
        },
        { text: "Store,amount,date,payment type all json return json only" },
    ];

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-lite',
        contents: contents,
    });

    let res = JSON.parse(response.text.replace(/```json|```/g, '').trim());
    res.date = getTodayPH()
    await expenseStore.createExpenseTransaction(res)

    props.changePage('all_expenses');
}

function getTodayPH() {
  const now = new Date()
  const offset = 8 * 60 * 60 * 1000
  const phDate = new Date(now.getTime() + offset)
  return phDate.toISOString().slice(0, 10)
}


const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
}

onMounted(async () => {
  startCamera();
})

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