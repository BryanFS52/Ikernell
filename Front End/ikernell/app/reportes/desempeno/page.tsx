"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReporteDesempeno } from "@/types/desempeno";
import { descargarReporteDesempeno, getReporteDesempeno } from "@/services/reportes.service";

export default function ReporteDesempenoPage() {

    const [data, setData] = useState<ReporteDesempeno[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {

        getReporteDesempeno()
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    // Filtrar coordinador de proyectos y calcular estadísticas
    const dataFiltrada = data.filter(r =>
        !r.persona.toLowerCase().includes('coordinador')
    );

    const totalPersonas = dataFiltrada.length;
    const totalActividades = dataFiltrada.reduce((sum, r) => sum + r.totalActividades, 0);
    const totalFinalizadas = dataFiltrada.reduce((sum, r) => sum + r.actividadesFinalizadas, 0);
    const totalInterrupciones = dataFiltrada.reduce((sum, r) => sum + r.totalInterrupciones, 0);
    const totalMinutos = dataFiltrada.reduce((sum, r) => sum + r.totalMinutosInterrupcion, 0);
    const promedioFinalizacion = totalActividades > 0 ? ((totalFinalizadas / totalActividades) * 100).toFixed(1) : 0;

    if (loading) return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">Cargando reporte de desempeño...</div>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Reporte de Desempeño
                    </h1>
                    <p className="text-gray-600 mt-1">Análisis de productividad y rendimiento del equipo</p>
                </div>

                <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
                    onClick={() => router.push("/reportes")}
                >
                    Volver
                </button>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-blue-800">Total Personas</h3>
                    <p className="text-2xl font-bold text-blue-900">{totalPersonas}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-green-800">Actividades</h3>
                    <p className="text-2xl font-bold text-green-900">{totalActividades}</p>
                    <p className="text-xs text-green-700">{totalFinalizadas} finalizadas</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-purple-800">% Finalización</h3>
                    <p className="text-2xl font-bold text-purple-900">{promedioFinalizacion}%</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-orange-800">Interrupciones</h3>
                    <p className="text-2xl font-bold text-orange-900">{totalInterrupciones}</p>
                    <p className="text-xs text-orange-700">{Math.round(totalMinutos/60)} hrs perdidas</p>
                </div>
            </div>



            {/* Botón de descarga */}
            <div className="mb-6">
                <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    onClick={() => descargarReporteDesempeno()}
                >
                    Descargar CSV
                </button>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow border overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-900 text-white uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Persona</th>
                            <th className="px-6 py-3 text-center">Total Actividades</th>
                            <th className="px-6 py-3 text-center">Finalizadas</th>
                            <th className="px-6 py-3 text-center">% Cumplimiento</th>
                            <th className="px-6 py-3 text-center">Interrupciones</th>
                            <th className="px-6 py-3 text-center">Tiempo Perdido</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {dataFiltrada.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500">
                                    No hay datos de desempeño disponibles
                                </td>
                            </tr>
                        ) : (
                            dataFiltrada.map((r, index) => {
                                const porcentajeCumplimiento = (r.totalActividades > 0 && r.actividadesFinalizadas >= 0) ? 
                                    ((r.actividadesFinalizadas / r.totalActividades) * 100).toFixed(1) : "0";
                                const horasPerdidas = r.totalMinutosInterrupcion ? (r.totalMinutosInterrupcion / 60).toFixed(1) : "0";

                                return (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {r.persona}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                                                {r.totalActividades}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                                                {r.actividadesFinalizadas}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded text-sm font-medium ${
                                                parseFloat(porcentajeCumplimiento) >= 80 
                                                    ? 'bg-green-100 text-green-800'
                                                    : parseFloat(porcentajeCumplimiento) >= 60
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {porcentajeCumplimiento}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                                                {r.totalInterrupciones}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                                                {horasPerdidas} hrs
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
