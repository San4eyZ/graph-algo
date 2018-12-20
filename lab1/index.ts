import { getDirectoryContent, getFileContent, writeToFile, getOutDir } from './../helpers';
import * as path from 'path';
import * as lab1 from './make-path';
import { getTestDir } from '../helpers';

const inDir = getTestDir(1);
const outDir = getOutDir(1);
const files = getDirectoryContent(inDir);

for (const file of files) {
    const content = getFileContent(path.join(inDir, file));

    const [a, b] = content.replace(/\r\n/g, ' ').split(' ');

    writeToFile(path.join(outDir, file), lab1.findPath(a, b));
}
