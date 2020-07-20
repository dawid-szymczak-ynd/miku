module.exports = {
  name: 'miku-credit-front-payback',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/miku-credit-front/payback',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
