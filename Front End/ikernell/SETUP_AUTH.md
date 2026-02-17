# Sistema de Autenticación y Control de Acceso

## Descripción General

Se ha implementado un sistema completo de autenticación con roles en el frontend, permitiendo que un "Coordinador de Proyectos" inicie sesión y cree nuevos usuarios con credenciales de acceso.

## Cambios Realizados en el Frontend

### 1. **Tipos TypeScript Actualizados**

#### [types/persona.ts](types/persona.ts)
- Se agregaron dos campos nuevos a la interfaz `Persona`:
  - `usuario?: string` - Nombre de usuario para el login
  - `contraseña?: string` - Contraseña del usuario

#### [types/auth.ts](types/auth.ts) (NUEVO)
- `AuthContextType` - Define el contexto de autenticación
- `CredencialesLogin` - Define la estructura de credenciales

### 2. **Sistema de Contexto de Autenticación**

#### [app/context/AuthContext.tsx](app/context/AuthContext.tsx) (NUEVO)
Maneja:
- Estado de sesión del usuario
- Persistencia en localStorage
- Métodos `iniciarSesion()` y `cerrarSesion()`
- Hook `useAuth()` para acceder a la autenticación en cualquier componente

**Flujo:**
```
1. Al cargar la app: verifica si hay sesión guardada en localStorage
2. Usuario ingresa credenciales en login
3. Se envía POST a /api/personas/login
4. Si es exitoso, se guarda la sesión en localStorage y en el contexto
```

### 3. **Componentes de Protección**

#### [app/components/ProtectedRoute.tsx](app/components/ProtectedRoute.tsx) (NUEVO)
- Protege rutas que requieren autenticación
- Soporta validación por rol
- Redirige automáticamente a login si no está autenticado

**Uso:**
```tsx
<ProtectedRoute rolesPermitidos={[1]}>
  <MiPagina />
</ProtectedRoute>
```

#### [app/components/Navbar.tsx](app/components/Navbar.tsx) (NUEVO)
- Muestra información del usuario autenticado
- Botón para cerrar sesión
- Enlaces contextuales según el rol
- Solo aparece cuando el usuario está autenticado

### 4. **Páginas**

#### [app/login/page.tsx](app/login/page.tsx) (NUEVA)
- Página de login con validación de credenciales
- Interfaz responsiva y moderna
- Manejo de errores

#### [app/no-autorizado/page.tsx](app/no-autorizado/page.tsx) (NUEVA)
- Página mostrada cuando el usuario no tiene permisos

### 5. **Servicios**

#### [services/auth.service.ts](services/auth.service.ts) (NUEVO)
- `loginPersona()` - Autentica usuario
- `crearPersonaConCredenciales()` - Crea nuevo usuario
- `actualizarPersonaConCredenciales()` - Actualiza datos del usuario

### 6. **Componentes de Layout**

#### [app/components/AppLayout.tsx](app/components/AppLayout.tsx) (NUEVA)
- Envuelve toda la aplicación con `AuthProvider`
- Renderiza la navbar solo para usuarios autenticados
- Muestra pantalla de carga mientras se verifica la sesión

#### [app/layout.tsx](app/layout.tsx) (ACTUALIZADO)
- Ahora usa `AppLayout` para proporcionar auenticación a toda la app

### 7. **Formulario de Personas**

#### [app/personas/components/PersonaForm.tsx](app/personas/components/PersonaForm.tsx) (ACTUALIZADO)
- Se agregaron campos `usuario` y `contraseña`
- Estos campos se envían al crear/editar una persona

---

## Configuración del Backend Requerida

Tu backend en `localhost:8080` debe soportar los siguientes endpoints:

### 1. **POST /api/personas/login**
**Autenticación de usuario**

Request:
```json
{
  "usuario": "string",
  "contraseña": "string"
}
```

Response (200 OK):
```json
{
  "idPersona": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "documento": "123456789",
  "usuario": "jperez",
  "rol": {
    "idRol": 1,
    "nombre": "Coordinador de Proyectos"
  },
  "estado": true,
  ...otros campos
}
```

Response (401 Unauthorized):
```json
{
  "message": "Credenciales inválidas"
}
```

### 2. **POST /api/personas** (ACTUALIZADO)
**Crear nueva persona con credenciales**

Request:
```json
{
  "nombre": "string",
  "apellido": "string",
  "documento": "string",
  "usuario": "string",
  "contraseña": "string",
  "rol": {
    "idRol": number
  },
  ...otros campos
}
```

### 3. **PUT /api/personas/{id}** (ACTUALIZADO)
**Actualizar persona incluyendo credenciales**

Puede incluir los campos `usuario` y `contraseña` en el body.

---

## Flujo de Uso

### Usuario Nuevo en el Sistema

1. **El Coordinador crea un usuario:**
   - Va a `/personas/crear`
   - Completa formulario con datos de la persona
   - Ingresa `usuario` y `contraseña`
   - Selecciona el rol (ej: "Técnico", "Empleado", etc.)
   - Envía el formulario

2. **El usuario nuevo intenta acceder:**
   - Abre `/login`
   - Ingresa sus credenciales (usuario/contraseña)
   - Presiona "Iniciar Sesión"
   - Es redirigido al dashboard

3. **La sesión se mantiene:**
   - Los datos se guardan en localStorage
   - Si recarga la página, sigue autenticado
   - Si cierra sesión, se borran los datos

---

## Estructura de Roles

Actualmente soporta cualquier rol que exista en tu tabla de roles. Para restringir acceso por rol:

```tsx
// En una página, puedes protegerla asi:
<ProtectedRoute rolesPermitidos={[1, 2]}>
  {/* Solo usuarios con rol ID 1 o 2 pueden ver esto */}
</ProtectedRoute>
```

Donde `1` podría ser "Coordinador de Proyectos" y `2` "Jefe de Proyectos".

---

## Almacenamiento de Sesión

La sesión se almacena en:
- **localStorage** - Persiste entre recargas del navegador
- **Contexto React** - Accesible en tiempo de ejecución

Para acceder a la sesión desde cualquier componente:

```tsx
'use client';

import { useAuth } from '@/app/context/AuthContext';

export default function MiComponente() {
  const { usuario, estaAutenticado, cerrarSesion } = useAuth();

  return <div>Hola {usuario?.nombre}</div>;
}
```

---

## Seguridad

⚠️ **IMPORTANTE - Para Producción:**

1. **HTTPS obligatorio** - Las credenciales deben viajar por conexión segura
2. **Hash de contraseñas** - El backend debe hashear las contraseñas con bcrypt o similar
3. **CORS** - Configurar CORS correctamente en el backend
4. **Tokens JWT** - Considera usar JWT en lugar de sesión en localStorage
5. **Validación** - El backend debe validar todos los datos

---

## Próximos Pasos Recomendados

1. ✅ Implementar los endpoints en el backend
2. ✅ Crear rol "Coordinador de Proyectos" en base de datos
3. ✅ Crear usuario administrador inicial
4. ✅ Testar login y creación de usuarios
5. ⚠️ Implementar seguridad (HTTPS, hash de contraseñas)
6. ⚠️ Agregar dos factores de autenticación (opcional)

---

## Archivo de Ejemplo: Crear el Coordinador Inicial

Ejecutar en tu backend para crear el primer usuario:

```sql
-- Crear rol si no existe
INSERT INTO roles (nombre) VALUES ('Coordinador de Proyectos');

-- Crear usuario coordinador (backend debe hashear esta contraseña)
INSERT INTO personas (nombre, apellido, documento, usuario, contraseña, idRol, estado) 
VALUES ('Administrador', 'Sistema', '00000000', 'admin', '[HASH_BCRYPT]', 1, true);
```

---

## Soporte y Debugging

### El login falla con "Error al iniciar sesión"
- Verificar que el endpoint POST `/api/personas/login` existe en el backend
- Verificar credenciales en la base de datos
- Revisar logs del backend

### La sesión no persiste después de recargar
- Verificar que localStorage está habilitado en el navegador
- Revisar en DevTools: Application > Local Storage

### Navbar no aparece
- Verificar que `useAuth()` está dentro de `AuthProvider`
- Ver en la consola si hay errores de contexto

