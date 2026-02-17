const API_URL = 'http://localhost:8080/api';

async function fetchApi(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
            throw new Error(`Error ${response.status}: ${error.message}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error en ${endpoint}:`, error.message);
        throw error;
    }
}

async function crearUsuarioCoordinador() {
    console.log('Iniciando creación de usuario coordinador...\n');

    try {
        // 1. Buscar el rol "Coordinador de proyectos"
        console.log('1. Buscando rol "Coordinador de proyectos"...');
        let roles = [];
        try {
            roles = await fetchApi('/roles');
        } catch (error) {
            console.log('Error al obtener roles:', error.message);
            throw new Error('No se puede conectar con la API de roles. Verifica que el servidor esté corriendo.');
        }

        const rolAdmin = roles.find(rol => 
            rol.nombre === 'Coordinador de proyectos'
        );

        // 2. Verificar que existe el rol
        if (!rolAdmin) {
            throw new Error('El rol "Coordinador de proyectos" no existe en el sistema. Los roles disponibles son: ' + roles.map(r => r.nombre).join(', '));
        } else {
            console.log('Rol "Coordinador de proyectos" encontrado:', rolAdmin);
        }

        // 3. Verificar si el usuario ya existe
        console.log('3. Verificando si el usuario ya existe...');
        let personas = [];
        try {
            personas = await fetchApi('/personas');
            const usuarioExiste = personas.find(p => 
                p.documento === '123456789' || p.usuario === '123456789'
            );
            
            if (usuarioExiste) {
                console.log('El usuario con documento 123456789 ya existe:');
                console.log('   ID:', usuarioExiste.idPersona);
                console.log('   Nombre:', usuarioExiste.nombre, usuarioExiste.apellido);
                console.log('   Usuario:', usuarioExiste.usuario);
                console.log('\n¿Deseas continuar y actualizar este usuario? (y/N)');
                
                console.log('Script terminado. Para actualizar el usuario, modifica el script o hazlo manualmente.');
                return;
            }
        } catch (error) {
            console.log('No se pudieron verificar usuarios existentes, continuando...');
        }

        // 4. Crear el usuario coordinador
        console.log('4. Creando usuario coordinador...');
        const nuevoUsuario = {
            nombre: 'Coordinador',
            apellido: 'Sistema',
            documento: '123456789',
            usuario: '123456789',
            contraseña: 'admin123',
            estado: true,
            rol: rolAdmin,
            profesion: 'Coordinador de Proyectos',
            especialidad: 'Gestión de Proyectos'
        };

        const usuarioCreado = await fetchApi('/personas', {
            method: 'POST',
            body: JSON.stringify(nuevoUsuario)
        });

        console.log('\n ¡Usuario coordinador creado exitosamente!');
        console.log('Detalles del usuario:');
        console.log('   ID:', usuarioCreado.idPersona);
        console.log('   Nombre:', usuarioCreado.nombre, usuarioCreado.apellido);
        console.log('   Documento:', usuarioCreado.documento);
        console.log('   Usuario:', usuarioCreado.usuario || usuarioCreado.documento);
        console.log('   Rol:', usuarioCreado.rol.nombre);
        
        console.log('\nCredenciales de acceso:');
        console.log('   Usuario: 123456789');
        console.log('   Contraseña: admin123');
        
        console.log('\nYa puedes iniciar sesión en el sistema con estas credenciales.');

    } catch (error) {
        console.error('\nError al crear el usuario coordinador:');
        console.error('   Mensaje:', error.message);
        console.error('\nAsegúrate de que:');
        console.error('   - El servidor backend esté ejecutándose en http://localhost:8080');
        console.error('   - La base de datos esté accesible');
        console.error('   - Los endpoints de la API estén funcionando correctamente');
        console.error('   - Los roles iniciales (Coordinador de proyectos, Lider de proyectos, Desarrollador) estén creados en la BD');
        
        process.exit(1);
    }
}

// Ejecutar el script
if (require.main === module) {
    crearUsuarioCoordinador();
}

module.exports = { crearUsuarioCoordinador };