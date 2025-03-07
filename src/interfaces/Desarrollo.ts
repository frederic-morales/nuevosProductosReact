export interface Desarrollo {
  id: number;
  estado: number;
  nombreProducto: string;
  descripcion: string;
  rechazos: number;
  fechaInicio?: Date | null;
  fechaFinal?: Date | null;
  tiempoEstimado: number;
  tiempoTotal: number;
}
