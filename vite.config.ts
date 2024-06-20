import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react-swc"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tsconfigPaths(),
		react(),
	],
	server: {
		port: 3000,
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./src/test-setup.ts"],
	},
})
