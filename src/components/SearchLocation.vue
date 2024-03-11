<template>
        <div class="col-span-1 bg-gray-200 rounded-md">
      <div class="flex flex-col w-full p-4">
        <h1 class="text-1xl  text-gray-950 font-bold mb-4">
          Pesquisar Filmes e séries
        </h1>
        <form @submit.prevent="searchTitles">
          
          <div class="flex flex-row flex-wrap gap-3">
            <input
            type="text"
            name="nome"
            v-model="title"
            class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Nome da Série ou filme "
            required
            />
            
            <input
            type="number"
            name="numero"
            class="w-full md:w-1/2 lg:w-1/2 p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Ano"
            v-model="year"
            />
            
            <div class="flex items-center">
              <input
              checked
              id="only-films"
              type="checkbox"
              v-model="type"
              class="w-4 h-4 mr-1 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              
              <label
              for="only-films"
              class="font-semibold cursor-pointer text-indigo-600"
              >Apenas filmes</label
              >
            </div>
          </div>
          
          <button
          type="submit"
          class="w-full mt-4 p-2 font-semibold tracking-wide text-white bg-indigo-500 rounded hover:bg-indigo-700"
          >
          Pesquisar
        </button>
      </form>

        <div class="overflow-y-auto mt-6 h-50 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4 scroll-smooth focus:scroll-auto  pt-1 pr-1" style="height:72vh;">
          
            <CardTitle 
                v-for="(title, index) in titlesSearched" :key="title.Title"
                :index="index"
                :plot="title.Plot"
                :genre="title.Genre"
                :title="title.Title"
                :runtime="title.Runtime"
                :type="title.Type"
                :year="title.Year"
                :poster="title.Poster"
                :show-remove="false"
                :show-add="true"
                @add-title="onAdd"
            />
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import { ref, toRaw, defineEmits } from 'vue';
import CardTitle from './CardTitle.vue'
import { getTitles } from '../services/omdbService'
const title = ref<string>('')
const year = ref<number>()
const type = ref<boolean>(true)
const titlesSearched = ref<any[]>()
const emit = defineEmits(['locateTitle'])
const searchTitles = async () => {
  const onlyMovies: string= type.value ? 'movie' : null
  const response = await getTitles(title.value, onlyMovies, year.value).then(res => res).catch(erro => erro)
  if (response.status === 200 && response.data.Error === undefined) {
    titlesSearched.value = Array.isArray(response.data) ? response.data : [response.data]
    console.log(titlesSearched.value)
  }
  if (response.data.Error) {
    titlesSearched.value = []
    alert(response.data.Error)
  }
}
const onAdd = (index: number) => {
  console.log(index)
  const rawMovie: any = toRaw(titlesSearched.value[index])
  emit('locateTitle', rawMovie)
}
</script>