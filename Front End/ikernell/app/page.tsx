'use client';

import { useAuth } from '@/app/context/AuthContext';
import HomePublica from '@/app/components/HomePublica';
import HomePrivada from '@/app/components/HomePrivada';

export default function Home() {
  const { estaAutenticado, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return estaAutenticado ? <HomePrivada /> : <HomePublica />;
}
