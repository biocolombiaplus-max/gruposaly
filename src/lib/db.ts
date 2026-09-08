import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureFile(fileName: string, exampleFileName: string) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    await fs.access(filePath);
  } catch {
    const examplePath = path.join(DATA_DIR, exampleFileName);
    const seed = await fs.readFile(examplePath, "utf-8").catch(() => "[]");
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(filePath, seed, "utf-8");
  }
  return filePath;
}

export async function readJson<T>(
  fileName: string,
  exampleFileName: string,
  fallback: T
): Promise<T> {
  const filePath = await ensureFile(fileName, exampleFileName);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// Simple in-process write queue so concurrent admin writes never interleave
// and corrupt the JSON file.
const writeQueues = new Map<string, Promise<void>>();

export async function writeJson<T>(fileName: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, fileName);
  const previous = writeQueues.get(fileName) ?? Promise.resolve();
  const next = previous
    .catch(() => undefined)
    .then(async () => {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    });
  writeQueues.set(fileName, next);
  return next;
}
