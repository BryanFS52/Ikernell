package com.ikernell.demo1.repositories;
import com.ikernell.demo1.entities.Actividad;
import com.ikernell.demo1.entities.EstadoActividad;
import com.ikernell.demo1.entities.Persona;
import com.ikernell.demo1.entities.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ActividadRepository extends JpaRepository<Actividad, Long> {

    Long countByPersona(Persona persona);

    @Query("SELECT COUNT(a) FROM Actividad a WHERE a.persona = :persona AND a.estado = :estado")
    Long countByPersonaAndEstadoNombre(@Param("persona") Persona persona,
                                       @Param("estado") EstadoActividad estado);


    List<Actividad> findByProyecto(Proyecto proyecto);
}

