import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    plugins: [glsl()],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // or "modern", "legacy"
                importers: [
                    // ...
                ],
            },
        },
    },
    build: {
        assetsDir: 'assets', // Organizes assets in a specific folder in the build output
    },
    base: '', // Use relative paths to ensure the app works in preview and deploys correctly
});
