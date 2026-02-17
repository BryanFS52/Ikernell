"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ErrorProyectoForm from "../../components/ErrorProyectoForm";
import { ErrorProyecto } from "@/types/errorProyecto";

export default function EditarErrorProyectoPage() {
    const { id } = useParams<{ id: string }>();
    const [errorData, setErrorData] = useState<ErrorProyecto | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        async function fetchError() {
            try {
                const res = await fetch(`http://localhost:8080/api/errores/${id}`);
                if (!res.ok) throw new Error("Error al cargar el error del proyecto");

                const data = await res.json();
                setErrorData(data);
            } catch (err) {
                console.error(err);
                router.push("/erroresProyecto");
            }
        }

        fetchError();
    }, [id, router]);

    if (!errorData) return <p>Cargando...</p>;

    return (
        <div>
            <h1>Editar Error de Proyecto</h1>
            <ErrorProyectoForm
                initialData={errorData}
                mode="editar"
                onSuccess={() => router.push("/erroresProyecto")}
            />
        </div>
    );
}
