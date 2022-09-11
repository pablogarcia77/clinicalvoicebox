export interface Piano {
    vocales: any[],
    glissandos: any[],
    notas: any[],
    valoracion: number | null
}

export const emptyPiano = (): Piano => ({
    vocales: [],
    glissandos: [],
    notas: [],
    valoracion: null
});