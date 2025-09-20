<template>
  <div class="px-5 text-black">
    <div class="result-wrapper p-3 rounded-2xl bg-gray-200" v-if="chagptRes">
      <p class="text-gray-700 text-center my-5 py-3">
        Please review the store, date, and amount details above, then click the save button to record this expense.
      </p>
      <p>
        {{ chagptRes }}
      </p>
      <div class="py-3">
        <div class="mb-4">
          <label for="category" class="block text-gray-700 font-semibold mb-2">Category</label>
          <select v-model="category" id="category" name="category" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
              <option value="" disabled selected>Select a category</option>
              <option v-for="(option, key) in userStore.category" :key="key" :value="option.id">
                  {{ option.name }}
              </option>
          </select>
        </div>
      </div>
      <div class="cotnrolls flex">
        <button @click="reUpload" class="w-80 bg-gray-400 mr-3 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">upload</button>
        <button @click="save" class="w-50 bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">save</button>
      </div>
    </div>
    <div class="video-wrapper p-3 rounded-2xl bg-gray-200" v-else>
      <video class="rounded-2xl h-100 my-3" ref="video" autoplay playsinline></video>
      <div class="text-center">
        <button class="bg-gray-500" @click="takePhoto">
          <Camera class="" size="20" />
        </button>
      </div>
      <canvas ref="canvas" style="display: none;"></canvas>
    </div>
  </div>
</template>

<script setup>
import { GoogleGenAI } from '@google/genai';
import { ref, onUnmounted, onMounted, onDeactivated } from 'vue'
import { useExpenseStore } from '../store/ExpenseStore';
import { useUserStore } from '../store/UserStore';
import { Camera } from 'lucide-vue-next';

const expenseStore = useExpenseStore()
const userStore = useUserStore()
const props = defineProps(['changePage'])
const video = ref(null)
const canvas = ref(null)
const photo = ref(null)
const chagptRes = ref(null);
const category = ref('food')
let stream = null

const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});

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

function reUpload() {
  video.value = null
  canvas.value = null
  photo.value = null
  chagptRes.value = null
  startCamera();
}

const takePhoto = async () => {
  expenseStore.loader = true;

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
    { text: "Get the store_name, total_amount_due, and date and set it on json format only not extra word" },
  ];

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-lite',
    contents: contents,
  });

  let ai_res = JSON.parse(response.text.replace(/```json|```/g, '').trim());

  chagptRes.value = ai_res;
  chagptRes.value.date = getTodayPH(chagptRes.value.date) 
  stopCamera()
  expenseStore.loader = false;
}

async function save() {
  await expenseStore.createExpenseTransaction({
    "store": chagptRes.value.store_name,
    "amount": chagptRes.value.total_amount_due,
    "date": chagptRes.value.date,
    "category": category.value
  })
  props.changePage('all_expenses');
}

function getTodayPH(date = '') {
  let parsedDate = '';
  const offset = 8 * 60 * 60 * 1000
  if(date){
    parsedDate = new Date(date);
  }else{
    parsedDate = new Date();
  }

  const phDate = new Date(parsedDate.getTime() + offset);
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

onDeactivated(() => {
  // called when removed from the DOM into the cache
  // and also when unmounted
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