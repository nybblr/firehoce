import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.js',
  moduleName: 'firehoce',
  dest: 'dist/index.js',
  plugins: [ babel({ runtimeHelpers: true }) ],
  external: [ 'react' ],
  exports: 'named',
  format: 'umd'
}
