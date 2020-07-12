import { exec } from 'child_process';
import * as minimist from 'minimist';

import { ArgsMapping, argsMapping, BranchName } from './enums';

export interface AppsObject {
  affectedApps: string[];
  unaffectedApps: string[];
}

export function execAsync(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      console.log(stdout);

      if (error) {
        console.error(stderr);

        reject(error);

        return;
      }

      resolve(stdout);
    });
  });
}

export async function getApps(base: string, head: string): Promise<AppsObject> {
  let affectedApps: string[];
  let allApps: string[];

  try {
    affectedApps = affectedAppsFormatter(await execAsync(`npm run affected:apps -- --base=${base} --head=${head}`));
    allApps = affectedAppsFormatter(await execAsync(`npm run affected:apps:all`));
  } catch (e) {
    throw e;
  }

  const unaffectedApps = allApps.filter((appName: string) => !affectedApps.includes(appName));

  return {
    affectedApps,
    unaffectedApps,
  };
}

function affectedAppsFormatter(output: string): string[] {
  const fixedOutputIndex = 4;

  return output
    .split('\n')
    [fixedOutputIndex].split(' ')
    .filter(appName => appName !== '');
}

export function getEnvs<T extends ArgsMapping>(keys: T[]): { [K in T]?: string } {
  const envsObject: { [K in T]?: string } = {};

  keys.forEach(key => {
    if (!process.env[argsMapping[key]]) {
      throw new Error(`${argsMapping[key]} is not found in current environment.`);
    }

    envsObject[key] = process.env[argsMapping[key]];
  });

  return envsObject;
}

export function getArgs<T extends string>(keys: T[]): { [K in T]?: string } {
  const args = minimist(process.argv);
  const argsObject: { [K in T]?: string } = {};

  keys.forEach(key => {
    if (!args[key]) {
      throw new Error(`${key.toUpperCase()} is required.`);
    }

    argsObject[key] = args[key];
  });

  return argsObject;
}

export function getBase(branch: string, head: string): string {
  return branch === BranchName.MASTER ? `${head}~1` : 'remotes/origin/master';
}

export async function returnApps(customBase?: string): Promise<AppsObject> {
  const { branch, head } = getEnvs(['branch', 'head']);
  const base = customBase ?? getBase(branch, head);

  return await getApps(base, head);
}

export function runner<T>(scriptName: string, script: () => Promise<T>): Promise<void> {
  return script()
    .then(() => console.log(`${scriptName} done!`))
    .catch((err: Error) => {
      console.log(`${scriptName} failed! Error occurred:`);
      console.error(`Message: ${err.message}`);
      console.error(`Stack: ${err.stack}`);

      process.exitCode = 1;
    });
}
