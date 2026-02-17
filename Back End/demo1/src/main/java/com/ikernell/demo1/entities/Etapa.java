package com.ikernell.demo1.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "etapas")
@Getter
@Setter
public class Etapa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEtapa;

    private String nombre;
    private String descripcion;

    protected Etapa() {
    }

    @ManyToOne
    @JoinColumn(name = "id_proyecto")
    @JsonIgnore
    private Proyecto proyecto;

    public Etapa(Long idEtapa, String nombre, String descripcion) {
        this.idEtapa = idEtapa;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    public String getNombreProyecto() {
        return proyecto != null ? proyecto.getNombre() : null;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getIdEtapa() {
        return idEtapa;
    }

    public void setIdEtapa(Long idEtapa) {
        this.idEtapa = idEtapa;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }
}
