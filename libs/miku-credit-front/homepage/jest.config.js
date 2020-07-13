module.exports = {
  name: 'miku-credit-front-homepage',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/miku-credit-front/homepage',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
