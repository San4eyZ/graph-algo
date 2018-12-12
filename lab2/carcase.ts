import { Graph, Edge } from './helpers';
import merge from './merge';

export default function findMinimalCarcase(g: Graph) {
    const name: number[] = [];
    const next: number[] = [];
    const size: number[] = [];

    const vertexes = g.vertexes;
    const queue = g.sortedEdges;
    const T: Edge[] = [];

    for (const v of vertexes) {
        name[v] = v;
        next[v] = v;
        size[v] = 1;
    }

    while (T.length !== vertexes.length - 1) {
        const edge = queue.shift();
        const v = edge.start;
        const w = edge.end;
        let p = name[v];
        let q = name[w];

        if (p !== q) {
            if (size[p] > size[q]) {
                merge({ v, w, p, q, name, next, size });
            } else {
                merge({ v: w, w: v, p: q, q: p, next, name, size });
            }

            T.push(edge);
        }
    }

    return T;
}