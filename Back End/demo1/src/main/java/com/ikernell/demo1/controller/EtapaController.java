package com.ikernell.demo1.controller;
import com.ikernell.demo1.entities.Etapa;
import com.ikernell.demo1.service.EtapaService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/etapas")
@CrossOrigin(origins = "*")

public class EtapaController {

    private EtapaService etapaService;

    public EtapaController(EtapaService etapaService){
        this.etapaService = etapaService;
    }

    @GetMapping
    public List<Etapa> listar(){
        return etapaService.listar();
    }

    @GetMapping("/{id}")
    public Etapa buscarPorId(@PathVariable Long id){
        return etapaService.buscarPorId(id);
    }

    @PostMapping
    public Etapa guardar(@RequestBody Etapa etapa){
        return etapaService.guardar(etapa);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        etapaService.eliminar(id);
    }
}
