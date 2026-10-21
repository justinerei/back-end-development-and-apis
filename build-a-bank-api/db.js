
import { readFile, writeFile } from 'fs/promises';

const DB_PATH = new URL('./accounts.json', import.meta.url);

export async function getAccounts() {
  const data = await readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

export async function saveAccounts(accounts) {
  const data = JSON.stringify(accounts, null, 2);
  await writeFile(DB_PATH, data);
}
