<template>
  <div class="mx-auto flex flex-col p-4 sm:px-6 lg:px-8">
    <header-filter 
        placeholder="Nome do cliente"
        text-add="Novo Cliente"
        router-add="/new-client"
        status-negative="inativo"
        status-positive="ativo"
        @emit-search="searchbyName"
        @emit-status="searchByStatus">
        <div class="md:w-40 sm:w-full">
            <label class="text-sm" for="document">Documento</label>
            <input
            id="document"
            type="number"
            v-model="documento"
            @input="searchByDoc"
            placeholder="Documento"
            class="block w-full  rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
        </header-filter>
    <Table 
    class="my-4"
      id="id" 
      :columns="columns"
      :data="data"
      @emit-edit="doEdit"
      @emit-delete="prepareToDelete" />
    <ModalCofirm
      v-model:close="hasClosed"
      @confirm="doDelete"
      text-modal="deseja remover este cliente ?"
    ></ModalCofirm>
  </div>
</template>
  <script setup lang="ts">
import HeaderFilter from "../components/HeaderFilter.vue";
import { ref, onMounted, provide } from "vue";
import { Client } from '../models/Client'
import Table from "../components/Table.vue";
import ModalCofirm from "../components/ModalCofirm.vue";
import LocalStorage from "../services/storageService";
import { useRouter } from 'vue-router'
const router = useRouter()
const key = ref<string>("");
const hasClosed = ref<boolean>(false);

provide("close-modal", hasClosed.value);
const columns = ref<any[]>([
  { label: 'código', property: 'id' },
  { label: 'Nome', property: 'nome' },
  { label: 'Sobrenome', property: 'sobrenome' },
  { label: 'Documento', property: 'cpf' },
  { label: 'Telefone', property: 'celular' },
  { label: 'E-mail', property: 'email' },
  { label: 'Endereço', property: 'endereco' },
  { label: 'Status', property: 'status' },
])
const dataToDelete = ref<Client>();
const data = ref<any[]>([])
const storageClient = new LocalStorage<Client>('client')
const documento = ref<number>(null)

onMounted((): void => {
  getAllClients()
});

const prepareToDelete = (client: Client) => {
    dataToDelete.value = client
    hasClosed.value = !hasClosed.value
}

const getAllClients = (): void => {
  const clients = storageClient.getAll()
  data.value = formatClient(clients)
}

const doDelete = (): void => {
  try {
    storageClient.delete(dataToDelete.value.id)
    data.value = formatClient(storageClient.getAll()) 
    hasClosed.value = false
    alert('Cliente Removido com sucesso')
  } catch (erro) {
    alert('Erro ao deletar cliente:' + erro )
    console.error(erro)
  }
}

const formatClient = (data: any[]): any[] => {
  const clientsFormated = data.map((client: Client) => {
    let endereco = client.endereco
    let newEndereco: string = `${endereco.cep},${endereco.logradouro},${endereco.bairro}${endereco.cidade},${endereco.uf}`
    const newClient = client
    newClient.endereco = newEndereco
    return { ...client }
  })
  return clientsFormated
}
const doEdit = (client: Client): void => {
  router.push(`/edit-client/${client.id}`)
}
const searchByDoc = () => {
  filterBy('cpf', documento.value.toString())
}
const searchbyName = (name: string) => {
  filterBy('nome', name)
}

const searchByStatus = (status: string) => {
  const clients = storageClient.getAll().filter(client => client.status === status)
  data.value = formatClient(clients)
}
const filterBy = (key: string, value: string): void => {
  const clients = storageClient.getAll().filter(client => client[key].indexOf(value) !== -1)
  data.value = formatClient(clients)
}
</script>
  
  <style>
</style>