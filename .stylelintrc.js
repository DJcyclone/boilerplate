module.exports = {
  extends: ['stylelint-config-standard'],
  customSyntax: 'postcss-styled-syntax',
  processors: [
    [
      'stylelint-processor-styled-components',
      {
        moduleName: '@emotion/styled',
      },
    ],
  ],
};
