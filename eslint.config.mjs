import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',  // Desactivar regla de variables no usadas
      '@typescript-eslint/no-unused-expressions': 'off'  // Desactivar regla de expresiones no usadas
    },
  },
];

export default eslintConfig;
