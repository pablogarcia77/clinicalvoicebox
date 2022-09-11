export interface Perceptual {
    g: number;
    r: number;
    b: number;
    a: number;
    s: number;
    i: number;
    rg: number;
    rr: number;
    rb: number;
    ra: number;
    rs: number;
    ri: number;
}

export const emptyPerceptual = (): Perceptual => ({
    g: 0,
    r: 0,
    b: 0,
    a: 0,
    s: 0,
    i: 0,
    rg: 0,
    rr: 0,
    rb: 0,
    ra: 0,
    rs: 0,
    ri: 0
});