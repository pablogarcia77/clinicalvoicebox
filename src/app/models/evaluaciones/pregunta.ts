export interface Pregunta {
    id_pregunta: number,
    pregunta: string,
}

export const emptyPregunta = (): Pregunta => ({
    id_pregunta: 0,
    pregunta: "",
});