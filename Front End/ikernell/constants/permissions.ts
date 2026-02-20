// Definición de roles por ID
export const ROLES = {
    COORDINADOR_PROYECTOS: 1,
    LIDER_PROYECTOS: 2,
    DESARROLLADOR: 3
} as const;

// Definición de módulos del sistema
export const MODULES = {
    PROYECTOS: 'proyectos',
    PERSONAS: 'personas',
    ROLES: 'roles',
    ACTIVIDADES: 'actividades',
    ERRORES_PROYECTO: 'erroresProyecto',
    INTERRUPCIONES: 'interrupciones',
    REPORTES: 'reportes',
    BIBLIOTECA: 'biblioteca',
    TUTORIALES: 'tutoriales',
    CHAT: 'chat',
    SERVICIOS: 'servicios',
    LINEAMIENTOS: 'lineamientos',
    SITIOS_INTERES: 'sitiosInteres',
    CONTACTO: 'contacto',
    NOTICIAS: 'noticias',
    ETAPAS: 'etapas'
} as const;

// Definición de acciones específicas
export const ACTIONS = {
    // Acciones generales
    VIEW: 'view',
    CREATE: 'create',
    EDIT: 'edit',
    DELETE: 'delete',
    VIEW_ALL: 'view_all',

    // Acciones específicas de proyectos
    ASSIGN_DEVELOPERS: 'assign_developers',
    DEACTIVATE_PROJECT: 'deactivate_project',
    VIEW_ASSIGNED_ONLY: 'view_assigned_only',

    // Acciones específicas de actividades
    COMPLETE_OWN_ACTIVITIES: 'complete_own_activities',
    COMPLETE_ALL_ACTIVITIES: 'complete_all_activities',

    // Acciones específicas de reportes
    VIEW_PERFORMANCE_REPORTS: 'view_performance_reports',

    // Acciones específicas de errores/interrupciones
    REGISTER_IN_ASSIGNED_PROJECTS: 'register_in_assigned_projects'
} as const;

// Matriz de permisos por rol
export const ROLE_PERMISSIONS = {
    [ROLES.COORDINADOR_PROYECTOS]: {
        // Coordinador puede hacer TODO
        [MODULES.PROYECTOS]: [ACTIONS.VIEW_ALL, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE, ACTIONS.ASSIGN_DEVELOPERS, ACTIONS.DEACTIVATE_PROJECT],
        [MODULES.PERSONAS]: [ACTIONS.VIEW_ALL, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
        [MODULES.ROLES]: [ACTIONS.VIEW_ALL, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
        [MODULES.ACTIVIDADES]: [ACTIONS.VIEW_ALL, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE, ACTIONS.COMPLETE_ALL_ACTIVITIES],
        [MODULES.ERRORES_PROYECTO]: [ACTIONS.VIEW_ALL, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
        [MODULES.INTERRUPCIONES]: [ACTIONS.VIEW_ALL, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
        [MODULES.REPORTES]: [ACTIONS.VIEW_ALL, ACTIONS.VIEW_PERFORMANCE_REPORTS],
        [MODULES.BIBLIOTECA]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
        [MODULES.TUTORIALES]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
        [MODULES.CHAT]: [ACTIONS.VIEW],
        [MODULES.SERVICIOS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
        [MODULES.LINEAMIENTOS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
        [MODULES.SITIOS_INTERES]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
        [MODULES.CONTACTO]: [ACTIONS.VIEW, ACTIONS.EDIT],
        [MODULES.NOTICIAS]: [ACTIONS.VIEW_ALL, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
        [MODULES.ETAPAS]: [ACTIONS.VIEW_ALL, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE]
    },

    [ROLES.LIDER_PROYECTOS]: {
        // Líder puede crear proyectos, asignar desarrolladores, desactivar proyectos, registrar actividades
        [MODULES.PROYECTOS]: [ACTIONS.VIEW_ALL, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.ASSIGN_DEVELOPERS, ACTIONS.DEACTIVATE_PROJECT],
        [MODULES.PERSONAS]: [ACTIONS.VIEW_ALL],
        [MODULES.ACTIVIDADES]: [ACTIONS.VIEW_ALL, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.COMPLETE_ALL_ACTIVITIES],
        [MODULES.REPORTES]: [ACTIONS.VIEW_PERFORMANCE_REPORTS],
        [MODULES.BIBLIOTECA]: [ACTIONS.VIEW],
        [MODULES.TUTORIALES]: [ACTIONS.VIEW],
        [MODULES.CHAT]: [ACTIONS.VIEW],
        [MODULES.SERVICIOS]: [ACTIONS.VIEW],
        [MODULES.LINEAMIENTOS]: [ACTIONS.VIEW],
        [MODULES.SITIOS_INTERES]: [ACTIONS.VIEW],
        [MODULES.CONTACTO]: [ACTIONS.VIEW],
        [MODULES.NOTICIAS]: [ACTIONS.VIEW_ALL, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
        [MODULES.ETAPAS]: [ACTIONS.VIEW_ALL]
    },

    [ROLES.DESARROLLADOR]: {
        // Desarrollador solo ve proyectos asignados, completa sus actividades, registra errores/interrupciones
        [MODULES.PROYECTOS]: [ACTIONS.VIEW_ASSIGNED_ONLY],
        [MODULES.ACTIVIDADES]: [ACTIONS.VIEW_ASSIGNED_ONLY, ACTIONS.COMPLETE_OWN_ACTIVITIES],
        [MODULES.ERRORES_PROYECTO]: [ACTIONS.VIEW, ACTIONS.REGISTER_IN_ASSIGNED_PROJECTS],
        [MODULES.INTERRUPCIONES]: [ACTIONS.VIEW, ACTIONS.REGISTER_IN_ASSIGNED_PROJECTS],
        [MODULES.BIBLIOTECA]: [ACTIONS.VIEW],
        [MODULES.TUTORIALES]: [ACTIONS.VIEW],
        [MODULES.CHAT]: [ACTIONS.VIEW],
        [MODULES.SERVICIOS]: [ACTIONS.VIEW],
        [MODULES.LINEAMIENTOS]: [ACTIONS.VIEW],
        [MODULES.SITIOS_INTERES]: [ACTIONS.VIEW],
        [MODULES.CONTACTO]: [ACTIONS.VIEW],
        [MODULES.NOTICIAS]: [ACTIONS.VIEW_ALL],
    }
} as const;

// Función helper para obtener permisos de un rol
export function getRolePermissions(roleId: number) {
    return (ROLE_PERMISSIONS as any)[roleId] || {};
}

// Función helper para verificar si un rol tiene un permiso específico
export function hasPermission(roleId: number, module: string, action: string): boolean {
    const permissions = getRolePermissions(roleId);
    return permissions[module]?.includes(action) || false;
}