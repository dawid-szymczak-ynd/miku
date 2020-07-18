module.exports = {
  name: 'miku-credit-front-loan',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/miku-credit-front/loan',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
