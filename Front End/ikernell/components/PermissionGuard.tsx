import { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';

interface PermissionGuardProps {
    children: ReactNode;
    module?: string;
    action?: string;
    requireCoordinador?: boolean;
    requireLider?: boolean;
    requireDesarrollador?: boolean;
    fallback?: ReactNode;
    showUnauthorized?: boolean;
}

export function PermissionGuard({
    children,
    module,
    action,
    requireCoordinador = false,
    requireLider = false,
    requireDesarrollador = false,
    fallback = null,
    showUnauthorized = false
}: PermissionGuardProps) {
    const {
        can,
        isCoordinador,
        isLider,
        isDesarrollador
    } = usePermissions();
    
    // Verificar roles específicos
    if (requireCoordinador && !isCoordinador()) {
        return showUnauthorized ? <UnauthorizedMessage /> : <>{fallback}</>;
    }
    
    if (requireLider && !isLider()) {
        return showUnauthorized ? <UnauthorizedMessage /> : <>{fallback}</>;
    }
    
    if (requireDesarrollador && !isDesarrollador()) {
        return showUnauthorized ? <UnauthorizedMessage /> : <>{fallback}</>;
    }
    
    // Si se especifican módulo y acción, verificar permiso específico
    if (module && action) {
        if (!can(module, action)) {
            return showUnauthorized ? <UnauthorizedMessage /> : <>{fallback}</>;
        }
    }
    
    return <>{children}</>;
}

function UnauthorizedMessage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
                <div className="text-red-600 text-4xl mb-4">PROHIBIDO</div>
                <h2 className="text-xl font-semibold text-red-800 mb-2">
                    Acceso No Autorizado
                </h2>
                <p className="text-red-600 mb-4">
                    No tienes los permisos necesarios para acceder a esta funcionalidad.
                </p>
                <p className="text-sm text-gray-700">
                    Si necesitas acceso, contacta al administrador del sistema.
                </p>
            </div>
        </div>
    );
}