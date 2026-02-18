"use client";

import { useEffect, useState} from "react";
import { useParams, useRouter } from "next/navigation";
import ProyectoForm from "../../components/ProyectoForm";

export default function EditarProyectoPage() {
    const {id} = useParams();
    const router = useRouter();
    const [proyecto, setProyecto] = useState<any>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:8080/api/proyectos/${id}`)
            .then((res) => res.json())
            .then((data) => setProyecto(data));
    }, [id]);

    if (!proyecto) return <p>Cargando</p>;

    return (
        <div className="page">
            <h1>Editar proyecto</h1>

            <ProyectoForm
                mode="editar"
                initialData={proyecto}
                onSuccess={() => {
                    alert("Proyecto actualizado exitosamente");
                    router.push("/proyectos");
                }}
            />
        </div>
    );
}