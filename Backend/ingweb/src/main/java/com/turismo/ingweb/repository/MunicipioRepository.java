package com.turismo.ingweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.turismo.ingweb.model.Municipio;

@Repository
public interface MunicipioRepository extends JpaRepository<Municipio,Long>  {
    
}
