import { Graph, nextAdd } from './helpers';

const findPath = (start: number, end: number, graph: Graph) => {
    const S: number[] = [start];
    const D: Record<number, number> = { [start]: Infinity };
    const previous: Record<number, number> = { [start]: 0 };
    let F: number[] = graph.vertexes.filter((v) => v !== start);   

    for (const v of F) {
        D[v] = graph.weight(start, v);
        previous[v] = start;
    }

    while (F.length > 0) {
        const w = nextAdd({ F, graph, D, S });
        F = F.filter((v) => v !== w);
        S.push(w);

        for (const v of F) {
            if (Math.min(D[w], graph.weight(w, v)) > D[v]) {
                D[v] = Math.min(D[w], graph.weight(w, v));
                previous[v] = w;
            }
        }
    }

    if (D[end] === -Infinity) {
        return;
    }

    const path = [end];
    let currentVertex = end;

    while (currentVertex !== start) {
        currentVertex = previous[currentVertex];
        path.push(currentVertex);
    }

    return { path: path.reverse(), weight: D[end] };
};

export default findPath;
