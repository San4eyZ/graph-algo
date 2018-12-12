import { Graph, edgeToAdjacencyList } from './helpers';
import * as fs from 'fs';
import * as path from 'path';
import config from '../config';
import findMinimalCarcase from './carcase';

const file = fs.readFileSync(path.join(config.inputPath, '2.txt'));

const array = file
    .toString()
    .replace(/\n/g, ' ')
    .split(' ')
    .slice(1, -1)
    .map(Number);

const graph = new Graph(array);

console.log(edgeToAdjacencyList(findMinimalCarcase(graph)));
