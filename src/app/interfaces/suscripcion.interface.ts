export interface Suscripcion {
    fechaInicio: Date,
    fechaExpiracion?: Date,
    duracion: number,
    precioPlan: number,
    pago: number,
    mesesSinPago?: number,
    fechaExpiracionSinPago?: Date,
    estado: string,
    plan?: string[],
    nutriologo?: string[]
}
