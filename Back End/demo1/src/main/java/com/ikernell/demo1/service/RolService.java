package com.ikernell.demo1.service;
import com.ikernell.demo1.entities.Rol;
import com.ikernell.demo1.repositories.RolRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RolService {

    private final RolRepository rolRepository;
    private static final List<String> ROLES_FIJOS = List.of(
            "Coordinador de proyectos",
            "Lider de proyectos",
            "Desarrollador"
    );

    public RolService(RolRepository rolRepository){
        this.rolRepository = rolRepository;
    }

    public List<Rol> listar(){
        return rolRepository.findAll();
    }

    public Rol buscarPorId(Long id){
        return rolRepository.findById(id).orElse(null);
    }

    public Rol guardar(Rol rol){
        if (rol.getNombre() == null || rol.getNombre().isBlank()) {
            throw new IllegalArgumentException("El nombre del rol no puede estar vacío.");
        }
        return rolRepository.save(rol);
    }

    public void eliminar(Long id){
        Rol rol = buscarPorId(id);
        if (rol == null) {

        if (ROLES_FIJOS.contains(rol.getNombre())) {
            throw new IllegalArgumentException("No se puede eliminar el rol fijo: " + rol.getNombre());
        }
        rolRepository.deleteById(id);
    }
    }


}
