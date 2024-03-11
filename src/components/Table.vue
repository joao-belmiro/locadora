<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-500 dark:text-white"
      >
        <tr>
          <th v-for="col in columns" :key="col.label" scope="col" class="px-6 py-3">{{ col.label }}</th>
          <th scope="col" class="px-6 py-3">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row[id]"
          class="border-b dark:bg-gray-400 text-slate-900 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-400"
        >
          
          <td v-for="col in columns" :key="col.label" class="px-6 py-4">{{ row[col.property] }}</td>
          
          <td class="flex items-center px-6 py-4 gap-4">
            <button @click="doEdit(row)"
              class="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Editar
            </button>
            <button
              @click="doDelete(row)"
              class="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-re-800 focus:ring-4 focus:outline-none focus:ring-re-300 hover:bg-red-800 dark:focus:ring-red-800"
            >
              Remover
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps , toRaw } from 'vue'
const props = defineProps({
  columns: Array,
  data: Array,
  id: String
})
const emit = defineEmits(['emitDelete', 'emitEdit'])

const doDelete = (row) => {
  emit('emitDelete', toRaw(row))
}

const doEdit = (row) => {
  emit('emitEdit', toRaw(row))
}
</script>

<style>
</style>