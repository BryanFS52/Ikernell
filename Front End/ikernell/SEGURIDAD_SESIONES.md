# Mejoras de Seguridad en Autenticación - Ikernell

## Resumen de Cambios Implementados

Este documento describe las mejoras de seguridad implementadas para solucionar el problema de sesiones que no se cerraban al cerrar el navegador.

### Problemas Solucionados

- **Sesiones persistentes no deseadas**: Las sesiones ahora se cierran automáticamente al cerrar el navegador
- **Falta de timeout por inactividad**: Se implementó cierre automático tras 30 minutos de inactividad
- **Sin detección de cierre de ventana**: Se detecta cuando el usuario cierra la pestaña/ventana

## Cambios Técnicos Implementados

### 1. Cambio de localStorage a sessionStorage
```typescript
// ANTES (inseguro)
localStorage.setItem('sesion', JSON.stringify(usuarioActual));

// AHORA (seguro)
sessionStorage.setItem('sesion', JSON.stringify(usuarioActual));
```

**Beneficio**: `sessionStorage` se limpia automáticamente cuando se cierra la pestaña/navegador.

### 2. Sistema de Timeout por Inactividad

- **Tiempo por defecto**: 30 minutos de inactividad
- **Detección de actividad**: Rastrea mouse, teclado, scroll, toques táctiles
- **Renovación automática**: El timeout se renueva con cada actividad del usuario

### 3. Detección de Cierre de Ventana

Se implementaron los siguientes listeners:
```typescript
// Detecta cuando el usuario cierra la pestaña/ventana
window.addEventListener('beforeunload', manejarCierreVentana);

// Detecta cambios de visibilidad (cambiar de pestaña)
document.addEventListener('visibilitychange', manejarVisibilidadCambio);
```

### 4. Verificación Periódica de Sesión

- **Intervalo**: Cada 5 minutos
- **Función**: Verifica si la sesión ha expirado
- **Acción**: Limpia automáticamente sesiones expiradas

### 5. Indicador Visual de Estado de Sesión

Se agregó un componente `SessionStatus` que:
- Muestra alertas cuando quedan menos de 5 minutos
- Cambia de color según la urgencia (azul → naranja → rojo)
- Se posiciona en la esquina superior derecha

## Configuración

### Modificar Tiempo de Timeout

En `/app/context/AuthContext.tsx`, cambia la constante:

```typescript
const TIMEOUT_INACTIVIDAD = 30; // Cambiar a los minutos deseados
```

### Modificar Intervalo de Verificación

```typescript
const VERIFICACION_SESION_INTERVALO = 5 * 60 * 1000; // Cambiar a milisegundos deseados
```

### Personalizar Alertas de Sesión

En `/components/SessionStatus.tsx`, puedes modificar:

```typescript
// Cambiar cuándo mostrar la alerta (actualmente < 5 minutos)
if (!mostrarSiempre && tiempoRestante > 5) return null;

// Cambiar los umbrales de color
if (tiempoRestante <= 2) return 'text-red-600 bg-red-50 border-red-200';
if (tiempoRestante <= 5) return 'text-orange-600 bg-orange-50 border-orange-200';
```

## Beneficios de Seguridad

### Antes
Sesión persistía indefinidamente
No había timeout de inactividad
Riesgo de acceso no autorizado en computadoras compartidas
Sin detección de cierre de aplicación

### Ahora
Sesión se cierra al cerrar navegador/pestaña
Timeout automático tras 30 minutos de inactividad
Detección inteligente de actividad del usuario
Alertas visuales antes de expiración
Limpieza automática de datos sensibles

## Flujo de Seguridad

1. **Inicio de Sesión**: Se guarda en `sessionStorage` + se inicia timeout
2. **Actividad del Usuario**: Cada interacción renueva el timeout
3. **Inactividad Prolongada**: Tras 30 minutos, sesión se cierra automáticamente
4. **Cierre de Navegador**: El `sessionStorage` se limpia automáticamente
5. **Advertencias**: El usuario ve alertas 5 minutos antes de expiración

## Eventos de Actividad Detectados

- Movimiento del mouse (`mousemove`)
- Clics (`click`, `mousedown`)
- Teclas presionadas (`keypress`)
- Scroll (`scroll`)
- Toques táctiles (`touchstart`)

## Uso del Componente SessionStatus

### Mostrar siempre el tiempo restante:
```tsx
<SessionStatus mostrarSiempre={true} />
```

### Mostrar solo cuando quedan menos de 5 minutos (por defecto):
```tsx
<SessionStatus />
```

## Monitoreo y Debug

Para monitorear el comportamiento, revisa la consola del navegador:
- "Sesión cerrada por inactividad"
- "Sesión expirada por tiempo"

## Checklist de Verificación

- El usuario no puede acceder a la aplicación tras cerrar y reabrir el navegador
- La sesión se cierra tras 30 minutos de inactividad
- Aparecen alertas visuales 5 minutos antes de expiración
- La actividad del usuario (mouse, teclado) renueva la sesión
- No quedan datos sensibles en localStorage

## Próximas Mejoras Recomendadas

1. **Tokens JWT con expiración** en el backend
2. **Refresh tokens** para renovación automática
3. **Múltiples niveles de timeout** según el rol del usuario
4. **Logs de seguridad** para auditoría
5. **Configuración dinámmica** de timeouts por administrador