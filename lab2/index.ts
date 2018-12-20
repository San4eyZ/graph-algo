import { Graph, edgeToAdjacencyList } from './helpers';
import * as path from 'path';
import findMinimalCarcase from './carcase';
import { getTestDir, getOutDir, getDirectoryContent, writeToFile, getFileContent } from '../helpers';
import config from '../config';

const inDir = getTestDir(2);
const outDir = getOutDir(2);
const files = getDirectoryContent(inDir);

for (const file of files) {
    const content = getFileContent(path.join(inDir, file));

    const array = content
        .toString()
        .replace(/\n/g, ' ')
        .split(' ')
        .slice(1, -1)
        .map(Number);

    const graph = new Graph(array);

    const { carcase, weight } = findMinimalCarcase(graph);

    const list = edgeToAdjacencyList(carcase);
    let res = '';

    for (const line of list) {
        res = res + line.toString() + '\n';
    }

    writeToFile(path.join(outDir, file), res + weight);
}
