package com.turismo.ingweb.model;

import java.util.Date;

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
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usu_id")
    private Long id;
    
    @Column(name ="usu_email")
    private String username;

    @Column(name = "usu_password")
    private String password;
    
    @Column(name= "usu_nombres")
    private String nombres;

    @Column(name ="usu_tipo_identificacion")
    private String tipo_ident;

    @Column(name="usu_documento")
    private String documento;
    
    @Column(name ="usu_fecha_nacimiento")
    private Date fecha_nacimiento;
    
    @Column(name="usu_telefono")
    private String telefono;

    @Column(name ="usu_intereses ")
    private String intereses;
}
