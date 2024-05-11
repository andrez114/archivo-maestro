import { ICiudad } from './ciudad';
export interface ICentro {
  id?: number;
  nomCentro: string;
  opcEstatus: number;
  fecActualiza?: string;
  selected?: boolean;
  ciudadId: number;
  ciudad?: ICiudad;
}
