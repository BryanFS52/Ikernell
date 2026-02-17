package com.ikernell.demo1.service;
import com.ikernell.demo1.entities.Servicio;
import com.ikernell.demo1.repositories.ServicioRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServicioService {

    private final ServicioRepository servicioRepository;

    public ServicioService(ServicioRepository servicioRepository){
        this.servicioRepository = servicioRepository;
    }

    public List<Servicio> listar(){
        return servicioRepository.findAll();
    }

    public Servicio guardar(Servicio servicio){
        return servicioRepository.save(servicio);
    }

    public void eliminar(Long id){
        servicioRepository.deleteById(id);
    }
}
