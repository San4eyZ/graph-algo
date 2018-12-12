import { Graph } from './helpers';
import * as fs from 'fs';
import * as path from 'path';
import config from '../config';
import findPath from './find-path';

const file = fs.readFileSync(path.join(config.inputPath, '3.txt'));

const lines = file.toString().split(/\n/);

const array = lines.slice(1, -2).map((prev) => prev.split(' ').map(Number));
const start = Number(lines[lines.length - 2])
const end = Number(lines[lines.length - 1])

const graph = new Graph(array);

console.log(findPath(start, end, graph));
