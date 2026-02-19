package com.ikernell.demo1.service;
import com.ikernell.demo1.entities.Persona;
import com.ikernell.demo1.entities.Proyecto;
import com.ikernell.demo1.entities.Rol;
import com.ikernell.demo1.repositories.PersonaRepository;
import com.ikernell.demo1.repositories.ProyectoRepository;
import com.ikernell.demo1.repositories.RolRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service

public class PersonaService {

    private final PersonaRepository personaRepository;
    private final RolRepository rolRepository;
    private final ProyectoRepository proyectosRepository;

    public PersonaService(PersonaRepository personaRepository, RolRepository rolRepository, ProyectoRepository proyectosRepository) {
        this.personaRepository = personaRepository;
        this.rolRepository = rolRepository;
        this.proyectosRepository = proyectosRepository;
    }

    public List<Persona> listarActivos(){
        return personaRepository.findByEstadoTrue();
    }

    public List<Persona> listarDesactivadas(){
        return personaRepository.findByEstadoFalse();
    }

    public List<Persona> listarParaAsignacionProyecto(){
        return personaRepository.findByEstadoTrueAndRol_NombreIn(
                List.of("Desarrollador","Lider de proyectos")
        );
    }

    public Persona buscarPorId(Long id){
        return personaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));
    }

    public Persona guardar(Persona persona){
        Rol rol = rolRepository.findById(persona.getRol().getIdRol())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
        persona.setRol(rol);
        persona.setEstado(true);
        return personaRepository.save(persona);
    }

    public Persona guardarConFoto(
            String nombre,
            String apellido,
            String documento,
            String direccion,
            String profesion,
            String especialidad,
            String correo,
            String idRol,
            String password,
            MultipartFile foto
    ) throws Exception {

        Persona persona = new Persona();

        persona.setNombre(nombre);
        persona.setApellido(apellido);
        persona.setDocumento(documento);
        persona.setDireccion(direccion);
        persona.setProfesion(profesion);
        persona.setEspecialidad(especialidad);
        persona.setCorreo(correo);
        persona.setPassword(password);
        persona.setEstado(true);

        if (foto != null && !foto.isEmpty()) {

            String fileName = System.currentTimeMillis() + "_" + foto.getOriginalFilename();

            Path uploadPath = Paths.get("uploads");

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Files.copy(foto.getInputStream(), uploadPath.resolve(fileName));

            persona.setFoto("http://localhost:8080/uploads/" + fileName);
        }

        Rol rol = rolRepository.findById(Long.parseLong(idRol))
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        persona.setRol(rol);

        return personaRepository.save(persona);
    }

    public Persona actualizar(Long id, Persona persona){
        Persona personaExistente = personaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        personaExistente.setNombre(persona.getNombre());
        personaExistente.setApellido(persona.getApellido());
        personaExistente.setDocumento(persona.getDocumento());
        personaExistente.setDireccion(persona.getDireccion());
        personaExistente.setProfesion(persona.getProfesion());
        personaExistente.setEspecialidad(persona.getEspecialidad());
        personaExistente.setFechaNacimiento(persona.getFechaNacimiento());
        personaExistente.setEstado(persona.getEstado());
        personaExistente.setCorreo(persona.getCorreo());

        if (persona.getPassword() != null && !persona.getPassword().isEmpty()){
            personaExistente.setPassword(persona.getPassword());
        }

        if (persona.getRol() != null && persona.getRol().getIdRol() != null){
            Rol rol = rolRepository.findById(persona.getRol().getIdRol())
                    .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
            personaExistente.setRol(rol);
        }
        return personaRepository.save(personaExistente);
    }

    public Persona actualizarConFoto(
            Long id,
            String nombre,
            String apellido,
            String documento,
            String direccion,
            String profesion,
            String especialidad,
            String correo,
            String idRol,
            String password,
            MultipartFile foto
    ) throws Exception {
        Persona personaExistente = personaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        personaExistente.setNombre(nombre);
        personaExistente.setApellido(apellido);
        personaExistente.setDocumento(documento);
        personaExistente.setDireccion(direccion);
        personaExistente.setProfesion(profesion);
        personaExistente.setEspecialidad(especialidad);
        personaExistente.setCorreo(correo);

        if (password != null && !password.isEmpty()) {
            personaExistente.setPassword(password);
        }

        if (foto != null && !foto.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + foto.getOriginalFilename();
            Path uploadPath = Paths.get("uploads");

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Files.copy(foto.getInputStream(), uploadPath.resolve(fileName));
            personaExistente.setFoto("http://localhost:8080/uploads/" + fileName);
        }

        Rol rol = rolRepository.findById(Long.parseLong(idRol))
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
        personaExistente.setRol(rol);

        return personaRepository.save(personaExistente);
    }

    public Persona actualizarProyectos(Long idPersona, List<Long> idsProyectos){
        Persona persona = personaRepository.findById(idPersona)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        List<Proyecto> proyectos = proyectosRepository.findAllById(idsProyectos);
        persona.setProyectos(proyectos);
        return personaRepository.save(persona);
    }

    public Persona login(String documento, String password){
        return personaRepository.findByDocumentoAndPassword(documento, password)
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));
    }

    public void desactivar(Long id){
        Persona persona = buscarPorId(id);
        persona.setEstado(false);
        personaRepository.save(persona);
    }

    public void reactivar(Long id){
        Persona persona = buscarPorId(id);
        persona.setEstado(true);
        personaRepository.save(persona);
    }
}