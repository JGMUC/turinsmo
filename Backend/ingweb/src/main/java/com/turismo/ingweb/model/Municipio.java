package com.turismo.ingweb.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@Table(name="municipios")
public class Municipio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mun_id")
    private Long id;
    
    @Column(name ="mun_nombre")
    private String nombre;

    @Column(name = "mun_descripcion")
    private String descripcion;

    @Column(name = "mun_img")
    private String imagen;

}
