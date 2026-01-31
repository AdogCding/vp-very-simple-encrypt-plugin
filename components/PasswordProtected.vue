<template>
  <div v-if="unlocked">
    <slot />
  </div>
  <div class="vptw:flex vptw:flex-col vptw:items-center vptw:justify-center vptw:min-h-screen vptw:p-4" v-else>
    <PasswordBlock :correct-password="password" @unlock="unlockBlock"></PasswordBlock>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
const PasswordBlock = defineAsyncComponent(() => import('./PasswordBlock.vue'))
const props = defineProps({
  password: String
})
const unlocked = ref(false)
function unlockBlock() {
  unlocked.value = true
}
// 检查是否有保存好的密码
if (typeof window !== 'undefined') {
  sessionStorage.getItem("password") === props.password && unlockBlock()
}
</script>

<style scoped></style>