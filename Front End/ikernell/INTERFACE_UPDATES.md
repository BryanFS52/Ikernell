# Mejoras a la Interfaz Principal - Sistema de Gestión Ikernell

## Resumen de Cambios

Se ha mejorado significativamente la página de inicio del proyecto para permitir que:

1. **Personas sin autenticación** puedan ver la plataforma, noticias y hacer preguntas
2. **Coordinadores y personal autenticado** accedan a un dashboard completo con gestión
3. **Sistema de Q&A integrado** para comunicación entre clientes y empresa

---

## Características Nuevas

### 1. **Página Pública para Visitantes Anónimos**

**Ruta:** `/` (cuando no está autenticado)

Incluye:
- **Hero Section** - Presentación profesional
- **Noticias** - Últimas actualizaciones de la empresa
- **Formulario de Preguntas** - Visitantes pueden hacer preguntas sin login
  - Campo: Asunto
  - Campo: Pregunta completa
  - Campo: Nombre del solicitante
  - Campo: Email de contacto
- **Q&A Community** - Ver preguntas y respuestas de otros
- **Features** - Sección destacando características del sistema

**Diseño:**
- Fondo gradiente oscuro (profesional)
- Efecto glassmorphism
- Responsive en móvil

---

### 2. **Dashboard Privado para Usuarios Autenticados**

**Ruta:** `/` (cuando está autenticado)

**Bienvenida personalizada:**
- Saludo con nombre del usuario
- Rol actual

**Tarjetas de Acceso Rápido:**
- Proyectos
- Personas
- Actividades
- Reportes

**Secciones Principales:**

#### **Noticias (con privilegios)**
- Ver últimas noticias
- Coordinadores pueden publicar noticias
- Interfaz optimizada

#### **Preguntas Pendientes**
- Ver preguntas sin responder
- Responder directamente desde el dashboard
- Link para ver todas las preguntas

#### **Resumen Rápido (Sidebar)**
- Estadísticas de proyectos, personas, roles, etapas
- Mi Perfil - Información del usuario
- Acciones Rápidas contextuales

---

### 3. **Sistema de Preguntas y Respuestas (Q&A)**

#### **Para Visitantes Anónimos:**
- Hacer preguntas sin autenticación
- Ver preguntas existentes
- Leer respuestas de la empresa
- No pueden responder (solo personal autenticado)

#### **Para Personal Autenticado:**
- Ver todas las preguntas
- Responder directamente
- Filtrar por estado (Abierta, Respondida, Cerrada)
- Página dedicada: `/preguntas`

**Página de Preguntas Dedicada:**

```
/preguntas
```

Incluye:
- Filter: Todas | Abiertas | Respondidas | Cerradas
- Contador automático de preguntas por estado
- Vista expandible de cada pregunta
- Formulario de respuesta integrado
- Diseño responsive

---

## 📁 Archivos Creados/Modificados

### **Componentes Nuevos:**

| Archivo | Descripción |
|---------|-------------|
| [app/components/HomePublica.tsx](app/components/HomePublica.tsx) | Página de inicio para visitantes |
| [app/components/HomePrivada.tsx](app/components/HomePrivada.tsx) | Dashboard para usuarios autenticados |
| [app/components/FormularioPreguntaPublica.tsx](app/components/FormularioPreguntaPublica.tsx) | Formulario para hacer preguntas sin login |
| [app/components/SeccionPreguntas.tsx](app/components/SeccionPreguntas.tsx) | Componente Q&A reutilizable |

### **Páginas Nuevas:**

| Archivo | Descripción |
|---------|-------------|
| [app/preguntas/page.tsx](app/preguntas/page.tsx) | Página dedicada a preguntas y respuestas |

### **Tipos Actualizados:**

| Archivo | Cambios |
|---------|---------|
| [types/pregunta.ts](types/pregunta.ts) | Agregados campos: titulo, contenido, email, autor, estado, respuestas |

### **Servicios Actualizados:**

| Archivo | Cambios |
|---------|---------|
| [services/pregunta.service.ts](services/pregunta.service.ts) | 7 nuevas funciones para CRUD de preguntas |

### **Archivos Modificados:**

| Archivo | Cambios |
|---------|---------|
| [app/page.tsx](app/page.tsx) | Ahora renderiza HomePublica o HomePrivada según autenticación |

---

## API Endpoints Requeridos en Backend

### **Preguntas**

**GET** `/api/preguntas`
- Retorna: `Pregunta[]`
- Descripción: Obtener todas las preguntas

**GET** `/api/preguntas?estado=abierta|respondida|cerrada`
- Retorna: `Pregunta[]`
- Descripción: Obtener preguntas por estado

**POST** `/api/preguntas`
- Request:
  ```json
  {
    "titulo": "string",
    "contenido": "string",
    "email": "string",
    "autor": "string",
    "idPersona": "number (opcional)"
  }
  ```
- Response: `Pregunta`
- Descripción: Crear nueva pregunta

**POST** `/api/preguntas/{id}/respuestas`
- Request:
  ```json
  {
    "contenido": "string",
    "idPersona": "number"
  }
  ```
- Response: `Respuesta`
- Descripción: Responder una pregunta

**PUT** `/api/preguntas/{id}/cerrar`
- Descripción: Marcar pregunta como cerrada

**DELETE** `/api/preguntas/{id}`
- Descripción: Eliminar pregunta

---

## Flujos de Usuario

### **Visitante Anónimo:**

```
1. Entra a https://app.com/
   ↓
2. Ve HomePublica (hero, noticias, features)
   ↓
3. Scrollea a "Preguntas Frecuentes"
   ↓
4. Llena formulario: Asunto, Pregunta, Nombre, Email
   ↓
5. Presiona "Enviar Pregunta"
   ↓
6. Mensaje de éxito
   ↓
7. Ve lista de preguntas y respuestas existentes
   ↓
8. Puede hacer clic en una pregunta para ver respuesta completa
```

### **Usuario Autenticado (Coordinador):**

```
1. Hace login
   ↓
2. Ve HomePrivada (dashboard)
   ↓
3. Puede:
   - Ver noticias + PUBLICAR noticias
   - Ver preguntas pendientes
   - Responder preguntas directamente
   - Crear nuevos usuarios/proyectos
   ↓
4. Va a /preguntas para gestión completa
   ↓
5. Filtra por estado, responde, cierra
```

### **Usuario Autenticado (Técnico/Operario):**

```
1. Hace login
   ↓
2. Ve HomePrivada (dashboard)
   ↓
3. Puede:
   - Ver noticias
   - Ver preguntas pendientes
   - Responder preguntas (aportando conocimiento)
   - Acceder a su módulo de trabajo
```

---

## Estilos y Diseño

### **HomePublica:**
- Tema oscuro profesional (gradientes azules/púrpura)
- Efecto glassmorphism
- Animaciones suaves
- Responsive completo

### **HomePrivada:**
- Tema claro (gris/blanco)
- Tarjetas con colores que difierenciamos
- Sidebar derecho con acciones rápidas
- Gradientes en CTA

### **Formularios:**
- Bordes claros con focus states
- Validación integrada
- Mensajes de éxito/error
- Loader en botones

---

## Control de Acceso

**Visitantes:**
- Ver noticias
- Hacer preguntas
- Ver preguntas/respuestas
- No pueden responder preguntas
- No tienen acceso a módulos privados

**Coordinador de Proyectos:**
- Todo de visitante
- Publicar noticias
- Responder preguntas
- Crear usuarios
- Crear proyectos
- Ver reportes

**Otros Roles:**
- Ver noticias
- Responder preguntas
- Ver preguntas
- Funciones según su rol

---

## Implementación

### **Paso 1: Backend**
Implementar los endpoints de `/api/preguntas`

### **Paso 2: Testing**
1. Accede a `http://localhost:3000/` sin login
2. Verifica HomePublica
3. Completa formulario de pregunta
4. Haz login
5. Verifica HomePrivada
6. Ve a `/preguntas`
7. Prueba responder preguntas

### **Paso 3: Personalización**
- Actualizar colores según branding
- Agregar más datos a estadísticas
- Configurar permisos específicos por rol

---

## Responsive Design

Mobile (< 640px)
Tablet (640px - 1024px)
Desktop (> 1024px)

Todos los componentes son totalmente responsive.

---

## Configuración Requerida

En tu base de datos, asegúrate de tener:

```sql
-- Tabla de preguntas
CREATE TABLE preguntas (
    idPregunta INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255),
    contenido TEXT,
    autor VARCHAR(255),
    email VARCHAR(255),
    idPersona INT,
    estado ENUM('abierta', 'respondida', 'cerrada'),
    fechaCreacion DATETIME,
    FOREIGN KEY (idPersona) REFERENCES personas(idPersona)
);

-- Tabla de respuestas
CREATE TABLE respuestas (
    idRespuesta INT PRIMARY KEY AUTO_INCREMENT,
    idPregunta INT,
    idPersona INT,
    contenido TEXT,
    fechaCreacion DATETIME,
    FOREIGN KEY (idPregunta) REFERENCES preguntas(idPregunta),
    FOREIGN KEY (idPersona) REFERENCES personas(idPersona)
);
```

---

## 🐛 Troubleshooting

**"Preguntas no aparecen"**
- Verificar endpoint `/api/preguntas` está trabajando
- Revisar logs del backend

**"Los campos de pregunta no guardan"**
- Verificar POST `/api/preguntas` acepta los campos correctos
- Revisar CORS

**"HomePublica no se ve sin autenticación"**
- Verificar `useAuth()` está dentro de `AuthProvider`
- Revisar `layout.tsx` tiene `AppLayout`

---

## 📝 Próximas Mejoras

- [ ] Notificaciones en tiempo real (Socket.io)
- [ ] Ratings/Valoración de respuestas
- [ ] Búsqueda de preguntas
- [ ] Etiquetas/categorías en preguntas
- [ ] Email automático cuando se responde
- [ ] Panel de moderación (marcar como spam)
- [ ] Exportar preguntas/respuestas a PDF

