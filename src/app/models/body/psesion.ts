export interface PSesion {
    paciente: number;
    sesion: number;
}

export const emptyPSesion = (): PSesion => ({
    paciente: 0,
    sesion: 0,
});