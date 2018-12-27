import * as path from 'path';
import { getTestDir, getOutDir, getDirectoryContent, getFileContent, writeToFile } from '../helpers';
import { buildMatrix, range } from './helpers';
import { findFlow } from './algo';

const inDir = getTestDir(4);
const outDir = getOutDir(4);
const files = getDirectoryContent(inDir);

for (const file of files) {
    const content = getFileContent(path.join(inDir, file));

    const lines = content
        .toString()
        .split(/\r\n/)
        .slice(0, -1);

    const [k, l] = lines[0].split(/\s+/).map(Number);

    const array = lines
        .slice(2)
        .join(' ')
        .split(/\s+/)
        .slice(0, -1)
        .map(Number);

    const A = buildMatrix(k, l, array);
    const V = range(k + l + 2).map((x) => x + 1);

    const flow = findFlow({
        A,
        V,
        s: 1,
        t: k + l + 2,
    });

    const result = flow.slice(1, -1).map(([a, ...arr]) => arr.slice(0, -1));

    const xPara = range(k).map(() => 0);

    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[0].length; j++) {
            if (result[i][j] === 1) {
                xPara[i] = j + 1 - k;
            }
        }
    }

    writeToFile(path.join(outDir, file), xPara.toString())
}
