package com.turismo.ingweb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.turismo.ingweb.model.Municipio;
import com.turismo.ingweb.repository.MunicipioRepository;

@Service
public class MunicipioServiceImp implements MunicipioService{
    @Autowired
    private MunicipioRepository mRepository;

    @Override
    public List<Municipio> getMunicipios() {
        return mRepository.findAll();  
    }

    @Override
    public Municipio creaMunicipio(Municipio municipio) {
        return mRepository.save(municipio);
    }

    @Override
    public Municipio getMunicipio(Long id) {
        Optional<Municipio> municipio=mRepository.findById(id);
        if (municipio.isPresent()){
            return municipio.get();
        }
        throw new RuntimeException("No se encontró el municipio con id:" + id); 
    }

    @Override
    public void deleteMunicipio(Long id) {
        mRepository.deleteById(id);
    }
}
