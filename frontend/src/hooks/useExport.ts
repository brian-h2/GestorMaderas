import { useState, useCallback } from 'react';
import { Pieza } from '../types';

const BACKEND = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:5055/insertar';

export type ExportStatus = 'idle' | 'loading' | 'success' | 'error';

export function useExport() {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [status, setStatus] = useState<ExportStatus>('idle');
  const [mensaje, setMensaje] = useState('');

  const cargarArchivo = useCallback((file: File) => {
    setArchivo(file);
    setMensaje(`📂 ${file.name} cargado`);
    setStatus('idle');
  }, []);

  const exportar = useCallback(async (piezas: Pieza[]) => {
    if (!archivo) {
      setMensaje('⚠ Cargá primero el Excel original.');
      setStatus('error');
      return;
    }
    if (piezas.length === 0) {
      setMensaje('⚠ No hay piezas para exportar.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMensaje('⏳ Procesando...');

    const filasBackend = piezas.map(p => ({
      nombre: p.nombre,
      material: p.material,
      largo: p.largo,
      ancho: p.ancho,
      cantidad: p.cantidad || '1',
      veta: p.veta,
      canto_largo_sup: p.cantoLargoSup ? 'Sí' : '',
      canto_largo_inf: p.cantoLargoInf ? 'Sí' : '',
      canto_izq: p.cantoIzq ? 'Sí' : '',
      canto_der: p.cantoDer ? 'Sí' : '',
      notas: p.notas,
    }));

    const formData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    formData.append('filas', JSON.stringify(filasBackend));

    try {
      const resp = await fetch(BACKEND, { method: 'POST', body: formData });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = archivo.name;
      a.click();
      URL.revokeObjectURL(url);

      setStatus('success');
      setMensaje(`✔ Descargado: ${archivo.name}`);
    } catch (err) {
      setStatus('error');
      setMensaje('❌ No se pudo conectar al servidor.');
      console.error(err);
    }
  }, [archivo]);

  return { archivo, cargarArchivo, exportar, status, mensaje };
}
