<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
const router = useRouter();

onMounted( () => {
  keepLogged()
})
const keepLogged = () =>{
  const hasUserLog = localStorage.getItem('userLogged')

  if (hasUserLog !== null) {
    router.push('/location')
    alert('usuario já logado ')
  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
