<script setup>
import { ref } from 'vue'
const props = defineProps({
  correctPassword: String
})
// 是否保存解锁状态
const isKeepUnlock = ref(false)
const notPass = ref(false)
const inputPassword = ref("")
const emit = defineEmits(['unlock'])
const isPwdVisible = ref(false);
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
  <!-- 主卡片容器 -->
  <div class="vptw:bg-white vptw:rounded-lg card-shadow vptw:w-full vptw:max-w-[400px] vptw:overflow-hidden">
    <!-- 标题栏 -->
    <div class="vptw:px-8 vptw:pt-8 vptw:pb-4 vptw:text-center">
      <h1 class="vptw:text-xl vptw:font-medium vptw:text-gray-800 vptw:m-0">已开启密码保护</h1>
    </div>

    <div class="vptw:border-t vptw:border-gray-100 vptw:mx-8"></div>

    <!-- 内容表单区 -->
    <div class="vptw:p-8 vptw:space-y-4">
      <!-- 密码输入框容器 -->
      <div class="vptw:relative">
        <div id="inputWrapper"
          class="vptw:flex vptw:items-center vptw:border vptw:border-solid vptw:border-gray-300 vptw:rounded-md vptw:px-3 vptw:py-2 vptw:transition-all focus-within:vptw:border-blue-400 focus-within:vptw:ring-2 focus-within:vptw:ring-blue-100">
          <input id="passwordInput" :type="isPwdVisible ? 'text' : 'password'" placeholder="输入密码查看内容"
            v-model="inputPassword"
            class="vptw:w-full vptw:text-gray-600 vptw:placeholder-gray-300 vptw:bg-transparent vptw:outline-none vptw:border-none vptw:p-0" />
          <!-- 切换可见性按钮 -->
          <button id="togglePassword" @click="isPwdVisible = !isPwdVisible"
            class="vptw:ml-2 vptw:text-gray-400 hover:vptw:text-gray-600 vptw:bg-transparent vptw:border-none vptw:cursor-pointer vptw:p-0 vptw:flex">
            <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              v-if="!isPwdVisible">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <svg id="eyeOffIcon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              v-if="isPwdVisible">
              <path
                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24">
              </path>
              <line x1="1" y1="1" x2="23" y2="23" stroke-width="2.5"></line>
            </svg>
          </button>
        </div>
        <!-- 错误消息提示 -->
        <div id="errorMessage" v-if="notPass" class="vptw:absolute vptw:mt-1 vptw:text-xs vptw:text-red-500">
          密码错误，请重新输入
        </div>
      </div>

      <!-- 解锁按钮 -->
      <button id="unlockBtn"
        class="vptw:w-full vptw:bg-white vptw:border vptw:border-solid vptw:border-gray-300 hover:vptw:border-blue-400 hover:vptw:text-blue-500 vptw:text-gray-600 vptw:font-normal vptw:py-2 vptw:px-4 vptw:rounded-md vptw:transition-all active:vptw:bg-gray-50 vptw:cursor-pointer vptw:mt-2"
        @click="checkPassword">
        解 锁
      </button>

      <!-- 勾选项 -->
      <div class="vptw:flex vptw:items-center vptw:space-x-2 vptw:pt-2">
        <input type="checkbox" v-model="isKeepUnlock" id="keepUnlocked" class="vptw:w-4 vptw:h-4 vptw:cursor-pointer">
        <label for="keepUnlocked"
          class="vptw:text-sm vptw:text-gray-600 vptw:cursor-pointer vptw:select-none">是否保持解锁状态</label>
      </div>
    </div>
  </div>
</template>

<style scoped></style>