describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
        cy.visit("");
        const user = {
            name: "Matti Luukkainen",
            username: "mluukkai",
            password: "salainen",
        };
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    });

    it("Login form is shown", function () {
        cy.contains("log in to application");
    });

    describe("Login", function () {
        it("succeeds with correct credentials", function () {
            cy.contains("username").find("input").type("mluukkai");
            cy.contains("password").find("input").type("salainen");
            cy.contains("login").click();
            cy.contains("blog");
        });

        it("fails with wrong credentials", function () {
            cy.contains("username").find("input").type("wrong");
            cy.contains("password").find("input").type("pass");
            cy.contains("login").click();
            cy.contains("invalid");
        });
    });

    describe("When logged in", function () {
        beforeEach(function () {
            cy.login({ username: "mluukkai", password: "salainen" });
        });

        it("A blog can be created", function () {
            cy.contains("new blog").click();
            cy.get("#newTitle").type("titleTest");
            cy.get("#newAuthor").type("authorTest");
            cy.get("#newUrl").type("urlTest");
            cy.contains("Title").parent().contains("create").click();
            cy.contains("titleTest");
            cy.contains("authorTest");
        });

        describe.only("When several blogs exist", function () {
            beforeEach(function () {
                cy.createBlog({
                    title: "Title1",
                    author: "Author1",
                    url: "url1",
                });
                cy.createBlog({
                    title: "Title2",
                    author: "Author2",
                    url: "url2",
                });
                cy.createBlog({
                    title: "Title3",
                    author: "Author3",
                    url: "url3",
                });
            });

            it("users can like blog", function () {
                cy.contains("Title1").parent().contains("Show").click();
                cy.contains("likes")
                    .contains("0")
                    .contains("like")
                    .click()
                    .parent()
                    .contains("1");
            });
        });
    });
});
