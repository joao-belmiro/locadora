<template>
  <div class="container mx-auto my-4 bg-gray-200 p-4 rounded-md">
    <h1 class="mb-4 text-2xl font-semibold">{{ client.id !== 0 ?  'Editar' : 'Cadastrar' }} Cliente</h1>
    <form
      @submit.prevent="submitForm"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div class="col-span-2 md:col-span-1">
        <label for="nome" class="font-semibold">Nome</label>
        <input
          v-model="client.nome"
          type="text"
          id="nome"
          name="nome"
          class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div class="col-span-2 md:col-span-1">
        <label for="sobrenome" class="font-semibold">Sobrenome</label>
        <input
          v-model="client.sobrenome"
          type="text"
          id="sobrenome"
          name="sobrenome"
          class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div class="col-span-2 md:col-span-1">
        <label for="cpf" class="font-semibold">CPF</label>
        <input
          v-model="client.cpf"
          type="text"
          id="cpf"
          name="cpf"
          class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div class="col-span-2 md:col-span-1">
        <label for="email" class="font-semibold">Email</label>
        <input
          v-model="client.email"
          type="email"
          id="email"
          name="email"
          class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div class="col-span-2 md:col-span-1">
        <label for="celular" class="font-semibold">Celular</label>
        <input
          v-model="client.celular"
          type="text"
          id="celular"
          name="celular"
          class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div class="col-span-2 md:col-span-1">
        <label for="cep" class="font-semibold">CEP</label>
        <input
          @input="searchCep"
          v-model="client.endereco.cep"
          type="text"
          id="cep"
          maxlength="8"
          name="cep"
          class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div class="col-span-2 md:col-span-1">
        <label for="logradouro" class="font-semibold">Logradouro</label>
        <input
          :disabled="addressDisable"
          v-model="client.endereco.logradouro"
          type="text"
          id="logradouro"
          name="logradouro"
          class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div class="col-span-2 md:col-span-1">
        <label for="bairro" class="font-semibold">Bairro</label>
        <input
          :disabled="addressDisable"
          v-model="client.endereco.bairro"
          type="text"
          id="bairro"
          name="bairro"
          class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div class="col-span-2 md:col-span-1">
        <label for="cidade" class="font-semibold">Cidade</label>
        <input
          :disabled="addressDisable"
          v-model="client.endereco.cidade"
          type="text"
          id="cidade"
          name="cidade"
          class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div class="col-span-2 md:col-span-1">
        <label for="uf" class="font-semibold">UF</label>
        <input
          :disabled="addressDisable"
          v-model="client.endereco.uf"
          type="text"
          id="uf"
          name="uf"
          class="block shrink w-full p-4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="w-full flex flex-row mt-auto gap-4">
          <button
            type="submit"
            class="flex w-48 justify-center rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cadastrar
          </button>
          <router-link
            to="/clients"
            class="flex w-48 justify-center rounded-md bg-slate-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancelar
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>
  
<script setup lang="ts">
interface Endereco {
  bairro: string,
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

import { ref, toRaw, onMounted } from "vue";
import { Client } from "../models/Client";
import { getCep } from '../services/viaCepService'
import { useRouter } from "vue-router";
import LocalStorage from '../services/storageService'
const router = useRouter()
const client = ref<Client>({
  id: 0,
  nome: "",
  sobrenome: "",
  cpf: "",
  email: "",
  celular: "",
  endereco: {
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
  },
});
const storeClient = new LocalStorage<Client>('client')
const addressDisable = ref<boolean>(true);

onMounted( () => {
  if (router.currentRoute.value.name === 'edit-client') {
    const clientId: number = new Number(router.currentRoute.value.params.id).valueOf()
    const clientFind: Client = storeClient.read(clientId)
    if (clientFind === null) alert('Cliente não encontrado')
    if (clientFind !== null) client.value = clientFind
  }
})

const submitForm = (): void  => {
  if (router.currentRoute.value.name === 'edit-client') {
    try {
      const rawClient = toRaw(client.value)
      console.log(rawClient)
      storeClient.update(rawClient.id, rawClient)
      alert('cliente editado com sucesso')
      router.push(`/clients`)
    } catch (error) {
      alert('erro ao editar cliente' + error)
      console.error(error)
    }
  } else {
    try {
      client.value.id = storeClient.getSize() + 1
      const clientRaw:Client = toRaw(client.value)
      storeClient.create(clientRaw)
      alert('cliente criado com sucesso')
      router.push(`/clients`)

    } catch (error) {
      alert('erro ao criar cliente' + error)
      console.error(error)
    }
   
  }
};
const searchCep = async () => {
  const cep: string = client.value.endereco.cep;
  if (cep.length == 8) {
    const response = await getCep(cep).then(res => {
      console.log(res)
      return res
    }).catch(erro => {
      return erro
    })
    if (response.data)
    
    if (response.data.cep !== undefined) {
      console.log(response)
      mockAdress(response.data)
    }
    if(response.status == 200 && response.data.erro !== undefined) {
      addressDisable.value = false
      alert('Erro ao buscar endereco, use um cep diferente ')
    }
    if (response.status !== 200) {
      alert('Erro ao buscar endereco, formato inválido')

    }
  }
}

const mockAdress = (endereco: Endereco ) => {
  client.value.endereco.logradouro = endereco.logradouro
  client.value.endereco.bairro = endereco.bairro
  client.value.endereco.cidade = endereco.localidade
  client.value.endereco.uf = endereco.uf
}
</script>