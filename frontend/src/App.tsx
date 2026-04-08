import React from 'react';
import { PiezaForm } from './components/PiezaForm';
import { PiezasTable } from './components/PiezasTable';
import { ExportBar } from './components/ExportBar';
import { Toast } from './components/Toast';
import { usePiezas } from './hooks/usePiezas';
import { useExport } from './hooks/useExport';
import { useToast } from './hooks/useToast';
import { Pieza, PiezaFormData } from './types';
import './App.css';

function App() {
  const { piezas, agregarPieza, eliminarPieza, editarPieza } = usePiezas();
  const { exportar, mensaje, status } = useExport();
  const { toast, showToast } = useToast();
  const [piezaEditando, setPiezaEditando] = React.useState<Pieza | null>(null);

  React.useEffect(() => {
    if (mensaje) {
      const type = status === 'success' ? 'success' : status === 'error' ? 'error' : 'info';
      showToast(mensaje, type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje, status]);

  const handleExportar = async () => {
    await exportar(piezas);
  };

  const handleEditarRequest = (pieza: Pieza) => {
    setPiezaEditando(pieza);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (data: PiezaFormData) => {
    if (piezaEditando) {
      editarPieza({ ...data, id: piezaEditando.id });
      setPiezaEditando(null);
    } else {
      agregarPieza(data);
    }
  };

  return (
    <>
      <header className="app-header">
        <div className="logo">🪵 Maderas <span>Caroya</span></div>
        <div className="header-subtitle">Sistema de Carga de Pedidos</div>
      </header>

      <main className="app-main">
        <h2 className="section-title">{piezaEditando ? 'Editar Pieza' : 'Nueva Pieza'}</h2>
        <PiezaForm
          piezaEditando={piezaEditando}
          onSubmit={handleFormSubmit}
          onCancelarEdicion={() => setPiezaEditando(null)}
          onToast={showToast}
        />

        <h2 className="section-title">Listado de Piezas</h2>
        <PiezasTable piezas={piezas} onEliminar={eliminarPieza} onEditar={handleEditarRequest} />



        <ExportBar onExportar={handleExportar} />
      </main>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </>
  );
}

export default App;
