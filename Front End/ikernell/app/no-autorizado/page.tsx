import Link from 'next/link';

export default function NoAutorizadoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center px-4">
            <div className="text-center text-white">
                <div className="text-6xl font-bold mb-4">403</div>
                <h1 className="text-3xl font-bold mb-4">Acceso Denegado</h1>
                <p className="text-red-100 mb-8 max-w-md">
                    No tienes permisos para acceder a esta página. Por favor, contacta al coordinador
                    de proyectos si crees que es un error.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-red-50 transition"
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}
