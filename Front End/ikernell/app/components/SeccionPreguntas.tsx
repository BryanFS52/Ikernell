import { Pregunta } from '@/types/pregunta';
import { useState } from 'react';
import { responderPregunta, eliminarRespuesta } from '@/services/pregunta.service';

interface SeccionPreguntasProps {
    preguntas: Pregunta[];
    esAutenticado?: boolean;
    usuarioId?: number;
    onRespuestaExitosa?: () => void;
}

export function SeccionPreguntas({
    preguntas,
    esAutenticado = false,
    usuarioId,
    onRespuestaExitosa,
}: SeccionPreguntasProps) {
    const [preguntasExpandidas, setPreguntasExpandidas] = useState<number[]>([]);
    const [respondiendo, setRespondiendo] = useState<{
        idPregunta: number;
        contenido: string;
    } | null>(null);
    const [cargando, setCargando] = useState(false);

    const toggleExpandir = (id: number) => {
        setPreguntasExpandidas((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleResponder = async (idPregunta: number) => {
        if (!respondiendo || respondiendo.idPregunta !== idPregunta || !usuarioId) return;

        setCargando(true);
        try {
            await responderPregunta(idPregunta, {
                contenido: respondiendo.contenido,
                autor: usuarioId.toString(),
            });

            setRespondiendo(null);
            onRespuestaExitosa?.();
        } catch (error) {
            alert('Error al responder pregunta');
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    const handleEliminarRespuesta = async (idPregunta: number, indexRespuesta: number) => {
        setCargando(true);
        try {
            // Eliminar la respuesta y actualizar la UI
            await eliminarRespuesta(idPregunta, indexRespuesta); 
            onRespuestaExitosa?.(); // Actualizar las respuestas luego de la eliminación
        } catch (error) {
            alert('Error al eliminar la respuesta');
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    if (preguntas.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>Aún no hay preguntas. ¡Sé el primero en preguntar!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {preguntas.map((pregunta) => (
                <div
                    key={pregunta.idPregunta}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition"
                >
                    {/* Header - Pregunta */}
                    <div
                        className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => toggleExpandir(pregunta.idPregunta)}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold text-gray-900">{pregunta.titulo}</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    {pregunta.descripcion?.substring(0, 100) || 'Sin descripcion'}
                                    {pregunta.descripcion && pregunta.descripcion.length > 100 ? '...' : ''}
                                </p>
                                <div className="flex gap-4 text-xs text-gray-500">
                                    <span>
                                        Por:{' '}
                                        {pregunta.persona
                                            ? `${pregunta.persona.nombre} ${pregunta.persona.apellido}`
                                            : pregunta.autor || 'Anónimo'}
                                    </span>
                                    <span>{new Date(pregunta.fecha).toLocaleDateString('es-ES')}</span>
                                </div>
                            </div>
                            <span className="text-gray-400 ml-4">
                                {preguntasExpandidas.includes(pregunta.idPregunta) ? '▼' : '▶'}
                            </span>
                        </div>
                    </div>

                    {/* Respuestas */}
                    {preguntasExpandidas.includes(pregunta.idPregunta) && (
                        <div className="p-4 border-t">
                            <div className="mb-6">
                                <h5 className="font-semibold text-gray-900 mb-3">
                                    Respuestas ({pregunta.respuestas?.length || 0})
                                </h5>

                                {pregunta.respuestas && pregunta.respuestas.length > 0 ? (
                                    <div className="space-y-3">
                                        {pregunta.respuestas.map((respuesta, index) => (
                                            <div
                                                key={index}
                                                className="p-3 bg-blue-50 rounded-lg border border-blue-100"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-medium text-gray-900">
                                                        Respuesta {index + 1}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date().toLocaleDateString('es-ES')}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 text-sm">{respuesta}</p>
                                                {/* Botón para eliminar la respuesta */}
                                                <button
                                                    onClick={() => handleEliminarRespuesta(pregunta.idPregunta, index)}
                                                    className="text-red-500 text-xs hover:text-red-700"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">Aún no hay respuestas</p>
                                )}
                            </div>

                            {/* Formulario de Respuesta */}
                            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                {respondiendo?.idPregunta === pregunta.idPregunta ? (
                                    <div className="space-y-3">
                                        <textarea
                                            value={respondiendo.contenido}
                                            onChange={(e) =>
                                                setRespondiendo({
                                                    ...respondiendo,
                                                    contenido: e.target.value,
                                                })
                                            }
                                            placeholder="Escribe tu respuesta..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                            rows={3}
                                            disabled={cargando}
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleResponder(pregunta.idPregunta)}
                                                disabled={cargando || !respondiendo.contenido.trim()}
                                                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
                                            >
                                                {cargando ? 'Enviando...' : 'Responder'}
                                            </button>
                                            <button
                                                onClick={() => setRespondiendo(null)}
                                                disabled={cargando}
                                                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setRespondiendo({
                                                idPregunta: pregunta.idPregunta,
                                                contenido: '',
                                            })
                                        }
                                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                                    >
                                        Responder
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
