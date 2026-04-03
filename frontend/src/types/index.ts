export interface Pieza {
  id: string;
  nombre: string;
  material: string;
  largo: string;
  ancho: string;
  cantidad: string;
  veta: string;
  cantoLargoSup: boolean;
  cantoLargoInf: boolean;
  cantoIzq: boolean;
  cantoDer: boolean;
  notas: string;
}

export type PiezaFormData = Omit<Pieza, 'id'>;

export const VETA_OPTIONS = ['', 'Largo', 'Ancho', 'Sin veta'] as const;
export type VetaOption = typeof VETA_OPTIONS[number];
