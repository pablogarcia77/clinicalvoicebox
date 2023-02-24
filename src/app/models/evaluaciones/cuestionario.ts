import { Pregunta } from "./pregunta";

export interface Cuestionario {
    titulo: string,
    id_titulo: number,
    autor: string,
    id_tipo_test: number,
    preguntas: Pregunta[],
}

export const emptyCuestionario = (): Cuestionario => ({
    titulo: "",
    id_titulo: 0,
    autor: "",
    id_tipo_test: 0,
    preguntas: [],
});