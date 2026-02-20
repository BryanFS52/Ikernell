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
            await eliminarRespuesta(idPregunta, indexRespuesta);
            onRespuestaExitosa?.();
        } catch (error) {
            alert('Error al eliminar la respuesta');
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    if (preguntas.length === 0) {
        return (
            <div className="text-center py-12 bg-white/5 backdrop-blur rounded-xl border border-white/10 shadow-lg">
                <p className="text-slate-300">¡Aún no hay preguntas. Sé el primero en preguntar!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {preguntas.map((pregunta) => (
                <div
                    key={pregunta.idPregunta}
                    className="bg-white/5 backdrop-blur border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg group"
                >
                    <div
                        className="p-6 bg-white/5 cursor-pointer hover:bg-white/10 transition-all duration-300"
                        onClick={() => toggleExpandir(pregunta.idPregunta)}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors text-lg">{pregunta.titulo}</h4>
                                </div>
                                <p className="text-slate-300 mb-3 leading-relaxed">
                                    {pregunta.descripcion?.substring(0, 100) || 'Sin descripción'}
                                    {pregunta.descripcion && pregunta.descripcion.length > 100 ? '...' : ''}
                                </p>
                                <div className="flex gap-4 text-sm text-slate-400">
                                    <span className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                        Por:{' '}
                                        {pregunta.persona
                                            ? `${pregunta.persona.nombre} ${pregunta.persona.apellido}`
                                            : pregunta.autor || 'Anónimo'}
                                    </span>
                                    <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                                        {new Date(pregunta.fecha).toLocaleDateString('es-ES')}
                                    </span>
                                </div>
                            </div>
                            <span className="text-slate-400 group-hover:text-blue-300 ml-4 transition-colors text-sm font-medium">
                                {preguntasExpandidas.includes(pregunta.idPregunta) ? 'Contraer' : 'Expandir'}
                            </span>
                        </div>
                    </div>
                    {preguntasExpandidas.includes(pregunta.idPregunta) && (
                        <div className="p-6 border-t border-white/10 bg-white/5">
                            <div className="mb-6">
                                <h5 className="font-semibold text-white mb-4 text-lg">
                                    Respuestas ({pregunta.respuestas?.length || 0})
                                </h5>

                                {pregunta.respuestas && pregunta.respuestas.length > 0 ? (
                                    <div className="space-y-4">
                                        {pregunta.respuestas.map((respuesta, index) => (
                                            <div
                                                key={index}
                                                className="p-4 bg-blue-500/10 backdrop-blur rounded-xl border border-blue-400/30 shadow-lg hover:bg-blue-500/15 transition-all duration-300"
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <span className="font-medium text-white text-sm">
                                                        Respuesta {index + 1}
                                                    </span>
                                                    <span className="text-xs bg-blue-600/30 text-blue-200 px-2 py-1 rounded-full">
                                                        {new Date().toLocaleDateString('es-ES')}
                                                    </span>
                                                </div>
                                                <p className="text-slate-300 leading-relaxed mb-3">{respuesta}</p>
                                                <button
                                                    onClick={() => handleEliminarRespuesta(pregunta.idPregunta, index)}
                                                    className="text-red-300 text-sm hover:text-red-200 hover:bg-red-500/20 px-2 py-1 rounded transition-all duration-200"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-400 italic">Aún no hay respuestas</p>
                                )}
                            </div>

                            <div className="p-4 bg-indigo-500/10 backdrop-blur rounded-xl border border-indigo-400/30 shadow-lg">
                                {respondiendo?.idPregunta === pregunta.idPregunta ? (
                                    <div className="space-y-4">
                                        <textarea
                                            value={respondiendo.contenido}
                                            onChange={(e) =>
                                                setRespondiendo({
                                                    ...respondiendo,
                                                    contenido: e.target.value,
                                                })
                                            }
                                            placeholder="Escribe tu respuesta..."
                                            className="w-full px-4 py-3 bg-white/20 backdrop-blur border border-white/30 rounded-xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent transition-all shadow-lg resize-none"
                                            rows={3}
                                            disabled={cargando}
                                        />
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleResponder(pregunta.idPregunta)}
                                                disabled={cargando || !respondiendo.contenido.trim()}
                                                className={`px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg transform ${
                                                    cargando || !respondiendo.contenido.trim()
                                                        ? 'bg-gray-500/50 text-slate-400 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:scale-105 hover:shadow-indigo-500/25'
                                                }`}
                                            >
                                                {cargando ? (
                                                    <span className="flex items-center gap-2">
                                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                        </svg>
                                                        Enviando...
                                                    </span>
                                                ) : 'Responder'}
                                            </button>
                                            <button
                                                onClick={() => setRespondiendo(null)}
                                                disabled={cargando}
                                                className="px-6 py-3 bg-white/10 backdrop-blur border border-white/30 text-slate-300 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-200 font-semibold"
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
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
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
