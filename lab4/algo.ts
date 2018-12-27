import { range } from './helpers';

interface Params {
    A: number[][];
    V: number[];
    s: number;
    t: number;
}

export const findFlow = (params: Params) => {
    const { A, V, s, t } = params;
    let choice = {};
    let Previous = { [s]: null };
    let h = {};

    const F: number[][] = [];

    for (let i = 0; i < A.length; i++) {
        F.push(range(A.length).map(() => 0));
    }

    const labeling = () => {
        const queue = [s];
        choice = {};
        Previous = { [s]: null };
        h = {};

        for (const v of V) {
            h[v] = Infinity;
        }

        while (h[t] === Infinity && queue.length !== 0) {
            const w = queue.shift();

            for (const v of V) {
                if (h[v] === Infinity && A[w - 1][v - 1] - F[w - 1][v - 1] > 0) {
                    h[v] = Math.min(h[w], A[w - 1][v - 1] - F[w - 1][v - 1]);
                    Previous[v] = w;
                    queue.push(v);
                    choice[v] = 1;
                }
            }

            for (const v of V.filter((x) => x !== s)) {
                if (h[v] === Infinity && F[v - 1][w - 1] > 0) {
                    h[v] = Math.min(h[w], F[v - 1][w - 1]);
                    queue.push(v);
                    Previous[v] = w;
                    choice[v] = -1;
                }
            }
        }
    };

    let f = 0;

    const fulkerson = () => {
        do {
            labeling();
            if (h[t] < Infinity) {
                f += h[t];

                let v = t;

                while (Previous[v] !== null) {
                    let w = Previous[v];

                    if (choice[v] === 1) {
                        F[w - 1][v - 1] += h[t];
                    } else {
                        F[v - 1][w - 1] -= h[t];
                    }

                    v = w;
                }
            }
        } while (h[t] !== Infinity);
    };

    fulkerson();

    return F;
};
