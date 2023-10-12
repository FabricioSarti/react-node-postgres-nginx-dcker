import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import "./MainComponent.css"
const MainComponent = () => {

    const [values, setValues] = useState([])
    const [value, setValue] = useState("")

    const getAllNumbers = useCallback(async () => {
        //usar nginx para redireccionar correctamente
        const data = await axios.get('/api/values/values/all');
        setValues(data.data.rows.map(row => row.number));
    }, [])

    const saveNumbers = useCallback(async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            value
        })

        setValue('');
        getAllNumbers();

    }, [value, getAllNumbers])

    useEffect(() => {
        getAllNumbers();
    }, []);


    return (<div>
        <button onClick={getAllNumbers}>Obtener todos los numeros</button>
        <span className="title">Valores</span>
        <div className="values">
            {
                values.map((value) => <div className="value">{value}</div>)
            }
        </div>
        <form className="form" onSubmit={saveNumbers}>
            <label>Ingrese un valor: </label>
            <input value={value} onChange={((event) => { setValue(event.target.value) })} />
            <button>Ok</button>
        </form>
    </div>)
}

export default MainComponent;