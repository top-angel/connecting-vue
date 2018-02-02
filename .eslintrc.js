// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: ['prettier', 'prettier/standard', 'plugin:vue/recommended'],
  // required to lint *.vue files
  plugins: ['vue', 'prettier'],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'prettier/prettier': 'off',
    // don't require .vue extension when importing
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    'import/no-extraneous-dependencies': 'off',

    'vue/require-prop-types': 'off',
    'vue/html-indent': 'off',
    'vue/max-attributes-per-line': 'off',

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'arrow-body-style': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    'no-mixed-operators': 'off',
    'no-return-assign': 'off',
    'no-plusplus': 'off',
    'consistent-return': 'off'
  },

}
