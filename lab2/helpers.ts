export class Graph {
    constructor(public arr: number[]) {}

    public getAdjRange(v: number) {
        const start = this.arr[v - 1] - 1;
        const end = v !== this.arr[0] - 1 ? this.arr[v] - 1 : Infinity;

        return this.arr.slice(start, end);
    }

    public edge = (v: number, w: number) => {
        const arr = this.arr;
        const adjRange = this.getAdjRange(v);

        let weight: number = -1;

        adjRange.forEach((val, i) => {
            if (i % 2 === 0) {
                if (val === w) {
                    weight = adjRange[i + 1];
                }

                return;
            }
        });

        return new Edge(v, w, weight);
    };

    public get sortedEdges() {
        const visited: Record<string, boolean> = {};
        const edges: Edge[] = [];
        const vertexes = this.vertexes;

        for (let i = 0; i < vertexes.length; i++) {
            const vertex = vertexes[i];
            const adjRange = this.getAdjRange(vertex);

            for (let j = 0; j < adjRange.length; j++) {
                if (j % 2 === 0) {
                    const weight = adjRange[j + 1];

                    const edge = new Edge(vertex, adjRange[j], weight);
                    const edgeKey1 = `${adjRange[j]}${vertex}`;
                    const edgeKey2 = `${vertex}${adjRange[j]}`


                    if (visited[edgeKey1] || visited[edgeKey2]) {
                        continue;
                    }
                    
                    visited[edgeKey1] = true;
                    visited[edgeKey2] = true;

                    edges.push(edge);
                }
            }
        }

        return edges.sort(Edge.compareByWeight);
    }

    public get vertexes() {
        const vertexesCount = this.arr[0] - 2;
        const vertexesArray: number[] = []

        for (let i = 0; i < vertexesCount; i++) {
            vertexesArray.push(i + 1);
        }

        return vertexesArray;
    }
}

export class Edge {
    constructor(public start: number, public end: number, public weight: number) {}

    public static compareByWeight(e1: Edge, e2: Edge) {
        return e1.weight - e2.weight;
    }

    public isEqual(e: Edge) {
        return (this.start === e.start && this.end === e.end) || (this.start === e.end && this.end === e.start);
    }
}

export const edgeToAdjacencyList = (edges: Edge[]) => {
    const adjList: number[][] = [];

    for (const edge of edges) {
        const { start, end } = edge;
        const startIndex = start - 1;
        const endIndex = end - 1;

        adjList[startIndex] = adjList[startIndex] ? [...adjList[startIndex], end] : [end];
        adjList[endIndex] = adjList[endIndex] ? [...adjList[endIndex], start] : [start];
    }

    return adjList.map(vertexes => [...vertexes.sort((a, b) => a - b), 0]);
}