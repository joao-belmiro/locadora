<template>
  <div class="flex flex-col px-6 py-12 lg:px-8 min-h-screen">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Cadastro de usuário
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form  @submit.prevent="submitForm" class="space-y-6" >
        <div>
          <label
            for="nome"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Nome completo</label
          >
          <div class="mt-2">
            <input
              v-model="userForm.nome"
              id="nome"
              name="nome"
              type="text"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            for="documento"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Documento</label
          >
          <div class="mt-2">
            <input
            v-model="userForm.documento"
              id="documento"
              name="documento"
              type="number"
              required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Senha</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="userForm.senha"
              id="password"
              name="password"
              type="password"
              required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="flex items-start mb-5 gap-8">
          <div class="flex items-center h-5">
            <input v-model="userForm.status" id="ativo" type="radio" value="ativo" class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >
            <label
              for="ativo"
              class="ms-2 text-sm font-medium text-indigo-800 hover:underlin cursor-pointer"
              >
              Ativo</label
            >

          </div>
          <div class="flex items-center h-5">
            <input  v-model="userForm.status" id="inativo" type="radio" value="inativo" class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >
            <label
              for="inativo"
              class="ms-2 text-sm font-medium text-indigo-800 hover:underlin cursor-pointer"
              >
              inativo</label
            >

          </div>
        </div>
        <div  class="flex flex-row justify-between gap-5">
          <button
            type="submit"
            class="flex w-48 justify-center rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cadastrar
          </button>
          <router-link
            :to="backRoute"
            class="flex w-48 justify-center rounded-md bg-slate-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Voltar 
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">

import { ref, toRaw, onMounted } from "vue";
import { useRouter } from "vue-router";
import LocalStorage from "../services/storageService";
import { User }  from "../models/User.ts";
const router = useRouter();
const userForm = ref<User>({
  id: 0,
  nome: "",
  documento: "",
  senha: "",
  status: "ativo",
});
const backRoute = ref<string>('')
const storeUser = new LocalStorage<User>("users");

onMounted(() => {
  backRoute.value = window.history.state.back  === '/' ? '/' : '/users'
  if (router.currentRoute.value.name === "edit-user") {
    const userId: number = new Number(
      router.currentRoute.value.params.id
    ).valueOf();
    const userFind: User = storeUser.read(userId);
    if (userFind === null) alert("usuário não encontrado");
    if (userFind !== null) userForm.value = userFind;
  }
});

const submitForm = (): void => {
  if (router.currentRoute.value.name === "edit-user") {
    try {
      const rawUser = toRaw(userForm.value);
      storeUser.update(rawUser.id, rawUser);
      alert("usuário editado com sucesso");
      router.push(`/users`);
    } catch (error) {
      alert("erro ao editar usuário" + error);
      console.error(error);
    }
  } else {
    try {
      userForm.value.id = storeUser.getSize() + 1;
      const userRaw: User = toRaw(userForm.value);
      storeUser.create(userRaw);
      alert("usuário criado com sucesso");
      router.push(`/`);
    } catch (error) {
      alert("erro ao criar usuário" + error);
      console.error(error);
    }
  }
};
</script>