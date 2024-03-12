<template>
  <div class="mx-auto flex flex-col p-4 sm:px-6 lg:px-8">
    <header-filter
      placeholder="Nome do cliente"
      text-add="Nova Locação"
      router-add="/new-location"
      status-negative="alugado"
      status-positive="entregue"
    >
      <div class="w-full md:w-36 min-w-0">
        <label class="text-sm" for="dateInitLocation"> Inicio da Locação</label>
        <input
          type="date"
          v-model="dataLocacao"
          id="dateInitLocation"
          class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div class="w-full md:w-36 min-w-0">
        <label class="text-sm" for="dateInitLocation">
          Inicio da devolução</label
        >
        <input
          type="date"
          id="dateInLocation"
          v-model="dataDevolucao"
          class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </header-filter>
    <Table
      class="my-8"
      id="id"
      :columns="columns"
      :data="data"
      @emit-edit="doEdit"
      @emit-delete="prepareToDelete"
    ></Table>
    <ModalCofirm
      v-model:close="hasClosed"
      @confirm="doDelete"
      text-modal="deseja remover a Locação deste Cliente ?"
    >
    </ModalCofirm>
  </div>
</template>
<script setup lang="ts">
import HeaderFilter from "../components/HeaderFilter.vue";
import { ref, onMounted, provide } from "vue";
import Table from "../components/Table.vue";
import ModalCofirm from "../components/ModalCofirm.vue";
import LocalStorage from "../services/storageService";
import { Location } from "../models/Location";
import { useRouter } from "vue-router";
const router = useRouter();
const key = ref<string>("");
const hasClosed = ref<boolean>(false);

const columns = ref<any[]>([
  { label: "código", property: "id" },
  { label: "cliente", property: "cliente" },
  { label: "Filmes", property: "filmes" },
  { label: "Locação", property: "dataLocacao" },
  { label: "dataEntrega", property: "dataEntrega" },
  { label: "Atedente", property: "usuarioLocacao" },
  { label: "Status", property: "status" },
]);
const dataToDelete = ref<Location>();
const data = ref<any[]>([]);
const storageLocation = new LocalStorage<Client>("locations");

onMounted((): void => {
  getAllLocations();
});

const prepareToDelete = (location: Location) => {
  dataToDelete.value = location;
  hasClosed.value = !hasClosed.value;
};

const getAllLocations = (): void => {
  data.value = formatLocacao(storageLocation.getAll());
};

const doDelete = (): void => {
  try {
    storageLocation.delete(dataToDelete.value.id);
    data.value = formatLocacao(storageLocation.getAll());
    hasClosed.value = false;
    alert("Locação removida com sucesso !");
  } catch (erro) {
    alert("Erro ao deletar Locação:" + erro);
    console.error(erro);
  }
};

const doEdit = (location: Location): void => {
  router.push(`/edit-location/${location.id}`);
};

const formatLocacao = (locationList: Location[]) => {
  const locationListFormated = locationList.map((location) => {
    let films = location.filmes.map((film) => film.Title).join(",");
    let cliente = `${location.cliente.nome} ${location.cliente.sobrenome}`;
    let atendente = `${location.usuarioLocacao.nome} - ${location.usuarioLocacao.documento}`;
    location.filmes = films;
    location.cliente = cliente;
    location.usuarioLocacao = atendente;
    return { ...location };
  });

  return locationListFormated;
};
</script>

<style>
</style>