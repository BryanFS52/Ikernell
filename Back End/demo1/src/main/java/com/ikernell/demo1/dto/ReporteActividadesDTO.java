package com.ikernell.demo1.dto;

public class ReporteActividadesDTO {

    private String proyecto;
    private Long totalActividades;
    private Long actividadesFinalizadas;
    private String estado;

    public ReporteActividadesDTO(String proyecto, Long totalActividades, Long actividadesFinalizadas, String estado) {
        this.proyecto = proyecto;
        this.totalActividades = totalActividades;
        this.actividadesFinalizadas = actividadesFinalizadas;
        this.estado = estado;
    }

    public String getProyecto() {
        return proyecto;
    }

    public Long getTotalActividades() {
        return totalActividades;
    }

    public Long getActividadesFinalizadas() {
        return actividadesFinalizadas;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public void setProyecto(String proyecto) {
        this.proyecto = proyecto;
    }

    public void setTotalActividades(Long totalActividades) {
        this.totalActividades = totalActividades;
    }

    public void setActividadesFinalizadas(Long actividadesFinalizadas) {
        this.actividadesFinalizadas = actividadesFinalizadas;
    }
}
