describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset");
        cy.visit("http://localhost:3000");
        const user = {
            name: "Matti Luukkainen",
            username: "mluukkai",
            password: "salainen",
        };
        cy.request("POST", "http://localhost:3003/api/users", user);
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
});
