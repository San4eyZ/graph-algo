import { numberToLetter, letterToNumber } from './helpers';

function addPosition(col: number, row: number, moves: string[]) {
    if (col <= 8 && col > 0 && row <= 8 && row > 0) {
        moves.push(`${numberToLetter(col)}${row}`);
    }
}

function getUnsafePositions(pawnPosition: string) {
    const col = letterToNumber(pawnPosition[0]);
    const row = Number(pawnPosition[1]);

    const positions: string[] = [];

    addPosition(col + 1, row - 1, positions);
    addPosition(col - 1, row - 1, positions);

    return positions;
}

function getNextMoves(position: string) {
    const col = letterToNumber(position[0]);
    const row = Number(position[1]);

    const moves: string[] = [];

    addPosition(col + 1, row + 2, moves);
    addPosition(col - 1, row + 2, moves);
    addPosition(col - 2, row + 1, moves);
    addPosition(col - 2, row - 1, moves);
    addPosition(col - 1, row - 2, moves);
    addPosition(col + 1, row - 2, moves);
    addPosition(col + 2, row - 1, moves);
    addPosition(col + 2, row + 1, moves);

    return moves;
}

export function findPath(knightPosition: string, pawnPosition: string) {
    const visited: { [key in string]: boolean} = {};

    const queue: string[][] = [[knightPosition]];

    while (queue.length !== 0) {
        const currentPath = queue[0];
        queue.shift();
        const currentPosition = currentPath[currentPath.length - 1];

        if (currentPosition === pawnPosition) {
            return currentPath.join(' -> ');
        }

        const unsafePostions = getUnsafePositions(pawnPosition);

        getNextMoves(currentPosition).forEach(pos => {
            if (!visited[pos] && unsafePostions.indexOf(pos) < 0) {
                visited[pos] = true;
                queue.push([...currentPath, pos]);
            }
        })
    }

    return '';
}
