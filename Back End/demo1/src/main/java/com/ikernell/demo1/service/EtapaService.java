package com.ikernell.demo1.service;
import com.ikernell.demo1.entities.Etapa;
import com.ikernell.demo1.repositories.EtapaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EtapaService {

    private final EtapaRepository etapaRepository;

    public EtapaService(EtapaRepository etapaRepository){
        this.etapaRepository = etapaRepository;
    }

    public List<Etapa> listar(){
        return etapaRepository.findAll();
    }

    public Etapa buscarPorId(Long id){
        return etapaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Etapa no encontrada con id: " + id));
    }

    public Etapa guardar(Etapa etapa){
        return etapaRepository.save(etapa);
    }

    public void eliminar(Long id){
        etapaRepository.deleteById(id);
    }
}
