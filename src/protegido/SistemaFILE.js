import React from 'react'
import { Outlet} from 'react-router-dom';

const SistemaFILE = () => {
  return (
    <div>
      <h1>SistemaFILE</h1>
      <Outlet /> {/* Donde se renderizarán las rutas secundarias */}
      Sistema para gestion de Files(Storage)...
    </div>
  )
}

export default SistemaFILE
