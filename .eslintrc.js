module.exports = {
  'env': {
    'es6': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'sourceType': 'script',
    // "sourceType": "module",
    'ecmaVersion': 7
  },
  'parser': 'babel-eslint',
  'rules': {
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    'comma-dangle': [2, 'never'],
    // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
    'array-bracket-spacing': [2, 'never'],
    'indent': ['error', 2],
    'no-unused-vars': 'error',
    'no-use-before-define': 'error',
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'curly': ['error', 'all'],
    'default-case': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-implicit-coercion': 'error',
    'no-invalid-this': 'error',
    'no-loop-func': 'error',
    'no-multi-spaces': 'error',
    'no-new-func': 'error',
    'no-useless-return': 'error',
    'global-require': 'error',
    'no-path-concat': 'error',
    'no-sync': 'error',
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs'],
    'camelcase': 0,
    // 'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'comma-style': ['error', 'last'],
    'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
    'lines-around-comment': ['error', { 'beforeBlockComment': true }],
    'newline-after-var': ['error', 'always'],
    'newline-before-return': 0,
    'no-multi-assign': 'error',
    'max-params': [1, 3],
    'new-cap': [
      'error',
      {
        'newIsCap': true,
        'capIsNew': false
      }
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 2
      }
    ],
    'no-shadow-restricted-names': 'error',
    'no-undef-init': 'error',
    'keyword-spacing': 'error',
    'space-before-blocks': ['error', 'always']
  }
};
