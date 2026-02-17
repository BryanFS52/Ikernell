package com.ikernell.demo1.service;
import com.ikernell.demo1.entities.Interrupcion;
import com.ikernell.demo1.repositories.InterrupcionRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InterrupcionService {

    private final InterrupcionRepository interrupcionRepository;

    public InterrupcionService(InterrupcionRepository interrupcionRepository){
        this.interrupcionRepository = interrupcionRepository;
    }

    public List<Interrupcion> listar(){
        return interrupcionRepository.findAll();
    }

    public Interrupcion buscarPorId(Long id){
        return interrupcionRepository.findById(id).orElse(null);
    }

    public Interrupcion guardar(Interrupcion interrupcion){
        return interrupcionRepository.save(interrupcion);
    }

    public void eliminar(Long id){
        interrupcionRepository.deleteById(id);
    }
}
