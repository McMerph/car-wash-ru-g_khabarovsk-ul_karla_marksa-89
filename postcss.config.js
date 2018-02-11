const path = require('path');

module.exports = {
    parser: 'postcss-scss',
    plugins: {
        'postcss-import': {
            plugins: [
                require('stylelint')({})
            ]
        },
        'postcss-custom-properties': {},
        'postcss-apply': {},
        'postcss-nested': {},
        'autoprefixer': {},
        'cssnano': {},
        'postcss-reporter': {}
    }
};
