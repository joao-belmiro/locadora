<template>
  <div
    class="grid p-4 md:gap-8 sm:gap-0 sm:gap-y-2 grid-cols-1 gap-y-5 h-full md:py-4 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3"
  >
    <SearchLocation
    @locate-title="onLocate"></SearchLocation>
    <div class="col-span-2 h-full bg-gray-200 p-4 rounded-md">
      <h1 class="mb-4 text-1xl font-bold">Locar Filmes e séries</h1>
      <form @submit.prevent="submitForm" class="flex flex-row flex-wrap gap-2">
        <div class="w-full">
          <label class="font-semibold" for="clients">Cliente</label>
          <select
            required
            id="clients"
            v-model="locationForm.cliente"
            class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option class="font-semibold" v-for="client in clientsList" :key="client.id" :value="client">{{ `${client.nome} ${client.sobrenome} - ${client.status}` }}</option>
           
          </select>
        </div>
        <div class="md:w-2/5 lg:w-2/5 sm:w-full min-w-0">
          <label class="font-semibold" for="dateInitLocation">
            Inicio da Locação</label
          >
          <input
            required
            type="date"
            v-model="locationForm.dataLocacao"
            id="dateInitLocation"
            class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div class="md:w-1/2 lg:w-1/2 sm:w-full min-w-0">
          <label class="font-semibold" for="dateInitLocation">
            Inicio da devolução</label
          >
          <input
            required
            type="date"
            id="dateInitLocation"
            v-model="locationForm.dataEntrega"
            class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div class="w-full">
          <label for="status" class="font-semibold">Status</label>
          <ul
            id="status"
            class="items-center py-2 md:w-1/2 lg:w-1/2 sm:w-full text-sm font-medium text-gray-900 bg-white border rounded-lg sm:flex dark:bg-gray-400 dark:text-white"
          >
            <li
              class="border-b w-1/2 border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-400"
            >
              <div class="flex w-full items-center ps-3">
                <input
                  id="alugado"
                  type="radio"
                  value="alugado"
                  name="list-radio"
                  v-model="locationForm.status"
                  class="w-4 h-4 text-indigo-600 bg-gray-100 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="alugado"
                  class="w-full py-1 ms-2 text-sm font-medium text-gray-900"
                  >alugado
                </label>
              </div>
            </li>
            <li
              class="w-1/2 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-400"
            >
              <div class="flex items-center ps-3">
                <input
                  id="entregue"
                  type="radio"
                  value="entregue"
                  name="list-radio"
                  v-model="locationForm.status"
                  class="w-4 h-4 text-indigo-600 bg-gray-100 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="entregue"
                  class="w-full py-1 ms-2 text-sm font-medium text-gray-900"
                  >entregue</label
                >
              </div>
            </li>
          </ul>
        </div>
        <h1
          class="mb-4 w-full rounded-md text-1xl font-semibold border-2 border-gray-300 text-gray-500 p-2"
        >
          Itens Locados
        </h1>

        <div
          class="w-full overflow-y-auto mt-6 grid sm:grid-cols-1 lg:grid-cols-4 md:grid-cols-1 gap-4 scroll-smooth focus:scroll-auto pt-1 pr-1"
          style="height: 48vh"
        >
          <CardTitle
            v-for="(title, index) in locationForm.filmes"
            :index="index"
            :key="title.Title"
            :plot="title.Plot"
            :genre="title.Genre"
            :title="title.Title"
            :runtime="title.Runtime"
            :type="title.Type"
            :year="title.Year"
            :poster="title.Poster"
            :show-remove="true"
            :show-add="false"

          />
        </div>
        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-400" />

        <div class="w-full flex flex-row justify-between mt-auto">
          <button
            type="submit"
            class="flex w-48 justify-center rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cadastrar
          </button>
          <router-link
            to="/location"
            class="flex w-48 justify-center rounded-md bg-slate-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancelar
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, toRaw } from "vue";
import SearchLocation from "../components/SearchLocation.vue";
import CardTitle from "../components/CardTitle.vue";
import LocalStorage from "../services/storageService";
import User from "../models/User";
import { Client } from "../models/Client";
import { Location } from "../models/Location"
import { useRouter } from "vue-router";
const router = useRouter();
const locationForm = ref<Location>({
  id: 0,
  cliente: null,
  dataEntrega: null,
  dataLocacao: new Date().toISOString().split("T")[0],
  usuarioLocacao: null,
  status: 'alugado',
  filmes: []
});

const clientsList = ref<Client[]>([]);
const storeClient = new LocalStorage<Client>('client')
const storeLocation = new LocalStorage<Client>('locations')
const userLogged:User = localStorage.getItem('userLogged')

onMounted((): void => {
  clientsList.value = storeClient.getAll();
  locationForm.value.usuarioLocacao = JSON.parse(userLogged)
  if (router.currentRoute.value.name === "edit-location") {
    const locationId: number = new Number(
      router.currentRoute.value.params.id
    ).valueOf();
    const locationFind: Location = storeLocation.read(locationId);
    if (locationFind === null) alert("Cliente não encontrado");
    if (locationFind !== null) locationForm.value = locationFind;
  }
});

const onLocate = (title: any): void => {
  locationForm.value.filmes.push(title)
}

const submitForm = () => {
  if(locationForm.value.filmes.length === 0) {
    alert('Adicione ao menos um Filme ou série')
    return
  }
  if (locationForm.value.cliente.status === 'inativo') {
    alert('O cliente selecionado está inativo ative ou selecione outro cliente')
    return
  }
  if (router.currentRoute.value.name === "edit-location") {
    try {
      const rawLocation = toRaw(locationForm.value);
      storeLocation.update(rawLocation.id, rawLocation);
      alert("Locação editada com sucesso");
      router.push(`/location`);
    } catch (error) {
      alert("erro ao editar Locação" + error);
      console.error(error);
    }
  } else {
    try {
      locationForm.value.id =  storeLocation.getSize() + 1;
      const rawLocation = toRaw(locationForm.value);
      storeLocation.create(rawLocation);
      alert("Locação criada com sucesso");
      router.push(`/location`);
    } catch (error) {
      alert("erro ao editar Locação" + error);
      console.error(error);
    }
  }
}


</script>