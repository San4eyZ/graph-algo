interface NewWeightParams {
    w: number;
    S: number[];
    D: Record<number, number>;
    graph: Graph;
}

export const newWeight = (params: NewWeightParams) => {
    const { w, S, D, graph } = params;
    
    return Math.max(...S.map((v) => Math.min(D[v], graph.weight(v, w))));
};

interface NextAddParams {
    F: number[];
    S: number[];
    D: Record<number, number>;
    graph: Graph;
}

export const nextAdd = (params: NextAddParams) => {
    const { F, ...newParams } = params;

    let target: number;
    let maxWeight: number = -Infinity;

    F.forEach((w) => {
        const weight = newWeight({ w, ...newParams });

        if (weight > maxWeight) {
            maxWeight = weight;
            target = w;
        }
    });

    return target;
};

export class Graph {
    constructor(public arr: number[][]) {}

    public weight = (v: number, w: number) => {
        const prev = this.arr[w - 1];
        return prev.find((val, i) => i % 2 === 1 && prev[i - 1] === v) || -Infinity;
    };

    public adjVertexes = (v: number) => {
        const next: number[] = [];

        for (let i = 0; i < this.arr.length; i++) {
            const prevs = this.arr[i];
            for (let j = 0; j < prevs.length; j++) {
                if (j % 2 === 0 && prevs[j] === v) {
                    next.push(i + 1);
                    break;
                }
            }
        }

        return next;
    };

    public get vertexes() {
        return this.arr.map((val, i) => i + 1);
    }
}
