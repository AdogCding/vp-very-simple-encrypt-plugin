import { defineClientConfig } from '@vuepress/client';
import PasswordProtected from './components/PasswordProtected.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'; // Ant Design Vue 3 推荐使用 reset 样式

export default defineClientConfig({
  enhance({ app }) {
    app.use(Antd)
    app.component('PasswordProtected', PasswordProtected);
  },
});