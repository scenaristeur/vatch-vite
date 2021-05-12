const { createVuePlugin } = require('vite-plugin-vue2')
const publicPath = process.env.NODE_ENV === 'production' ? '/vatch-vite/' : '/'
const base = process.env.NODE_ENV === 'production' ? '/vatch-vite/' : '/'

// https://vitejs.dev/config/

module.exports = {
  plugins: [createVuePlugin()],
  base: base,
  publicPath: publicPath,
  server: {
		port: 3001,
		strictPort: true
	}
};
