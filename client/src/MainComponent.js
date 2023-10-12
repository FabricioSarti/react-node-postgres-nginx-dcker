import axios from "axios";
import { useCallback } from "react";
const MainComponent = () => {

    const getAllNumbers = useCallback(() => {

    })

    return (<div>
        <button onClick={getAllNumbers()}>Obtener todos los numeros</button>
    </div>)
}

export default MainComponent;