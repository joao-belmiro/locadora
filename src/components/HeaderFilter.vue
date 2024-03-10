<template>
  <div class="grid gap-6 mb-6 md:grid-cols-4">
    <input
      id="filter"
      name="filter"
      type="text"
      required
      @input="onEmitSearch"
      :placeholder="placeholder"
      class="block shrink w-50 p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />

    <slot></slot>
    
    <ul
      class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-400 dark:border-gray-400 dark:text-white"
    >
      <li
        class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-400"
      >
        <div class="flex items-center ps-3">
          <input
            id="horizontal-list-radio-license"
            type="radio"
            value="ativo"
            v-model="status"
            @input="onEmitStatus"
            name="list-radio"
            class="w-4 h-4 text-indigo-600 bg-gray-100 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="horizontal-list-radio-license"
            class="w-full py-1 ms-2 text-sm font-medium text-gray-900"
            >Ativo
          </label>
        </div>
      </li>
      <li
        class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-400"
      >
        <div class="flex items-center ps-3">
          <input
            id="horizontal-list-radio-id"
            type="radio"
            v-model="status"
            @input="onEmitStatus"
            value="inativo"
            name="list-radio"
            class="w-4 h-4 text-indigo-600 bg-gray-100 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="horizontal-list-radio-id"
            class="w-full py-1 ms-2 text-sm font-medium text-gray-900"
            >Inativo</label
          >
        </div>
      </li>
    </ul>

    <router-link
      :to="routerAdd ? routerAdd : '/'"
      class="text-center font-semibold bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md md:py-3 md:px-6 lg:py-2 lg:px-6"
      >{{ textAdd }}</router-link
    >
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref, defineEmits } from "vue";
const props = defineProps({
  placeholder: String,
  routerAdd: String,
  textAdd: String
})

const search = ref<string>('')
const status = ref<string>('')

const emit = defineEmits(['emitSearch', 'emitStatus'])

const onEmitSearch = () => {
  emit('emitSearch', search.value)
}

const onEmitStatus = () => {
  emit('emitStatus', status.value)
}
</script>