export interface ILineChart{
    name: string;
    series: ISeries[];
}

interface ISeries{
    value: number;
    name: string;
}

export interface DATA_API{
    version: string;
    autor: string;
    codigo: string;
    nombre: string;
    unidad_medida: string;
    serie: ISerie[];
}

interface ISerie{
    fecha: string;
    valor: number;
}