import { defineClientConfig } from '@vuepress/client';
import PasswordProtected from './components/PasswordProtected.vue';
import {Card, Flex, Alert, InputPassword, Button, Checkbox} from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'; // Ant Design Vue 3 推荐使用 reset 样式

export default defineClientConfig({
  enhance({ app }) {
    app.component("ACard",Card);
    app.component("AFlex",Flex);
    app.component("AAlert",Alert);
    app.component("AButton",Button);
    app.component("ACheckbox",Checkbox);
    app.component("AInputPassword",InputPassword);
    app.component('PasswordProtected', PasswordProtected);
  },
});