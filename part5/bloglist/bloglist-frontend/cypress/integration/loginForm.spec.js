describe('Blog app', function () {
    const user = {
        name: 'Svitlana Chaplinska',
        username: 'svitlana.exe',
        password: 'qwerty'
    }

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/reset');
        cy.request('POST', 'http://localhost:3001/api/users/', user);

        cy.visit('http://localhost:3000');
    })

    it('Login form is shown', function () {
        cy.get('[data-testid="login-form"]').should('be.visible');
    })

    describe('Login', function () {
        it('succeeds with correct credentials and logout', function () {
            cy.get('[data-testid="input-username"]').type(user.username);
            cy.get('[data-testid="input-password"]').type(user.password);
            cy.get('[data-testid="login-button"]').click();
            cy.get('[data-testid="login-form"]').should('not.exist');
            cy.get('[data-testid="title-blogs"]').should('have.text', 'blogs');
            cy.get('[data-testid="logout-button"]').click();
            cy.get('[data-testid="login-form"]').should('be.visible');
        })

        it('fails with wrong credentials', function () {
            cy.get('[data-testid="input-username"]').type('blahblahblah');
            cy.get('[data-testid="input-password"]').type('wrong-password');
            cy.get('[data-testid="login-button"]').click();
            cy.get('[data-testid="message"]').should('have.text', 'wrong password or username');
        })
    });

    describe('When logged in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3001/api/users/login', {
                username: user.username, password: user.password
            }).then(response => {
                localStorage.setItem('user', JSON.stringify(response.body))
                cy.visit('http://localhost:3000');
            })
        });

        it('A blog can be created and liked and eventually removed', function () {
            cy.get('[data-testid="show-blog-creation-button"]').click();
            cy.get('[data-testid="input-title"]').type('Title1');
            cy.get('[data-testid="input-author"]').type('Author1');
            cy.get('[data-testid="input-url"]').type('Url1');
            cy.get('[data-testid="button-create-blog"]').click();

            cy.get('[data-testid="message"]').should('have.text', 'a new blog Title1 by Author1 added');
            cy.visit('http://localhost:3000');

            cy.get('[data-testid=blog-Title1]').should('be.visible');

            cy.get('[data-testid="button-view"]').click();
            cy.get('[data-testid="likes"]').should('have.text', 'likes 0');
            cy.get('[data-testid="button-like"]').click();
            cy.get('[data-testid="likes"]').should('have.text', 'likes 1');

            cy.get('[data-testid="button-remove"]').click();
            cy.get('[data-testid="blog-Title1]').should('not.exist');
        })

        it('A blog can be created and sorted by likes', function () {
            cy.get('[data-testid="show-blog-creation-button"]').click();
            for (let i = 0; i < 3; i++) {
                cy.get('[data-testid="input-title"]').clear().type(`Title${i}`);
                cy.get('[data-testid="input-author"]').clear().type(`Author${i}`);
                cy.get('[data-testid="input-url"]').clear().type(`Url${i}`);
                cy.get('[data-testid="button-create-blog"]').click();
                cy.get('[data-testid="message"]').should('have.text', `a new blog Title${i} by Author${i} added`);
            }

            cy.visit('http://localhost:3000');

            cy.get('[data-testid="button-view"]').eq(2).click();
            cy.get('[data-testid="button-like"]').click();
            cy.get('[data-testid="likes"]').should('have.text', 'likes 0');

            cy.get('[data-testid="button-view"]').eq(0).click();
            cy.get('[data-testid="likes"]').eq(0).should('have.text', 'likes 1');
        })
    })
})