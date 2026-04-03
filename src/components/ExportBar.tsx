import React, { useRef } from 'react';
import styles from './ExportBar.module.css';

interface Props {
  fileName: string | null;
  onCargar: (file: File) => void;
  onExportar: () => void;
}

export const ExportBar: React.FC<Props> = ({ fileName, onCargar, onExportar }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onCargar(file);
  };

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <button className={styles.uploadBtn} onClick={() => inputRef.current?.click()}>
          📂 Cargar Excel existente
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx"
          style={{ display: 'none' }}
          onChange={handleChange}
        />
        {fileName && (
          <span className={styles.fileName}>{fileName}</span>
        )}
      </div>
      <button className={styles.btnSuccess} onClick={onExportar}>
        ⬇ Descargar Excel
      </button>
    </div>
  );
};
