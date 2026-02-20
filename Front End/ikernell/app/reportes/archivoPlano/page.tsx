"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    getArchivoPlanoOptimizado,
    generarCSVDesdeProyectos
} from "@/services/reportes.service";
import { Proyecto } from "@/types/proyecto";

export default function ArchivoPlanoPage() {
    const [loading, setLoading] = useState(false);
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const cargarProyectos = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await getArchivoPlanoOptimizado();
                console.log("Datos de proyectos cargados:", data);
                setProyectos(data);
            } catch (error) {
                const mensaje = error instanceof Error ? error.message : "Error desconocido";
                console.error("Error al cargar proyectos:", error);
                setError(mensaje);
            } finally {
                setLoading(false);
            }
        };
        cargarProyectos();
    }, []);

    const handleDescargarCSV = async () => {
        setLoading(true);
        setError("");
        try {
            await generarCSVDesdeProyectos();
        } catch (error) {
            const mensaje = error instanceof Error ? error.message : "Erro ao gerar CSV";
            console.error("Erro ao gerar CSV:", error);
            setError(mensaje);
            
            if (mensaje.includes('No hay datos')) {
                alert("Não há dados suficientes para gerar o arquivo CSV. Verifique se existem projetos cadastrados.");
            } else {
                alert(mensaje);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRecargar = () => {
        window.location.reload();
    };

    const totalProyectos = proyectos.length;
    const proyectosActivos = proyectos.filter(p => p.fechaFin === null || new Date(p.fechaFin) > new Date()).length;
    const totalPersonasAsignadas = proyectos.reduce((total, p) => total + (p.personas?.length || 0), 0);
    const proyectosConPersonas = proyectos.filter(p => p.personas && p.personas.length > 0).length;
    const promedioPersonasPorProyecto = totalProyectos > 0 ? (totalPersonasAsignadas / totalProyectos).toFixed(1) : 0;

    if (loading && proyectos.length === 0) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <div className="text-lg text-gray-600">Cargando datos para archivo plano...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Archivo Plano - Empresa Brasileña
                    </h1>
                    <p className="text-gray-600 mt-1">Exportación de datos estructurados para procesamiento empresarial</p>
                </div>

                <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
                    onClick={() => router.push("/reportes")}
                >
                    Volver
                </button>
            </div>

            {/* Mensajes de error */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">Error al procesar datos</h3>
                            <p className="text-sm mt-1">{error}</p>
                        </div>
                        <button
                            onClick={handleRecargar}
                            className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-sm font-medium transition"
                        >
                            Tentar novamente
                        </button>
                    </div>
                </div>
            )}

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-blue-800">Total Proyectos</h3>
                    <p className="text-2xl font-bold text-blue-900">{totalProyectos}</p>
                    <p className="text-xs text-blue-700">{proyectosActivos} activos</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-green-800">Recursos Humanos</h3>
                    <p className="text-2xl font-bold text-green-900">{totalPersonasAsignadas}</p>
                    <p className="text-xs text-green-700">personas asignadas</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-purple-800">Promedio Equipo</h3>
                    <p className="text-2xl font-bold text-purple-900">{promedioPersonasPorProyecto}</p>
                    <p className="text-xs text-purple-700">personas/proyecto</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-orange-800">Formato Exportación</h3>
                    <p className="text-lg font-bold text-orange-900">CSV-BR</p>
                    <p className="text-xs text-orange-700">UTF-8 | PT-BR</p>
                </div>
            </div>

            {/* Descarga */}
            <div className="mb-6">
                <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                    onClick={handleDescargarCSV}
                    disabled={loading || proyectos.length === 0}
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Gerando arquivo CSV
                        </>
                    ) : (
                        "Baixar CSV Brasileiro"
                    )}
                </button>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow border overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-900 text-white uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Projeto</th>
                            <th className="px-6 py-3 text-center">Equipe</th>
                            <th className="px-6 py-3 text-center">Data Início</th>
                            <th className="px-6 py-3 text-center">Data Fim</th>
                            <th className="px-6 py-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {proyectos.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-500">
                                    <div>
                                        <p className="text-lg font-medium mb-2">Nenhum projeto disponível</p>
                                        <p className="text-sm">Verifique a conexão com o servidor ou recarregue os dados</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            proyectos.map((proyecto, index) => {
                                const estaActivo = proyecto.fechaFin === null || new Date(proyecto.fechaFin) > new Date();
                                const numeroPersonas = proyecto.personas?.length || 0;
                                
                                return (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{proyecto.nombre}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {numeroPersonas > 0 ? (
                                                <div>
                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                                                        {numeroPersonas} pessoas
                                                    </span>
                                                    {proyecto.personas && (
                                                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                                                            {proyecto.personas.map(p => p.nombre).join(", ")}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic text-sm">Não atribuído</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {proyecto.fechaInicio ? (
                                                <span className="text-gray-900">
                                                    {new Date(proyecto.fechaInicio).toLocaleDateString('pt-BR')}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">--</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {proyecto.fechaFin ? (
                                                <span className="text-gray-900">
                                                    {new Date(proyecto.fechaFin).toLocaleDateString('pt-BR')}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">Em andamento</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                estaActivo 
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {estaActivo ? 'Ativo' : 'Finalizado'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Información del archivo plano */}
            <div className="mt-6 bg-gray-50 rounded-xl p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Especificações do Arquivo CSV</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">Formato e Configuração</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• <strong>Codificação:</strong> UTF-8 (suporte completo a acentos)</li>
                            <li>• <strong>Delimitador:</strong> Vírgula (,) - padrão brasileiro</li>
                            <li>• <strong>Formato de data:</strong> DD/MM/AAAA</li>
                            <li>• <strong>Escape:</strong> Aspas duplas para campos com vírgulas</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">Campos Incluídos</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• <strong>Identificação:</strong> nome do projeto</li>
                            <li>• <strong>Cronograma:</strong> Datas de início e fim</li>
                            <li>• <strong>Recursos:</strong> Equipe atribuída ao projeto</li>
                            <li>• <strong>Status:</strong> Estado atual (Ativo/Finalizado)</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                        <strong>Compatibilidade:</strong> Arquivo otimizado para Excel Brasil, Google Sheets e sistemas ERP brasileiros.
                    </p>
                </div>
            </div>
        </div>
    );
}
