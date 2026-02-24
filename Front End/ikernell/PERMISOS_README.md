# Sistema de Permisos Basado en Roles

## Descripción
Este sistema implementa control de acceso granular basado en roles para la aplicación Ikernell. Cada rol tiene permisos específicos que determinan qué funcionalidades pueden acceder los usuarios.

## Roles y Permisos

### 1. Coordinador de Proyectos (ID: 1)
**Acceso completo al sistema**
- Todas las funcionalidades disponibles
- Crear, editar, eliminar usuarios
- Gestionar todos los proyectos
- Ver todos los reportes
- Administrar roles y configuraciones

### 2. Líder de Proyectos (ID: 2)
**Gestión de proyectos y equipo**
- Crear y editar proyectos
- Asignar desarrolladores a proyectos
- Desactivar proyectos
- Crear y gestionar actividades
- Generar reportes de desempeño
- Ver información de personas (para asignaciones)
- No puede eliminar usuarios o gestionar roles

### 3. Desarrollador (ID: 3)
**Acceso limitado a proyectos asignados**
- Ver solo proyectos donde está asignado
- Finalizar sus propias actividades
- Registrar errores en proyectos asignados
- Registrar interrupciones en proyectos asignados
- Acceso a recursos (biblioteca, tutoriales, etc.)
- No puede ver todos los proyectos
- No puede crear/editar proyectos
- No puede gestionar usuarios

## Archivos del Sistema

### `/constants/permissions.ts`
Define los roles, módulos, acciones y la matriz de permisos:
```typescript
export const ROLES = {
    COORDINADOR_PROYECTOS: 1,
    LIDER_PROYECTOS: 2,
    DESARROLLADOR: 3
};

export const ROLE_PERMISSIONS = {
    [ROLES.COORDINADOR_PROYECTOS]: { /* todos los permisos */ },
    [ROLES.LIDER_PROYECTOS]: { /* permisos limitados */ },
    [ROLES.DESARROLLADOR]: { /* permisos mínimos */ }
};
```

### `/hooks/usePermissions.ts`
Hook personalizado para verificar permisos:
```typescript
const {
    canCreateProjects,
    canViewAllProjects,
    canCompleteOwnActivities,
    isCoordinador
} = usePermissions();
```

### `/components/ConditionalRender.tsx`
Componente para mostrar/ocultar contenido basado en permisos:
```typescript
<ConditionalRender condition={canCreateProjects()}>
    <button>Crear Proyecto</button>
</ConditionalRender>
```

### `/components/PermissionGuard.tsx`
Componente para proteger secciones completas:
```typescript
<PermissionGuard module="proyectos" action="create" showUnauthorized>
    <ProyectoForm />
</PermissionGuard>
```

## Implementación en Componentes

### Navbar
- Los menús se filtran automáticamente según permisos
- Solo muestra opciones disponibles para el rol del usuario

### Páginas de Gestión
- **Proyectos**: Filtrado por asignación para desarrolladores
- **Actividades**: Solo muestra actividades asignadas a desarrolladores
- **Errores/Interrupciones**: Limitado a proyectos asignados para desarrolladores

### Botones y Acciones
- Creación/edición disponible según permisos
- Desarrolladores solo pueden finalizar sus propias actividades

## Flujo de Verificación

1. **Autenticación**: El usuario inicia sesión y se obtiene su rol
2. **Verificación de Permisos**: Se consulta la matriz de permisos
3. **Filtrado de UI**: Los componentes muestran solo opciones permitidas
4. **Filtrado de Datos**: Los datos se filtran según el rol del usuario

## Funciones de Utilidad

### Verificación de Permisos Específicos
```typescript
const { can } = usePermissions();
const canEdit = can('proyectos', 'edit');
```

### Verificación por Rol
```typescript
const { isCoordinador, isLider, isDesarrollador } = usePermissions();
```

### Verificación de Proyecto Asignado
```typescript
// Para desarrolladores, verificar si está asignado al proyecto
const isAssignedToProject = (projectId: number) => {
    return project.personas?.some(p => p.idPersona === usuario.idPersona);
};
```

## Seguridad

**Importante**: Este sistema controla la UI, pero la seguridad real debe implementarse en el backend:

1. **Validación del Servidor**: Todas las operaciones deben validarse en el API
2. **Tokens JWT**: Incluir roles en los tokens de autenticación
3. **Middleware de Autorización**: Verificar permisos en cada endpoint
4. **Filtrado de Datos**: El backend debe filtrar datos según el rol

## Uso en Nuevos Componentes

Para agregar control de permisos a un nuevo componente:

1. **Importar el hook**:
```typescript
import { usePermissions } from '@/hooks/usePermissions';
```

2. **Verificar permisos**:
```typescript
const { canCreateProjects } = usePermissions();
```

3. **Aplicar restricciones**:
```typescript
<ConditionalRender condition={canCreateProjects()}>
    <CreateButton />
</ConditionalRender>
```

## Extensibilidad

Para agregar nuevos roles o permisos:

1. Actualizar `ROLES` en `permissions.ts`
2. Agregar el rol a `ROLE_PERMISSIONS`
3. Definir nuevas acciones si es necesario
4. Actualizar el hook `usePermissions` con nuevas funciones
5. Aplicar las restricciones en los componentes relevantes

## Ejemplos de Uso

### Botón Condicional
```typescript
<ConditionalRender condition={canCreateProjects()}>
    <button onClick={() => router.push('/proyectos/crear')}>
        Nuevo Proyecto
    </button>
</ConditionalRender>
```

### Filtrado de Datos
```typescript
const proyectosFiltrados = isDesarrollador && usuario 
    ? proyectos.filter(p => 
        p.personas?.some(persona => persona.idPersona === usuario.idPersona)
      )
    : proyectos;
```

### Página Protegida
```typescript
<PermissionGuard requireLider showUnauthorized>
    <GestionProyectos />
</PermissionGuard>
```