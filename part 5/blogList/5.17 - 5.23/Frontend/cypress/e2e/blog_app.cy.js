describe('Blog App', function () {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user ={
      name: 'Username',
      username: 'username',
      password: 'password'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })
  it('front page can be opened', function() {
    cy.contains('Login')
  })
  it('Login form is shown', function() {
    cy.contains('Login').click()
  })
  it('user can login', function() {
    cy.contains('Login').click()
    cy.get('input:first').type('username')
    cy.get('input:last').type('password')
    cy.get('#login-button').click()

    cy.contains('Username logged in')
  })
  it('login fails with wrong password', function () {
    cy.contains('Login').click()
    cy.get('input:first').type('Wrong Username')
    cy.get('input:last').type('Wrong Password')
    cy.get('#login-button').click()

    cy.get('#notificationMsg').should('contain','Wrong Credentials').and('have.css', 'color', 'rgb(255, 0, 0)')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'username', password: 'password' })
    })


    it('a new note can be created', function() {
      cy.contains('Add Blog').click()
      cy.get('#title-input').type('a new blog')
      cy.get('#author-input').type('the first author')
      cy.get('#url-input').type('www.example.com')
      cy.contains('Submit').click()
      cy.contains('Blog has been added successfully')
    })

    describe('a blog already exists', function () {
      beforeEach(function() {
        cy.createBlog({
          title: 'a new blog',
          author: 'the first author',
          url: 'www.example.com'
        })
      })

      it('a blog can be hidden and shown', function () {
        cy.contains('a new blog').contains('Show').click()

        cy.contains('a new blog').contains('Hide')
      })
    })

    describe('when several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a new blog',
          author: 'the first author',
          url: 'www.example.com'
        })
        cy.createBlog({
          title: 'a new blog 2',
          author: 'the first author 2',
          url: 'www.example.com 2'
        })
        cy.createBlog({
          title: 'a new blog 3',
          author: 'the first author 3',
          url: 'www.example.com 3'
        })
      })

      it('one blog can be liked', function () {
        cy.contains('a new blog 3').contains('Show').click()
        cy.contains('a new blog 3').parent().find('button:last').as('likeButton')
        cy.get('@likeButton').click()
        cy.contains('a new blog 3').parent().find('p:last').contains('1')
      })

      it('one blog can be deleted by the owner', function () {
        cy.contains('a new blog 3').contains('Show').click()
        cy.contains('a new blog 3').parent().find('#delete-button').as('deleteButton')
        cy.get('@deleteButton').click()
        cy.get('.notificationMsg').contains('Blog has been deleted successfully')
      })

      it('other users cannot delete blogs', function () {
        cy.contains('Logout').click()
        const anotherUser = {
          name: 'Username1',
          username: 'username1',
          password: 'password'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, anotherUser)
        cy.visit('')
        cy.login({ username: 'username1', password: 'password' })
        cy.contains('a new blog 3').contains('Show').click()
        cy.contains('a new blog 3').should('not.contain', '#delete-button')
      })

      describe('when multiple blogs have likes', function () {
        it('blogs are arranged in asencding order according to their likes', function () {
          cy.get('.blog').eq(2).contains('Show').click()
          cy.get('.blog').eq(2).contains('Like').click()
          cy.get('.blog').eq(0).contains('a new blog 3')
        })
      })
    })
  })
})