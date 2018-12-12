interface MergeParams {
    p: number;
    q: number;
    v: number;
    w: number;
    next: number[]
    name: number[]
    size: number[]
}

export default function merge(params: MergeParams) {
    const { p, q, v, w, next, name, size } = params;

    name[w] = p;
    let u = next[w];

    while(name[u] !== p) {
        name[u] = p;
        u = next[u];
    }

    size[p] = size[p] + size[q];
    const x = next[v];
    const y = next[w];
    next[v] = y;
    next[w] = x;
}