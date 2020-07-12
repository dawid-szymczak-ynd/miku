module.exports = {
  name: 'miku-credit-front',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/miku-credit-front',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
