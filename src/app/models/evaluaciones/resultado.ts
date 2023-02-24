import { emptyValoracion, Valoracion } from "./valoracion";

export interface Resultado {
    id_pregunta: number;
    valoracion: Valoracion;
}

export const emptyResultado = (): Resultado => ({
    id_pregunta: 0,
    valoracion: emptyValoracion()
});