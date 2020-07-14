module.exports = {
  name: 'miku-credit-front-sell-soul',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/miku-credit-front/sell-soul',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
