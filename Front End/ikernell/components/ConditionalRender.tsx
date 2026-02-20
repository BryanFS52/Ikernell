import { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';

interface ConditionalRenderProps {
    children: ReactNode;
    module?: string;
    action?: string;
    condition?: boolean;
    requireCoordinador?: boolean;
    requireLider?: boolean;
    requireDesarrollador?: boolean;
    fallback?: ReactNode;
}

export function ConditionalRender({
    children,
    module,
    action,
    condition,
    requireCoordinador = false,
    requireLider = false,
    requireDesarrollador = false,
    fallback = null
}: ConditionalRenderProps) {
    const {
        can,
        isCoordinador,
        isLider,
        isDesarrollador
    } = usePermissions();
    
    // Si se especifica una condición custom, usarla
    if (condition !== undefined) {
        return condition ? <>{children}</> : <>{fallback}</>;
    }
    
    // Verificar roles específicos
    if (requireCoordinador && !isCoordinador()) {
        return <>{fallback}</>;
    }
    
    if (requireLider && !isLider()) {
        return <>{fallback}</>;
    }
    
    if (requireDesarrollador && !isDesarrollador()) {
        return <>{fallback}</>;
    }
    
    // Si se especifican módulo y acción, verificar permiso específico
    if (module && action) {
        return can(module, action) ? <>{children}</> : <>{fallback}</>;
    }
    
    // Si no se especifican restricciones, mostrar el contenido
    return <>{children}</>;
}

// Componente de conveniencia para ocultar contenido basado en rol
export function RoleBasedRender({
    children,
    allowedRoles,
    fallback = null
}: {
    children: ReactNode;
    allowedRoles: ('coordinador' | 'lider' | 'desarrollador')[];
    fallback?: ReactNode;
}) {
    const { isCoordinador, isLider, isDesarrollador } = usePermissions();
    
    const hasAllowedRole = allowedRoles.some(role => {
        switch (role) {
            case 'coordinador':
                return isCoordinador();
            case 'lider':
                return isLider();
            case 'desarrollador':
                return isDesarrollador();
            default:
                return false;
        }
    });
    
    return hasAllowedRole ? <>{children}</> : <>{fallback}</>;
}