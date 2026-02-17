package com.ikernell.demo1.service;
import com.ikernell.demo1.entities.PersonaProyecto;
import com.ikernell.demo1.repositories.PersonaProyectoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PersonaProyectoService {

    private final PersonaProyectoRepository personaProyectoRepository;

    public PersonaProyectoService(PersonaProyectoRepository personaProyectoRepository){
        this.personaProyectoRepository = personaProyectoRepository;
    }

    public List<PersonaProyecto> listar(){
        return personaProyectoRepository.findAll();
    }

    public PersonaProyecto guardar(PersonaProyecto pp){
        return personaProyectoRepository.save(pp);
    }

    public void eliminar(Long id){
        personaProyectoRepository.deleteById(id);
    }
}
