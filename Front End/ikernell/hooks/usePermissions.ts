import { useAuth } from '@/app/context/AuthContext';
import { hasPermission, MODULES, ACTIONS, ROLES } from '@/constants/permissions';

export function usePermissions() {
    const { usuario } = useAuth();
    
    const userRoleId = usuario?.rol?.idRol || null;
    
    // Función para verificar un permiso específico
    const can = (module: string, action: string): boolean => {
        if (!userRoleId) return false;
        return hasPermission(userRoleId, module, action);
    };
    
    // Función para verificar si es coordinador (acceso completo)
    const isCoordinador = (): boolean => {
        return userRoleId === ROLES.COORDINADOR_PROYECTOS;
    };
    
    // Función para verificar si es líder
    const isLider = (): boolean => {
        return userRoleId === ROLES.LIDER_PROYECTOS;
    };
    
    // Función para verificar si es desarrollador
    const isDesarrollador = (): boolean => {
        return userRoleId === ROLES.DESARROLLADOR;
    };
    
    // Funciones de conveniencia para módulos específicos
    const canViewProjects = (): boolean => {
        return can(MODULES.PROYECTOS, ACTIONS.VIEW_ALL) || can(MODULES.PROYECTOS, ACTIONS.VIEW_ASSIGNED_ONLY);
    };
    
    const canCreateProjects = (): boolean => {
        return can(MODULES.PROYECTOS, ACTIONS.CREATE);
    };
    
    const canAssignDevelopers = (): boolean => {
        return can(MODULES.PROYECTOS, ACTIONS.ASSIGN_DEVELOPERS);
    };
    
    const canDeactivateProjects = (): boolean => {
        return can(MODULES.PROYECTOS, ACTIONS.DEACTIVATE_PROJECT);
    };
    
    const canViewAllProjects = (): boolean => {
        return can(MODULES.PROYECTOS, ACTIONS.VIEW_ALL);
    };
    
    const canViewAssignedProjectsOnly = (): boolean => {
        return can(MODULES.PROYECTOS, ACTIONS.VIEW_ASSIGNED_ONLY);
    };
    
    const canManagePersonas = (): boolean => {
        return can(MODULES.PERSONAS, ACTIONS.VIEW_ALL);
    };
    
    const canCreatePersonas = (): boolean => {
        return can(MODULES.PERSONAS, ACTIONS.CREATE);
    };
    
    const canManageRoles = (): boolean => {
        return can(MODULES.ROLES, ACTIONS.VIEW_ALL);
    };
    
    const canViewActivities = (): boolean => {
        return can(MODULES.ACTIVIDADES, ACTIONS.VIEW_ALL) || can(MODULES.ACTIVIDADES, ACTIONS.VIEW_ASSIGNED_ONLY);
    };
    
    const canCreateActivities = (): boolean => {
        return can(MODULES.ACTIVIDADES, ACTIONS.CREATE);
    };
    
    const canCompleteOwnActivities = (): boolean => {
        return can(MODULES.ACTIVIDADES, ACTIONS.COMPLETE_OWN_ACTIVITIES);
    };
    
    const canCompleteAllActivities = (): boolean => {
        return can(MODULES.ACTIVIDADES, ACTIONS.COMPLETE_ALL_ACTIVITIES);
    };
    
    const canViewReports = (): boolean => {
        return can(MODULES.REPORTES, ACTIONS.VIEW_PERFORMANCE_REPORTS) || can(MODULES.REPORTES, ACTIONS.VIEW_ALL);
    };
    
    const canRegisterErrors = (): boolean => {
        return can(MODULES.ERRORES_PROYECTO, ACTIONS.CREATE) || can(MODULES.ERRORES_PROYECTO, ACTIONS.REGISTER_IN_ASSIGNED_PROJECTS);
    };
    
    const canViewAllErrors = (): boolean => {
        return can(MODULES.ERRORES_PROYECTO, ACTIONS.VIEW_ALL);
    };
    
    const canRegisterInterruptions = (): boolean => {
        return can(MODULES.INTERRUPCIONES, ACTIONS.CREATE) || can(MODULES.INTERRUPCIONES, ACTIONS.REGISTER_IN_ASSIGNED_PROJECTS);
    };
    
    const canViewAllInterruptions = (): boolean => {
        return can(MODULES.INTERRUPCIONES, ACTIONS.VIEW_ALL);
    };
    
    const canManageNews = (): boolean => {
        return can(MODULES.NOTICIAS, ACTIONS.CREATE);
    };

    // Funciones específicas para validaciones de personas
    const canEditPersonas = (): boolean => {
        return can(MODULES.PERSONAS, ACTIONS.EDIT);
    };

    const canDeletePersonas = (): boolean => {
        return can(MODULES.PERSONAS, ACTIONS.DELETE);
    };

    // Funciones específicas para validaciones de noticias
    const canCreateNews = (): boolean => {
        return can(MODULES.NOTICIAS, ACTIONS.CREATE);
    };

    const canEditNews = (): boolean => {
        return can(MODULES.NOTICIAS, ACTIONS.EDIT);
    };

    const canDeleteNews = (): boolean => {
        return can(MODULES.NOTICIAS, ACTIONS.DELETE);
    };

    const canViewNews = (): boolean => {
        return can(MODULES.NOTICIAS, ACTIONS.VIEW_ALL);
    };

    return {
        // Funciones generales
        can,
        isCoordinador,
        isLider,
        isDesarrollador,
        
        // Funciones específicas por módulo
        canViewProjects,
        canCreateProjects,
        canAssignDevelopers,
        canDeactivateProjects,
        canViewAllProjects,
        canViewAssignedProjectsOnly,
        canManagePersonas,
        canCreatePersonas,
        canManageRoles,
        canViewActivities,
        canCreateActivities,
        canCompleteOwnActivities,
        canCompleteAllActivities,
        canViewReports,
        canRegisterErrors,
        canViewAllErrors,
        canRegisterInterruptions,
        canViewAllInterruptions,
        canManageNews,
        canEditPersonas,
        canDeletePersonas,
        canCreateNews,
        canEditNews,
        canDeleteNews,
        canViewNews,
        
        // Propiedades útiles
        userRoleId,
        usuario
    };
}