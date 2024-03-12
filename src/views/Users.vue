<template>
  <div class="mx-auto flex flex-col p-4 sm:px-6 lg:px-8">
    <header-filter
      placeholder="Nome do usuário"
      text-add="Novo Usuário"
      router-add="/register"
      status-negative="inativo"
      status-positive="ativo"
      @emit-search="searchbyName"
      @emit-status="searchByStatus"
    >
    </header-filter>
    <Table
      class="my-4"
      id="id"
      :columns="columns"
      :data="data"
      @emit-edit="doEdit"
      @emit-delete="prepareToDelete"
    />
    <ModalCofirm
      v-model:close="hasClosed"
      @confirm="doDelete"
      text-modal="deseja remover este usuário ?"
    ></ModalCofirm>
  </div>
</template>
  <script setup lang="ts">
import HeaderFilter from "../components/HeaderFilter.vue";
import { ref, onMounted } from "vue";
import { User } from "../models/User";
import Table from "../components/Table.vue";
import ModalCofirm from "../components/ModalCofirm.vue";
import LocalStorage from "../services/storageService";
import { useRouter } from "vue-router";
const router = useRouter();
const key = ref<string>("");
const hasClosed = ref<boolean>(false);

const columns = ref<any[]>([
  { label: "código", property: "id" },
  { label: "Nome", property: "nome" },
  { label: "documento", property: "documento" },
  { label: "senha", property: "senha" },

  { label: "Status", property: "status" },
]);
const dataToDelete = ref<User>();
const data = ref<any[]>([]);
const storageUser = new LocalStorage<Client>("users");

onMounted((): void => {
  getAllClients();
});

const prepareToDelete = (user: User) => {
  dataToDelete.value = user;
  hasClosed.value = !hasClosed.value;
};

const getAllClients = (): void => {
  data.value = storageUser.getAll();
};

const doDelete = (): void => {
  try {
    storageUser.delete(dataToDelete.value.id);
    data.value = storageUser.getAll();
    hasClosed.value = false;
    alert("Cliente Removido com sucesso");
  } catch (erro) {
    alert("Erro ao deletar cliente:" + erro);
    console.error(erro);
  }
};

const doEdit = (user: User): void => {
  router.push(`/edit-user/${user.id}`);
};

const searchbyName = (name: string) => {
  data.value = storageUser
    .getAll()
    .filter((client) => client.nome.indexOf(name) !== -1);
};

const searchByStatus = (status: string) => {
  data.value = storageUser
    .getAll()
    .filter((client) => client.status !== status);
};
</script>
  
  <style>
</style>