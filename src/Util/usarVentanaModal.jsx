import { useState } from "react";

function usarVentanaModal() {
    const [abierto, setAbierto] = useState(false);
    const [tipoVentanaModal, setTipoVentanaModal] = useState(null);

    function cambiarEstado(tipo) {
        setAbierto(!abierto);
        setTipoVentanaModal(tipo);
    }

    return { abierto, cambiarEstado, tipoVentanaModal };
}

export default usarVentanaModal;
