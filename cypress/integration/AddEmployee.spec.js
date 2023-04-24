/// <reference types="cypress" />

const fixtures = require('./data.json');

describe('Input, Save and Verify', () => {
    before(() => {

        //Go to wibsite
        cy.visit ('https://app.brighthr.com/lite')

        //Click Login CTA
        cy.get('.bg-white').click()
    
        //Enter user credentials, held in fixture file usercredentials.json
        cy.fixture('usercredentials').then((login)=>{

            cy.get('#email').type(login.email)
            cy.get('#password').type(login.password)
    
        })

        //Click Login CTA
        cy.get('.bg-accent-500').click()

        //Preogress through initial login modal
        cy.get(':nth-child(5) > .rounded').click()
        cy.wait(1000)
        cy.get('.gap-x-8 > .bg-white').click()
        cy.wait(1000)
        cy.get('.gap-x-8 > .text-white').click()
        cy.wait(1000)
        cy.get('.my-6 > .rounded').click()
        cy.wait(1000)

    })

    
//Input all records in fixture data.json
it ('Add all employees and check they are saved', () => {

cy.fixture('data.json').then((data) => {

    let index = 0;
    while (index < data.length) {

        const record = data[index];

        //Main fields
        cy.get('#firstName').type(record.firstname);
        cy.get('#lastName').type(record.surname);
        cy.get('#email').type(record.email);
        cy.get('#phoneNumber').type(record.phonenumber);
        cy.get('#jobTitle').type(record.jobtitle);

            if (record.subscribe) {
                cy.get('.sc-kgoBCf').click();
            }

        //Date Picker
        cy.get('.sc-jtRfpW').click()
        cy.get('.DayPicker-Day--today > .DayPicker-Day-Date > .DayPicker-Day-Circle > .DayPicker-Day-Number').click()

        //Save New Employee
        cy.get('.h-auto > .text-white').click()

        //Close Confirmation Modal
        cy.get('#close-modal').click()

        //Create additional employee
        cy.get('.my-6 > .rounded').click()
        
        //Increment count
        index++;

    }

});

    //Close input modal once all data has been inputted
    cy.get('#close-modal').click()


    //Validate records written are present

    cy.fixture('data.json').then((data) => {

        let index = 0;
        while (index < data.length) {
    
            const record = data[index];
    
            cy.contains((record.firstname+" "+record.surname), {include: 'visible'})
            cy.contains(record.jobtitle, {include: 'visible'})
            cy.contains(record.initials, {include: 'visible'})
    
            index++;
    
        }
    });

        })
    }
)