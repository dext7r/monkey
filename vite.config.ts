import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'
import pkg from './package.json'
// https://vitejs.dev/config/
const { author, name, version } = pkg
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/index.ts',
      userscript: {
        icon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-32x32.png',
        namespace: 'http://github.com/dext7r/monkey',
        name: `${name}-掘金签到助手`,
        description: '自动签到掘金，领取奖励',
        author,
        grant: 'none',
        version,
        noframes: true,
        license: 'MIT',
        match: ['https://juejin.cn/*'],
      },
    }),
  ],
})
