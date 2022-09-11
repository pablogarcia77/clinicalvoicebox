export interface Acustica {
    fo: number;
    jitter: number;
    db: number;
    shimmer: number;
    hn: number;
    cepstrum: number;
    dsi: number;
    software: string;
    avqi: number;
    f1: number;
    f2: number;
    f3: number;
    f4: number
}

export const emptyAcustica = (): Acustica => ({
    fo: 0,
    jitter: 0,
    db: 0,
    shimmer: 0,
    hn: 0,
    cepstrum: 0,
    dsi: 0,
    software: '',
    avqi: 0,
    f1: 0,
    f2: 0,
    f3: 0,
    f4: 0
});