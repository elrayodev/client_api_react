import React, { useEffect, useState } from 'react';
import './tabla.css';
import Tarea from './tarea';
import FormTarea from './formTarea';

const TareasListHook = () => {
    const [tareas, setTareas] = useState([]); //useState asignamos estados
    const [showForm, setShowForm] = useState(false);

    useEffect(() => { //useEffect realizar accion cuando cambia estado
        const fetchTareas = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API);
                return response.json();
            } catch (err) {
                console.log(err);
            }
        }
        fetchTareas().then(res => setTareas(res.data));
    }, []); //Arreglo vacio, solo se carga una vez 

    const deleteTarea = async (idx) => {
        try {
            await fetch(`${process.env.REACT_APP_API}/${tareas[idx].id}`, {
                method: 'DELETE'
            });
            setTareas(tareas.filter((val, i) => i !== idx));
        } catch (err) {
            console.log(err);
        }

    }

    const createTarea = (data) => {
        try {
            let nuevoId = 1
            if (tareas.length > 0) {
                nuevoId = tareas.reduce((acc, curr) => parseInt(acc.id) > parseInt(curr.id) ? acc : curr);
                nuevoId = (parseInt(nuevoId.id) + 1).toString();
            }
            data = { ...data, id: nuevoId };
            fetch(process.env.REACT_APP_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(response => response.json()).then(dataResponse => {
                setTareas([...tareas, dataResponse.data]);
                setShowForm(false);
            });
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <button className="new-btn" onClick={() => setShowForm(!showForm)}>{showForm ? "Cerrar" : "Nueva tarea"}</button>
            {showForm && <FormTarea onClickFn={createTarea} btnTxt={"A??adir Tarea"}></FormTarea>}
            <div className="grid-container">
                {tareas.map((tarea, idx) => {
                    return (
                        <Tarea key={idx} tarea={tarea} onClickFn={deleteTarea} idx={idx} btnTxt={"Eliminar"} />
                    );
                })}
            </div>
        </>
    )
}

export default TareasListHook