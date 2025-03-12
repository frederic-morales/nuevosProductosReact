export interface EtapaPrueba {
  id: number;
  productoId: number;
  nombre: string;
  descripcion: string;
  usuario: number;
  fechaCreacion: string;
  tiempoEstimado: string;
  fechaInicio: string;
  estado: number;
}

export interface Etapa {
  EtapaId?: number;
  Nombre?: string;
  Descripcion?: string;
  FechaCreacion?: Date;
  TiempoEstimado?: number;
}
