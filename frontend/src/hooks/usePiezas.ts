import { useState, useCallback } from 'react';
import { Pieza, PiezaFormData } from '../types';

const generateId = () => Math.random().toString(36).slice(2, 9);

export function usePiezas() {
  const [piezas, setPiezas] = useState<Pieza[]>([]);

  const agregarPieza = useCallback((data: PiezaFormData) => {
    setPiezas(prev => [...prev, { ...data, id: generateId() }]);
  }, []);

  const eliminarPieza = useCallback((id: string) => {
    setPiezas(prev => prev.filter(p => p.id !== id));
  }, []);
  
  const editarPieza = useCallback((pieza: Pieza) => {
    setPiezas(prev => prev.map(p => p.id === pieza.id ? pieza : p));
  }, []);

  const limpiarPiezas = useCallback(() => setPiezas([]), []);

  return { piezas, agregarPieza, eliminarPieza, editarPieza, limpiarPiezas };
}
