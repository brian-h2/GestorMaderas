import React, { useState, useCallback, useEffect } from 'react';
import { Pieza, PiezaFormData, VETA_OPTIONS } from '../types';
import styles from './PiezaForm.module.css';

const EMPTY: PiezaFormData = {
  nombre: '', material: '', largo: '', ancho: '',
  cantidad: '', veta: '',
  cantoLargoSup: false, cantoLargoInf: false,
  cantoIzq: false, cantoDer: false,
  notas: '',
};

interface Props {
  piezaEditando?: Pieza | null;
  onSubmit: (data: PiezaFormData) => void;
  onCancelarEdicion?: () => void;
  onToast: (msg: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
}

export const PiezaForm: React.FC<Props> = ({ piezaEditando, onSubmit, onCancelarEdicion, onToast }) => {
  const [form, setForm] = useState<PiezaFormData>(EMPTY);

  const set = useCallback(<K extends keyof PiezaFormData>(key: K, value: PiezaFormData[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    if (piezaEditando) {
      const { id, ...data } = piezaEditando;
      setForm(data);
    } else {
      setForm(EMPTY);
    }
  }, [piezaEditando]);

  const limpiar = useCallback(() => {
    setForm(EMPTY);
    if (onCancelarEdicion) onCancelarEdicion();
  }, [onCancelarEdicion]);

  const agregar = useCallback(() => {
    if (!form.nombre.trim()) {
      onToast('⚠ Ingresá al menos el nombre de la pieza.', 'warning');
      return;
    }
    onSubmit(form);
    onToast(piezaEditando ? '✔ Pieza editada correctamente' : '✔ Pieza agregada correctamente', 'success');
    if (!piezaEditando) {
      limpiar();
    }
  }, [form, onSubmit, onToast, limpiar, piezaEditando]);

  // Ctrl+Enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) agregar();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [agregar]);

  return (
    <div className={styles.card}>
      <div className={styles.grid}>
        <div className={`${styles.field} ${styles.span2}`}>
          <label>Nombre de la Pieza</label>
          <input
            type="text"
            placeholder="Ej: Tapa lateral izquierda"
            value={form.nombre}
            onChange={e => set('nombre', e.target.value)}
            autoFocus
          />
        </div>

        <div className={`${styles.field} ${styles.span2}`}>
          <label>Material</label>
          <input
            type="text"
            placeholder="Ej: MDF 18mm, Melamina blanca..."
            value={form.material}
            onChange={e => set('material', e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Cantidad</label>
          <input
            type="number"
            placeholder="1"
            min={1}
            value={form.cantidad}
            onChange={e => set('cantidad', e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Largo (mm)</label>
          <input
            type="number"
            placeholder="0"
            value={form.largo}
            onChange={e => set('largo', e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Ancho (mm)</label>
          <input
            type="number"
            placeholder="0"
            value={form.ancho}
            onChange={e => set('ancho', e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Veta</label>
          <select value={form.veta} onChange={e => set('veta', e.target.value)}>
            {VETA_OPTIONS.map(o => (
              <option key={o} value={o}>{o || '—'}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>Notas</label>
          <input
            type="text"
            placeholder="Observaciones..."
            value={form.notas}
            onChange={e => set('notas', e.target.value)}
          />
        </div>

        {/* Canto */}
        <div className={styles.cantoGroup}>
          <span className={styles.cantoLabel}>✂ Canto</span>
          <div className={styles.cantoGrid}>
            {([
              ['cantoLargoSup', 'Largo superior'],
              ['cantoLargoInf', 'Largo inferior'],
              ['cantoIzq',      'Izquierdo'],
              ['cantoDer',      'Derecho'],
            ] as [keyof PiezaFormData, string][]).map(([key, label]) => (
              <label key={key} className={styles.checkLabel}>
                <input
                  type="checkbox"
                  checked={form[key] as boolean}
                  onChange={e => set(key, e.target.checked)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.btnSecondary} onClick={limpiar}>
          {piezaEditando ? '✖ Cancelar Edición' : '↺ Limpiar'}
        </button>
        <button className={styles.btnPrimary} onClick={agregar}>
          {piezaEditando ? '💾 Guardar Cambios' : '+ Agregar Pieza'}
        </button>
      </div>
    </div>
  );
};
