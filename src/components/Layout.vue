<template>
  <div>
    <nav class="bg-slate-800 border-indigo-20">
      <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4"
      >
        <router-link
          to="locadora"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <h1 class="text-2xl text-white">Locadora</h1>
        </router-link>
        <div class="flex items-center space-x-6 rtl:space-x-reverse">
          <router-link
            to="/"
            class="text-white bg-red-800 hover:bg-red-700 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >

            <svg
              class="w-4 h-4 mr-2 text-indigo-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
              ></path>
            </svg>
            Sair</router-link>
        </div>
      </div>
    </nav>
    <nav class="bg-indigo-50 dark:bg-indigo-700">
      <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div class="flex items-center">
          <ul
            class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm"
          >
            <li>
              <router-link
                to="/location"
                class="text-indigo-900 dark:text-white hover:underline"
                aria-current="page"
                >Home</router-link
              >
            </li>
            <li>
              <router-link to="/clients" class="text-indigo-900 dark:text-white hover:underline"
                >Clientes</router-link
              >
            </li>
            <li>
              <router-link to="/users" class="text-indigo-900 dark:text-white hover:underline"
                >Usuários</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
