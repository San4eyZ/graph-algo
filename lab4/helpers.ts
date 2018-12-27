export const range = (n: number) => {
    return Array.apply(null, { length: n }).map(Number.call, Number) as number[];
};

export const buildMatrix = (k: number, l: number, array: number[]) => {
    const X = range(k).map((x) => x + 1);
    const Y = range(l).map((x) => x + k + 1);

    const length = k + l + 2;
    const matrix: number[][] = [];

    for (let i = 0; i < length; i++) {
        matrix.push(range(length).map(() => 0));
    }

    const graph = new Graph(array);

    for (const x of X) {
        matrix[0][x] = 1;

        const adjRange = graph.getAdjRange(x);

        for (const a of adjRange) {
            matrix[x][a + k] = 1;
        }
    }

    for (const y of Y) {
        matrix[y][length - 1] = 1;
    }

    return matrix;
};

export class Graph {
    constructor(public arr: number[]) {}

    public getAdjRange(v: number) {
        if (this.arr[v - 1] === 0) {
            return [];
        }

        const start = this.arr[v - 1] - 1;
        const end =
            v !== this.arr[0] - 1 ? (this.arr[v] === 0 ? this.arr.filter(Boolean)[v] - 1 : this.arr[v] - 1) : Infinity;

        return this.arr.slice(start, end);
    }
}
