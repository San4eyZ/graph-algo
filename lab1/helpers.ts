export const letterToNumber = function (letter: string) {
    return letter.charCodeAt(0) - 96;
}
    
export const numberToLetter = function (number: number) { 
    return String.fromCharCode(number + 96);
}
