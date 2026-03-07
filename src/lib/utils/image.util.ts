export enum SomaImageSize {
    SMALL = "small",
    LARGE = "large"
}

export function getImage(fileName: string, size: SomaImageSize): string {
    return `https://soma.skaba.dev/images/${size}_${fileName}`;
}