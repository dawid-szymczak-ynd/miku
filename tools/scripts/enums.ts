export enum BranchName {
  MASTER = 'master',
}

export enum OperationName {
  E2E = 'e2e',
  FORMAT = 'format',
}

export const argsMapping = {
  tag: 'CIRCLE_SHA1',
  head: 'CIRCLE_SHA1',
  branch: 'CIRCLE_BRANCH',
  registry: 'IMAGE_BASE',
};

export type ArgsMapping = keyof typeof argsMapping;
