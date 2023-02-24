export interface Valoracion {
    id_valoracion: number;
    valoracion: string;
    puntos: number;
}

export const emptyValoracion = (): Valoracion => ({
    id_valoracion: 0,
    valoracion: "",
    puntos: 0
});