package com.turismo.ingweb.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.turismo.ingweb.model.Municipio;

import com.turismo.ingweb.service.MunicipioService;

import jakarta.websocket.server.PathParam;

@RestController
public class municipiosController {
    
    @Autowired
    private MunicipioService mService;

    @GetMapping("/municipiospublic")
    public List<Municipio> getMunicipio (){
        return mService.getMunicipios();
    }

    @GetMapping("/municipios/{id}")
    public Municipio getMunicipio (@PathVariable("id") Long id){
        return mService.getMunicipio(id);
    }

    @DeleteMapping("/municipios/{id}")    
    public void deleteMunicipio (@PathVariable("id") Long id){
      mService.deleteMunicipio(id);
    }

    @PostMapping("/municipios")    
    public ResponseEntity<Municipio> createMunicipio (@RequestBody Municipio usuario){
       try{
           Municipio nuevomunicipio=mService.creaMunicipio(usuario);
           return ResponseEntity.ok().body(nuevomunicipio);
           
       }catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
       }
    }

}
