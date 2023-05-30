package com.turismo.ingweb.controller;

import java.util.List;


import com.turismo.ingweb.dto.AuthRequest;
import com.turismo.ingweb.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.core.Authentication;

import com.turismo.ingweb.service.JwtService;
import com.turismo.ingweb.service.UsuarioService;

@RestController
@CrossOrigin("*")
public class UsuarioController {
    @Autowired
    private UsuarioService uService;
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @GetMapping("/usuarios")
    public List<Usuario> getUsuarios (){
        return uService.getUsuarios();
    }
    @GetMapping("/usuarios/{id}")
    public Usuario getUsuario (@PathVariable("id") Long id){
        return uService.getUsuario(id);
    }

    @DeleteMapping("/usuarios")    
    public void deleteUsuario (@RequestParam("id") Long id){
      uService.deleteUsuario(id);
    }

    @PostMapping("/usuario")    
    public ResponseEntity<Usuario> createUsuario (@RequestBody Usuario usuario){
       try{
           Usuario nuevoUsuario=uService.creaUsuario(usuario);
           return ResponseEntity.ok().body(nuevoUsuario);
           
       }catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
       }
    }

    @PutMapping("/usuarios/{id}")    
    public Usuario updateUsuario (@PathVariable("id") Long id,@RequestBody Usuario usuario){
        usuario.setId(id);
        return uService.updateUsuario (usuario);
    }



    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            
            throw new UsernameNotFoundException("invalid user request !");
        }

    }

}
