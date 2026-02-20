"use client";

import { useEffect, useState } from "react";
import { Interrupcion } from "@/types/interrupcion";
import { descargarReporteInterrupciones } from "@/services/reportes.service";
import { useRouter } from "next/navigation";

export default function ReporteInterrupcionesPage() {

    const [data, setData] = useState<Interrupcion[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [searchTipo, setSearchTipo] = useState("");
    const [searchPersona, setSearchPersona] = useState("");
    const [searchProyecto, setSearchProyecto] = useState("");

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

    const dataFiltrada = data.filter(i => 
        i.tipo.toLowerCase().includes(searchTipo.toLowerCase()) &&
        (i.persona ? `${i.persona.nombre} ${i.persona.apellido}`.toLowerCase().includes(searchPersona.toLowerCase()) : true) &&
        (i.proyecto ? i.proyecto.nombre.toLowerCase().includes(searchProyecto.toLowerCase()) : true)
    );

    // Cálculos de estadísticas
    const totalInterrupciones = dataFiltrada.length;
    const duracionTotal = dataFiltrada.reduce((sum, i) => sum + (parseFloat(i.duracion) || 0), 0);
    const duracionPromedio = totalInterrupciones > 0 ? (duracionTotal / totalInterrupciones).toFixed(2) : 0;

    if (loading) return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">Cargando reporte...</div>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Reporte de Interrupciones
                    </h1>
                    <p className="text-gray-600 mt-1">Análisis detallado de interrupciones en proyectos</p>
                </div>

                <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
                    onClick={() => router.push("/reportes")}
                >
                    Volver
                </button>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-blue-800">Total Interrupciones</h3>
                    <p className="text-2xl font-bold text-blue-900">{totalInterrupciones}</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-orange-800">Duración Total</h3>
                    <p className="text-2xl font-bold text-orange-900">{duracionTotal.toFixed(2)} hr</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-green-800">Promedio</h3>
                    <p className="text-2xl font-bold text-green-900">{duracionPromedio} hr</p>
                </div>
            </div>

            {/* Botón de descarga */}
            <div className="mb-6">
                <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    onClick={() => descargarReporteInterrupciones()}
                >
                    Descargar reporte CSV
                </button>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow border overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-900 text-white uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Tipo</th>
                            <th className="px-6 py-3">Fecha</th>
                            <th className="px-6 py-3 text-center">Duración (hr)</th>
                            <th className="px-6 py-3">Fase</th>
                            <th className="px-6 py-3">Persona</th>
                            <th className="px-6 py-3">Proyecto</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {dataFiltrada.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500">
                                    {data.length === 0 ? "No hay interrupciones registradas" : "No se encontraron interrupciones con los filtros aplicados"}
                                </td>
                            </tr>
                        ) : (
                            dataFiltrada.map(i => (
                                <tr key={i.idInterrupcion} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                                            {i.tipo}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">
                                        {new Date(i.fecha).toLocaleDateString('es-CO')}
                                    </td>
                                    <td className="px-6 py-4 text-center font-medium">
                                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                                            {i.duracion}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">
                                        {i.fase}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">
                                        {i.persona ? `${i.persona.nombre} ${i.persona.apellido}` :
                                        <span className="text-gray-400 italic">Sin asignar</span>}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">
                                        {i.proyecto ? i.proyecto.nombre :
                                        <span className="text-gray-400 italic">Sin proyecto</span>}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}