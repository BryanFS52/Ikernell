# Guía: Primer Acceso y Sistema de Noticias

## 1️⃣ PRIMER ACCESO AL SISTEMA

### ¿Cómo iniciar por primera vez?

Necesitas crear un usuario **Coordinador de Proyectos** inicial en tu base de datos.

---

## Pasos para Crear el Usuario Inicial

### **Opción 1: Directamente en la Base de Datos (SQL)**

Ejecuta este script en tu base de datos:

```sql
-- 1. Crear el rol "Coordinador de Proyectos" si no existe
INSERT INTO roles (nombre) VALUES ('Coordinador de Proyectos');

-- 2. Obtener el ID del rol (suele ser 1, pero verifica)
SELECT idRol FROM roles WHERE nombre = 'Coordinador de Proyectos';

-- 3. Crear el usuario coordinador
-- IMPORTANTE: La contraseña debe estar HASHEADA con bcrypt en tu backend
INSERT INTO personas (
    nombre,
    apellido,
    documento,
    usuario,
    contraseña,  -- Aquí va el hash bcrypt
    idRol,
    estado,
    direccion,
    profesion,
    especialidad,
    fechaNacimiento
) VALUES (
    'Administrador',
    'Sistema',
    '00000000',
    'admin',
    '$2b$10$...', -- Reemplaza con hash bcrypt de tu contraseña
    1,             -- ID del rol Coordinador
    true,
    'Empresa',
    'Coordinador',
    'Gestión',
    '1990-01-01'
);
```

### **¿Cómo generar el hash bcrypt?**

En tu backend (Node.js):

```javascript
const bcrypt = require('bcrypt');

const contraseña = 'admin123'; // Tu contraseña
const hash = bcrypt.hashSync(contraseña, 10);
console.log(hash); // $2b$10$...
```

Luego usa ese hash en el SQL anterior.

---

### **Opción 2: A través de un Endpoint Temporal (Recomendado)**

Crea un endpoint en tu backend SOLO para desarrollo:

```java
@PostMapping("/admin/crear-coordinador-inicial")
public ResponseEntity<?> crearCoordinadorInicial(@RequestBody AdminInitRequest request) {
    // Verificar que no exista coordinador
    Optional<Persona> coordinador = personaRepository
        .findByUsuario("admin");
    
    if (coordinador.isPresent()) {
        return ResponseEntity.badRequest()
            .body("Ya existe un coordinador en el sistema");
    }
    
    // Obtener rol
    Rol rol = rolRepository
        .findByNombre("Coordinador de Proyectos")
        .orElseThrow();
    
    // Crear persona
    Persona persona = new Persona();
    persona.setNombre(request.getNombre());
    persona.setApellido(request.getApellido());
    persona.setDocumento(request.getDocumento());
    persona.setUsuario(request.getUsuario());
    persona.setContraseña(
        bcryptPasswordEncoder.encode(request.getContraseña())
    );
    persona.setRol(rol);
    persona.setEstado(true);
    
    personaRepository.save(persona);
    
    return ResponseEntity.ok("Coordinador creado exitosamente");
}
```

Luego llama desde Postman:

```bash
POST /api/admin/crear-coordinador-inicial HTTP/1.1
Content-Type: application/json

{
  "nombre": "Administrador",
  "apellido": "Sistema",
  "documento": "00000000",
  "usuario": "admin",
  "contraseña": "admin123"
}
```

---

## Verificar que Funciona

1. Abre `http://localhost:3000/login`
2. Ingresa:
   - **Usuario:** `admin`
   - **Contraseña:** `admin123`
3. Deberías ver el dashboard privado

---

---

# 2️⃣ SISTEMA DE NOTICIAS

## ¿Cómo Funciona?

El sistema permite que el **Coordinador de Proyectos** publique noticias que todos los usuarios puedan ver.

---

## Endpoints Requeridos en Backend

### **GET** `/api/noticias`
Obtener todas las noticias

**Response:**
```json
[
  {
    "idNoticia": 1,
    "titulo": "Nueva actualización",
    "contenido": "Se agregó el módulo de Etapas...",
    "fecha": "2026-02-07"
  }
]
```

---

### **POST** `/api/noticias`
Crear nueva noticia

**Request:**
```json
{
  "titulo": "string",
  "contenido": "string"
}
```

**Response:**
```json
{
  "idNoticia": 2,
  "titulo": "Nueva actualización",
  "contenido": "Se agregó el módulo de Etapas...",
  "fecha": "2026-02-07"
}
```

---

### **PUT** `/api/noticias/{id}`
Actualizar noticia

**Request:**
```json
{
  "titulo": "Título actualizado",
  "contenido": "Contenido actualizado"
}
```

---

### **DELETE** `/api/noticias/{id}`
Eliminar noticia

---

## Ejemplo de Implementación (Spring Boot)

```java
@RestController
@RequestMapping("/api/noticias")
public class NoticiaController {
    
    @Autowired
    private NoticiaRepository noticiaRepository;
    
    // GET todas las noticias
    @GetMapping
    public ResponseEntity<List<Noticia>> obtenerTodas() {
        List<Noticia> noticias = noticiaRepository.findAll();
        return ResponseEntity.ok(noticias);
    }
    
    // POST crear noticia
    @PostMapping
    public ResponseEntity<Noticia> crearNoticia(@RequestBody NoticiaDTO dto) {
        Noticia noticia = new Noticia();
        noticia.setTitulo(dto.getTitulo());
        noticia.setContenido(dto.getContenido());
        noticia.setFecha(LocalDate.now());
        
        Noticia guardada = noticiaRepository.save(noticia);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }
    
    // PUT actualizar noticia
    @PutMapping("/{id}")
    public ResponseEntity<Noticia> actualizarNoticia(
            @PathVariable Long id,
            @RequestBody NoticiaDTO dto) {
        Noticia noticia = noticiaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("No encontrada"));
        
        noticia.setTitulo(dto.getTitulo());
        noticia.setContenido(dto.getContenido());
        
        return ResponseEntity.ok(noticiaRepository.save(noticia));
    }
    
    // DELETE eliminar noticia
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarNoticia(@PathVariable Long id) {
        noticiaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

// DTO
@Data
public class NoticiaDTO {
    private String titulo;
    private String contenido;
}
```

---

## Cómo Funciona en el Frontend

### **Para Visitantes (sin login):**
- Ver noticias publicadas
- No pueden publicar

### **Para Coordinador:**
- Ver noticias publicadas
- PUBLICAR nuevas noticias
- El formulario aparece en HomePrivada

### **Flujo de Publicación:**

1. Coordinador entra a dashboard (`/`)
2. Ve sección "Noticias" con formulario
3. Escribe el contenido
4. Presiona "Publicar Noticia"
5. Se envía **POST** a `/api/noticias`
6. La noticia se agrega a la lista
7. Todos los usuarios ven la noticia de inmediato

---

## Seguridad

**IMPORTANTE:**

El frontend ahora verifca que el usuario sea "Coordinador de Proyectos" antes de mostrar el formulario:

```typescript
{usuario?.rol.nombre === 'Coordinador de Proyectos' && (
    // Mostrar formulario
)}
```

Pero **debes validar también en el backend**:

```java
@PostMapping
@PreAuthorize("hasRole('COORDINADOR')")
public ResponseEntity<Noticia> crearNoticia(@RequestBody NoticiaDTO dto) {
    // Crear noticia
}
```

---

## Archivo de Tipo Noticia

```typescript
export interface Noticia {
    idNoticia: number;
    titulo: string;
    contenido: string;
    fecha: string;
}
```

---

## Prueba el Sistema

### 1. **Crear noticias desde Postman:**

```bash
POST http://localhost:8080/api/noticias HTTP/1.1
Content-Type: application/json

{
  "titulo": "Bienvenida al sistema",
  "contenido": "Este es nuestro nuevo sistema de gestión de proyectos"
}
```

### 2. **Verificar que aparecen:**
- Abre `http://localhost:3000/` sin login → Verás las noticias en HomePublica
- Login como Coordinador → Verás las noticias + formulario para publicar

### 3. **Publicar desde el Dashboard:**
- Login como Coordinador
- Ve al dashboard
- Sección "Noticias"
- Escribe y publica

---

## Resumen Rápido

| Feature | Sin Login | Coordinador | Otro Usuario |
|---------|-----------|-------------|--------------|
| Ver noticias | Sí | Sí | Sí |
| Publicar | No | Sí | No |
| Editar | No | No (pronto) | No |
| Eliminar | No | No (pronto) | No |

---

## Troubleshooting

### **"Error al agregar noticia"**
- Verifica que el endpoint POST `/api/noticias` existe
- Verifica CORS en tu backend
- Revisa logs del backend

### **El formulario no aparece**
- Verifica que el usuario tiene rol "Coordinador de Proyectos"
- Revisa el nombre exacto del rol en la BD

### **Las noticias no se cargan**
- Verifica GET `/api/noticias` en Postman
- Asegúrate que hay noticias en la BD
- Revisa errores en consola

