import { OperationName } from './enums';
import { execAsync, getArgs, getBase, getEnvs, runner } from './helpers';

export async function affectedOperation(): Promise<void> {
  const { tag, branch, head } = getEnvs(['tag', 'branch', 'head']);
  const { type } = getArgs(['type']);
  const base = getBase(branch, head);
  const e2eKey = type === OperationName.E2E ? `--key=${tag}` : '';
  const command =
    type !== OperationName.FORMAT
      ? `npm run affected:${type} -- --base=${base} --head=${head} ${e2eKey}`
      : `npm run format:check -- --base=${base} --head=${head}`;

  return execAsync(command).then(() => {
    console.log(`${command} executed correctly`);
  });
}

runner('affectedOperation', affectedOperation).then(() => 0);
