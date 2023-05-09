package com.turismo.ingweb.service;

import java.util.List;

import com.turismo.ingweb.model.Usuario;

public interface UsuarioService {
    List <Usuario> getUsuarios();
    Usuario creaUsuario(Usuario usuario);
    Usuario getUsuario(Long id);

    void deleteUsuario(Long id);
    Usuario updateUsuario(Usuario usuario);
}
