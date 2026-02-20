"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReporteErrores, descargarReporteErrores } from "@/services/reportes.service";


interface ErrorReporte{
    idError: number;
    tipoError: string;
    fase: string;
    persona: {
        nombre: string;
        apellido: string;
    };
    proyecto:{
        nombre: string
    };
}

export default function ReporteErroresPage(){

    const [data, setData] = useState<ErrorReporte[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getReporteErrores()
        .then(res => {
            setData(res);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
        });
}, []);

    // Cálculos de estadísticas
    const totalErrores = data.length;
    
    // Error más común por tipo
    const tiposError = data.reduce((acc: {[key: string]: number}, error) => {
        acc[error.tipoError] = (acc[error.tipoError] || 0) + 1;
        return acc;
    }, {});
    const tipoMasComun = Object.keys(tiposError).length > 0 
        ? Object.entries(tiposError).sort(([,a], [,b]) => b - a)[0] 
        : null;
    
    // Fase con más errores
    const fases = data.reduce((acc: {[key: string]: number}, error) => {
        acc[error.fase] = (acc[error.fase] || 0) + 1;
        return acc;
    }, {});
    const faseMasErrores = Object.keys(fases).length > 0 
        ? Object.entries(fases).sort(([,a], [,b]) => b - a)[0] 
        : null;

    // Proyectos únicos con errores
    const proyectosConErrores = new Set(data.map(e => e.proyecto?.nombre).filter(Boolean)).size;

    if (loading) return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">Cargando reporte de errores...</div>
            </div>
        </div>
    );

    return(
        <div className="max-w-6xl mx-auto p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Reporte de Errores por Proyecto
                    </h1>
                    <p className="text-gray-600 mt-1">Análisis detallado de errores identificados en proyectos</p>
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
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-red-800">Total Errores</h3>
                    <p className="text-2xl font-bold text-red-900">{totalErrores}</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-orange-800">Tipo Más Común</h3>
                    <p className="text-lg font-bold text-orange-900">
                        {tipoMasComun ? tipoMasComun[0] : "N/A"}
                    </p>
                    <p className="text-xs text-orange-700">
                        {tipoMasComun ? `${tipoMasComun[1]} casos` : ""}
                    </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-purple-800">Fase Crítica</h3>
                    <p className="text-lg font-bold text-purple-900">
                        {faseMasErrores ? faseMasErrores[0] : "N/A"}
                    </p>
                    <p className="text-xs text-purple-700">
                        {faseMasErrores ? `${faseMasErrores[1]} errores` : ""}
                    </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-blue-800">Proyectos Afectados</h3>
                    <p className="text-2xl font-bold text-blue-900">{proyectosConErrores}</p>
                </div>
            </div>

            {/* Botón de descarga */}
            <div className="mb-6">
                <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    onClick={() => descargarReporteErrores()}
                >
                    Descargar CSV
                </button>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow border overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-900 text-white uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Tipo de Error</th>
                            <th className="px-6 py-3">Fase</th>
                            <th className="px-6 py-3">Persona</th>
                            <th className="px-6 py-3">Proyecto</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-8 text-gray-500">
                                    No hay errores registrados
                                </td>
                            </tr>
                        ) : (
                            data.map((e) => (
                                <tr key={e.idError} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                                            {e.tipoError}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                                            {e.fase}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">
                                        {e.persona?.nombre && e.persona?.apellido 
                                            ? `${e.persona.nombre} ${e.persona.apellido}`
                                            : <span className="text-gray-400 italic">Sin asignar</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">
                                        {e.proyecto?.nombre ||
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