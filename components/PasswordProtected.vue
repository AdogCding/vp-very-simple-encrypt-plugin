<template>
  <div v-if="unlocked">
    <slot />
  </div>
  <div class="password-protection" v-else>
    <a-flex gap="middle" vertical>
      <a-flex :justify=center :align=center>
        <PasswordBlock :correct-password="password" @unlock="unlockBlock"></PasswordBlock>
      </a-flex>
    </a-flex>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PasswordBlock from './PasswordBlock.vue'
const props = defineProps({
  password:String
})
const center = "center"
const unlocked = ref(false)
function unlockBlock(){
  unlocked.value = true
}
// 检查是否有保存好的密码
if (typeof window !== 'undefined') {
  sessionStorage.getItem("password") === props.password && unlockBlock()
}
</script>

<style scoped>
.password-protection {
  margin-top: 10%;
}
</style>