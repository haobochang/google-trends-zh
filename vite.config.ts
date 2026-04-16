import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'google-trends-zh'
const base = process.env.GITHUB_ACTIONS ? `/${repoName}/` : '/'

export default defineConfig({
  base,
  plugins: [react()],
})
