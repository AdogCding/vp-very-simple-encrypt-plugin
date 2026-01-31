import { defineClientConfig } from '@vuepress/client';
import PasswordProtected from './components/PasswordProtected.vue';
import './lib/style.css'; // 引入同目录下的 CSS
export default defineClientConfig({
  enhance({ app }) {
    app.component('PasswordProtected', PasswordProtected);
  },
});