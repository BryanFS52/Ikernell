package com.ikernell.demo1.repositories;
import com.ikernell.demo1.entities.Interrupcion;
import com.ikernell.demo1.entities.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InterrupcionRepository extends JpaRepository<Interrupcion,Long>{

    Long countByPersona(Persona persona);
    @Query("SELECT SUM(i.duracion) FROM Interrupcion i WHERE i.persona = :persona")
    Long sumDuracionByPersona(@Param("persona") Persona persona);
}
