import React from 'react';
import styles from './ExportBar.module.css';

interface Props {
  onExportar: () => void;
}

export const ExportBar: React.FC<Props> = ({ onExportar }) => {
  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        {/* Espacio reservado si se quiere poner algo a la izquierda luego */}
      </div>
      <button className={styles.btnSuccess} onClick={onExportar}>
        ⬇ Descargar Excel
      </button>
    </div>
  );
};
