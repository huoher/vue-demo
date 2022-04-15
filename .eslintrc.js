module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/base',
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-strongly-recommended',
        // 'plugin:vue/vue3-recommended'
    ],
    rules: {
        "vue/html-self-closing": ["off"],
        'camelcase': 'off',
        'semi': 0,
        'no-console': 'off',
        'no-debugger': 'off',
        'no-unused-vars': 'warn',
        'comma-dangle': ['error', 'only-multiline']
    }
}
