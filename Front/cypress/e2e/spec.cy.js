describe('Prueba de formulario de inicio de sesión', () => {
  it('Rellena y envía el formulario de inicio de sesión', () => {
    cy.visit('localhost:5500') // Reemplaza con la URL de tu sitio web
    cy.contains('Iniciar Sesión').click()
    // Encuentra el iframe que contiene el formulario de inicio de sesión
    cy.get('iframe[name="prueba"]').then($iframe => {
      const $body = $iframe.contents().find('body')
      
     
      cy.wrap($body).within(() => {
     
        cy.get('#email').type('jegaray12@ucatolica.edu.co')
        cy.get('#pwd').type('javier12345')
        
     
        cy.get('#loginBtn').click()
        
     
        
     
        // cy.visit('localhost:5500')
        cy.get('cerrarSesionBtn').should('be.visible')
        cy.get('#iniciarsesion').should('not.be.visible')
      })
    })
  })
})
