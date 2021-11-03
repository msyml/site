import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import prismjs from 'vite-plugin-prismjs';
import ViteComponents, {
  AntDesignVueResolver
} from 'vite-plugin-components';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 配置别名，简化引用
    alias: {
      '@': path.resolve(__dirname, 'src'),
      comps: path.resolve(__dirname, 'src/components'),
      apis: path.resolve(__dirname, 'src/apis'),
      views: path.resolve(__dirname, 'src/views'),
      utils: path.resolve(__dirname, 'src/utils'),
      routes: path.resolve(__dirname, 'src/routes'),
      store: path.resolve(__dirname, 'src/store'),
      styles: path.resolve(__dirname, 'src/styles'),
      assets: path.resolve(__dirname, 'src/assets'),
      static: path.resolve(__dirname, 'src/static'),
      plugins: path.resolve(__dirname, 'src/plugins')
    }
  },
  plugins: [
    vue(),
    prismjs({
      languages: ['json', 'javascript', 'java', 'html', 'css', 'xml', 'typescript'],
    }),
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver()],
    }),
  ],
  optimizeDeps: {
    include: ['@kangc/v-md-editor/lib/theme/vuepress.js']
  }
})