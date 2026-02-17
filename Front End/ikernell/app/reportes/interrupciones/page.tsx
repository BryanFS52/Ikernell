"use client";

import { useEffect, useState } from "react";
import { Interrupcion } from "@/types/interrupcion";
import { descargarReporteInterrupciones } from "@/services/reportes.service";
import { useRouter } from "next/navigation";

export default function ReporteInterrupcionesPage() {

    const [data, setData] = useState<Interrupcion[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch("http://localhost:8080/api/reportes/interrupciones")
            .then(res => res.json())
            .then(res => {
                setData(res);
                setLoading(false);
            })

            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="mt-6">Cargando reporte...</p>;

    return (
        <div className="page">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Reporte de Interrupciones
                </h1>

                <button
                    className="btn-secondary"
                    onClick={() => router.push("/reportes")}
                >
                    Volver
                </button>
            </div>

            <button
                className="btn-primary mb-4"
                onClick={() => descargarReporteInterrupciones()}
            >
                Descargar reporte CSV
            </button>

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Fecha</th>
                        <th>Duración</th>
                        <th>Fase</th>
                        <th>Persona</th>
                        <th>Proyecto</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map(i => (
                        <tr key={i.idInterrupcion}>
                            <td>{i.tipo}</td>
                            <td>{i.fecha}</td>
                            <td>{i.duracion}</td>
                            <td>{i.fase}</td>
                            <td>
                                {i.persona ? `${i.persona.nombre} ${i.persona.apellido}` : ''}
                            </td>
                            <td>{i.proyecto ? i.proyecto.nombre : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}