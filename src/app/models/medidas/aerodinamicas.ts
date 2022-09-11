export interface Aerodinamica {
    tms: number;
    tmf: number
}

export const emptyAerodinamica = (): Aerodinamica => ({
    tms: 0,
    tmf: 0
});