<template>
  <div class="flex flex-col justify-center px-6 py-12 lg:px-8 min-h-screen">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Realize o Login
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="doLogin" class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="documento"
            class="block text-sm font-medium leading-6 text-gray-900"
            
          >Documento</label>
          <div class="mt-2">
            <input
              id="documento"
              name="documento"
              type="number"
              v-model="documento"
              required
              class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              id="password"
              name="password"
              type="password"
              v-model="senha"
              required
              class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Entrar
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Se não possui cadastro, então
        <router-link
          to="/register"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Cadastre-se</router-link
        >
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">

import LocalStorage from '../services/storageService'
import { useRouter } from 'vue-router'
import { User } from '../models/User'
import { ref } from 'vue';
const router = useRouter()
const storeUser = new LocalStorage<User>('users')
const documento = ref<number>()
const senha = ref<string>('')

const doLogin = (): void => {
  try {
    const allUsers: User[] = storeUser.getAll();
    let searchUser: User = allUsers.find(user => user.documento === documento.value && user.senha === senha.value)
    if (searchUser !== undefined && searchUser.status === 'ativo') {
      router.push('/location')
      localStorage.setItem('userLogged', JSON.stringify(searchUser))
    }
    if (searchUser !== undefined && searchUser.status === 'inativo') {
        alert('Usuário inativo, tente outro')
        localStorage.removeItem('userLogged')
    }
    if (searchUser === undefined) {
      localStorage.removeItem('userLogged')
      let msg: string = 'Credênciais incorretas ou usuário inexistente'
      alert(msg)
      throw new Error(msg)
    }
   
  } catch (error) {
      localStorage.removeItem('userLogged')
      console.error(error)
  }
}
</script>