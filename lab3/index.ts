import { Graph } from './helpers';
import * as path from 'path';
import findPath from './find-path';
import { getTestDir, getOutDir, getDirectoryContent, getFileContent, writeToFile } from '../helpers';

const inDir = getTestDir(3);
const outDir = getOutDir(3);
const files = getDirectoryContent(inDir);

for (const file of files) {
    const content = getFileContent(path.join(inDir, file));

    const lines = content.toString().split(/\r\n/).slice(0, -1);

    const array = lines.slice(1, -2).map((prev) => prev.split(/\s+/).map(Number));
    const start = Number(lines[lines.length - 2]);
    const end = Number(lines[lines.length - 1]);

    const graph = new Graph(array);

    const { path: res, weight } = findPath(start, end, graph);

    if (!res) {
        writeToFile(path.join(outDir, file), 'NO');

        continue;
    }

    writeToFile(path.join(outDir, file), 'YES' + '\n' + res.join(' ') + '\n' + weight);
}
