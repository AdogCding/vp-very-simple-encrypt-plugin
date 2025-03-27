<script setup>
import {ref} from 'vue'
const props = defineProps({
  correctPassword: String
})
// 是否保存解锁状态
const isKeepUnlock = ref(false)
const notPass = ref(undefined)
const inputPassword = ref("")
const emit = defineEmits(['unlock'])
const gap = "middle"
function checkPassword() {
  if (inputPassword.value !== props.correctPassword) {
    notPass.value = true;
    return;
  }
  if (isKeepUnlock.value) {
    sessionStorage.setItem("password", props.correctPassword)
  }
  emit("unlock")
}
</script>

<template>
  <div style="background: #ececec; padding: 30px">
    <a-card title="已开启密码保护" :bordered="false">
      <a-flex :gap="gap" vertical>
        <div v-if="notPass">
          <a-alert message="密码错误" type="error" />
        </div>
        <a-input-password v-model:value="inputPassword" placeholder="输入密码查看内容" />
        <a-button @click="checkPassword">解锁</a-button>
        <a-checkbox v-model:checked="isKeepUnlock">是否保持解锁状态</a-checkbox>
      </a-flex>
     </a-card>
  </div>
</template>

<style scoped>

</style>