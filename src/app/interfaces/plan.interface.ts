export interface Plan{
 
    nombre: string;
    precio: number;
    precioOld: number;
    suscripciones: string[];
    servicios: string[];
    duracion:number;
    active:boolean;
    mesesSinPago:number;
}