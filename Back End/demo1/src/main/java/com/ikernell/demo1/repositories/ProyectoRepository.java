package com.ikernell.demo1.repositories;
import com.ikernell.demo1.entities.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProyectoRepository extends JpaRepository<Proyecto,Long>{

    List<Proyecto> findByEstadoTrue();
    List<Proyecto> findByEstadoFalse();
}
