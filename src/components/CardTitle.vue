<template>
  <div
    class=" h-fit max-h-1/2 bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-300"
  >
    <a >
      <img class="rounded-t-lg" :src="poster" :alt="`image for ${type} ${title}`" />
    </a>
    <div class="p-2">
      <div class=" flex flex-row flex-wrap mb-2">
        <h5 class="mr-2 max-w-lg overflow-auto break-words"  > {{title}}</h5>
        <span class="bg-green-800 text-xs font-medium px-2.5 py-0.5 rounded text-white">{{ type }}</span>

        </div>
      <p class="mb-3  text-xs font-normal text-gray-950 text-ellipsis">
        {{ plot }}
      </p>
      <div class="inline-flex py-2 gap-1">

        <span class="bg-blue-100 text-white text-xs font-medium px-2 py-0.5 rounded dark:bg-indigo-900 ">Ano: {{ year }}</span>
        <span class="bg-gray-100 text-white text-xs font-medium px-2 py-0.5 rounded dark:bg-gray-700">{{  runtime }}</span>
      </div>
      <br>
      <div class="inline-flex gap-4">
        <button
          v-if="showAdd"
          @click="addTitle(index)"
          class="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        >
          Adicionar
        </button>
        <button
          v-if="showRemove"
          @click="removeTitle"
          class="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-re-800 focus:ring-4 focus:outline-none focus:ring-re-300  hover:bg-red-800 dark:focus:ring-red-800"
        >
        Remover
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, toRaw } from 'vue'
const props = defineProps({
   index: Number,
   plot: String,
   genre: String,
   title: String, 
   runtime: String,
   type: String,
   year: String,
   poster: String,
   showRemove: Boolean,
   showAdd: Boolean,
})
const emit = defineEmits(['addTitle', 'removeTitle'])

const addTitle = (index: number) => {
  emit('addTitle', index)
}

const removeTitle = () => {
  emit('removeTitle')
}

</script>