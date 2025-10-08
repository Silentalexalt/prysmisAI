import { defineConfig } from 'vite'

export default defineConfig({
root: '.',
build: {
outDir: 'dist',
assetsDir: 'assets',
rollupOptions: {
input: {
main: './index.html',
chatarea: './chatarea.html',
docs: './docs.html'
}
}
},
server: {
port: 3000
}
})
