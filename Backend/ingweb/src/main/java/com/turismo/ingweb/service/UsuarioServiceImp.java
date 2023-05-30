package com.turismo.ingweb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.turismo.ingweb.model.Usuario;
import com.turismo.ingweb.repository.UsuarioRepository;

@Service
public class UsuarioServiceImp implements UsuarioService{
    @Autowired
    private UsuarioRepository uRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public List<Usuario> getUsuarios() {
        return uRepository.findAll();   
    }
    @Override
    public Usuario creaUsuario(Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return uRepository.save(usuario);
    }

    @Override
    public Usuario getUsuario(Long id) {
        Optional<Usuario> usuario=uRepository.findById(id);
        if (usuario.isPresent()){
            return usuario.get();
        }
        throw new RuntimeException("No se encontró el usuario con id:" + id); 

    }


    @Override
    public void deleteUsuario(Long id) {
        uRepository.deleteById(id);
    }


    @Override
    public Usuario updateUsuario(Usuario usuario) {
        
        try {
            Optional<Usuario> optionalUsuario = uRepository.findById(usuario.getId());
            if (optionalUsuario.isPresent()) {
                Usuario existingUsuario = optionalUsuario.get();
                existingUsuario.setEstado(usuario.getEstado());
                return uRepository.save(existingUsuario);
            }else{
                    throw new RuntimeException("Usuario no encontrado");
            }

        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Ya existe un usario con el mismo correo" ); 
        }
    }

}
