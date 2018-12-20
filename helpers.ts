import * as fs from 'fs';
import * as path from 'path';
import config from './config';

export const getDirectoryContent = (dir: string) => {
    return fs.readdirSync(dir);
}

export const getFileContent = (path: string) => {
    return fs.readFileSync(path).toString();
}

export const writeToFile = (path: string, content: string) => {
    return fs.writeFileSync(path, content);
}

export const getTestDir = (n: number) => {
    return path.join(config.inputPath, String(n));
}

export const getOutDir = (n: number) => {
    return path.join(config.outputPath, String(n));
}