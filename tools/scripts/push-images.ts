import { execSync } from 'child_process';

import { execAsync, getEnvs, returnApps, runner } from './helpers';
import { AppName, imagesNames } from './images-names';

export async function pushImagesScript(): Promise<void[]> {
  const { registry, tag } = getEnvs(['registry', 'tag']);
  const apps = await returnApps();
  const execPromisesArray: Promise<void>[] = [];

  apps.affectedApps.forEach((appName: AppName) => {
    execPromisesArray.push(
      execAsync(`docker build  -f ./apps/${appName}/Dockerfile -t ${registry}/${imagesNames[appName]}:${tag} .`).then(
        () => {
          execSync(`docker push ${registry}/${imagesNames[appName]}:${tag}`, {
            stdio: [process.stdin, process.stdout, process.stderr],
          });
        }
      )
    );
  });

  return Promise.all(execPromisesArray);
}

runner('PushImages', pushImagesScript).then(() => 0);
