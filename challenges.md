# GABIX

Your name is Gregory House aka Dr.House. You are very well known for your Doctor skills, so much that you have a TV show...

But what people don't know is that you also are a web developper in your spare time. You develop a website that lists all your patients, this way you don't need your notebook anymore. Also, people can reach you and other doctors through a search bar. You already have 500 patients and 2000 doctors use are referenced, but you leak some features...

# Important: you can leave notes/comments in this markdown

## 0. Find your bearings

Launch the Angular project and the API.
To log into your [professional account](http://localhost:4200/login), you will need an username and a password. Check through the application to find it and become familiar with the architecture. Make sure to be connected to the database and explore the new data generated.

    # Notes:

## 1. Timestamp

### _Angular_

On your [patients professional page](http://localhost:4200/professional/patients), add a new column `Birthdate` to the table. The date should be formatted to be easily readable (eg: `Apr 3rd 23`).

    # Notes: Format should match localization

### _API_

Patients do not have the `createdAt` and `updatedAt` timestamps created by the API by default. Add them so they are returned by the API.

    # Bonus: => create a js migration script (in ./migration-scripts) that adds these fields to the existing data and run on the databse
    NB: you can use mongodb for vscode to watch database colelctions and run the script

    # Notes:

### _Fullstack_

Add a new column `createdAt` to the table of patients (human readable format).

## 2. CRUD

### _Angular_

Add a new button next to the patients table to add a new patient. When clicking on this button, a dialog open containing a form and ask for patient `firstname`, `lastname`, `email`, `phone` and `birthdate`. Only `firstname`, `lastname`, `email` are mandatory. When submitting the form, a `POST` http request is made containing the form values.

On success, the dialog close and the table is dynamically updated.

    # Notes:

### _API_

From the request above, create a new route to create a patient for my professional account.

    # for CI => create e2e and unit tests and run them before commit your changes

    # Notes:

## 3. Routing

### _Angular_

When clicking on a patient from the table, I am redirected to the page of the patient. There, I can see all the patient information on a beautiful page [as my own](http://localhost:4200/professional/me).

    # Notes:

### _API_

Create a route to GET a specific patient by ID only if it belongs to my professional account.

    # for CI => create e2e and unit tests and run them before commit your changes

    # Notes:

## 4. Optimization

### _Angular_

The result of the table should be paginated. I can choose between three different size of results: 25, 50, 100.

    # Notes:

### _API_

Optimize the request fetching patient so as a pagination, I can pass parameters dynamically to fetch what I want.

    # for CI => create e2e and unit tests and run them before commit your changes

    # Notes:

## 5. my_sorting

### _Angular and/or API_

Sort the result of the table, by clicking the header column.

    # Notes:

## 6. Fetch my doctor

### _API_

From the [search bar](http://localhost:4200/search) make an optimized request that fetch professionals by expertize and by PRL service enabled.
I can search with and without accent, in uppercase or lowercase.

    # for CI => create e2e and unit tests and run them before commit your changes

    # Notes:

### \_Fullstack - Front-end oriented

Implement a beautiful interface showing the interaction and the results of the API

    # Notes:

## 7. Code review:

in this challenge, you have to make a review of an existing code and submit your comments in th notes zone of this markdown
the files to review are:

### _Angular_

`/angular/src/app/protected/my-account/my-account.component.ts`  
`/angular/src/app/core/services/professional.service.ts`

    # Notes:

### _API_

`api/src/app/services/professional.service.ts`  
`gabix/api/src/app/services/patients.service.ts`

    # Notes:
