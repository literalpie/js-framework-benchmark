import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'es',
  },
  plugins: [
    terser({
      parse: {
        ecma: 8,
      },
      compress: {
        ecma: 5,
        inline: true,
        reduce_funcs: false,
        passes: 5,
        comparisons: false,
      },
      output: {
        ecma: 5,
        comments: false,
      },
      toplevel: true,
      module: true,
    })
  ],
};
