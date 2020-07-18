module.exports = {
  name: 'miku-credit-front-user',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/miku-credit-front/user',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
