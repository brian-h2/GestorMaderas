import React from 'react';
import { Pieza } from '../types';
import styles from './PiezasTable.module.css';

interface Props {
  piezas: Pieza[];
  onEliminar: (id: string) => void;
}

const Check: React.FC<{ value: boolean }> = ({ value }) =>
  value
    ? <span className={styles.checkOn}>✔</span>
    : <span className={styles.checkOff}>—</span>;

export const PiezasTable: React.FC<Props> = ({ piezas, onEliminar }) => (
  <div className={styles.wrapper}>
    <div className={styles.header}>
      <span>Piezas del Pedido</span>
      <span className={styles.badge}>{piezas.length} pieza{piezas.length !== 1 ? 's' : ''}</span>
    </div>

    <div className={styles.scroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre Pieza</th>
            <th>Material</th>
            <th>Largo</th>
            <th>Ancho</th>
            <th>Cant.</th>
            <th>Veta</th>
            <th>L. Sup</th>
            <th>L. Inf</th>
            <th>Izq.</th>
            <th>Der.</th>
            <th>Notas</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {piezas.length === 0 ? (
            <tr>
              <td colSpan={13} className={styles.empty}>
                <span className={styles.emptyIcon}>📋</span>
                Todavía no hay piezas. Completá el formulario y hacé click en "Agregar Pieza".
              </td>
            </tr>
          ) : (
            piezas.map((p, i) => (
              <tr key={p.id}>
                <td className={styles.num}>{i + 1}</td>
                <td className={styles.bold}>{p.nombre}</td>
                <td>{p.material}</td>
                <td>{p.largo}</td>
                <td>{p.ancho}</td>
                <td>{p.cantidad}</td>
                <td>{p.veta}</td>
                <td><Check value={p.cantoLargoSup} /></td>
                <td><Check value={p.cantoLargoInf} /></td>
                <td><Check value={p.cantoIzq} /></td>
                <td><Check value={p.cantoDer} /></td>
                <td>{p.notas}</td>
                <td>
                  <button
                    className={styles.btnDelete}
                    onClick={() => onEliminar(p.id)}
                    title="Eliminar"
                  >🗑</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
