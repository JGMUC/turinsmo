package com.turismo.ingweb.service;

import java.util.List;


import com.turismo.ingweb.model.Municipio;

public interface MunicipioService {
    List <Municipio> getMunicipios();
    Municipio creaMunicipio(Municipio municipio);
    Municipio getMunicipio(Long id);

    void deleteMunicipio(Long id);
    
}
