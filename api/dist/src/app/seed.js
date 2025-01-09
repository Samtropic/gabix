import Patient from "./models/patient";
import Professional from "./models/professional";
import Core from "./models/core";
import Expertize from "./models/expertize";
import { faker } from "@faker-js/faker";
import { mergeMap, tap, of, from, zip, take } from "rxjs";
const MAX_PATIENTS = 500;
const MAX_PROFESSIONALS = 200;
const MAX_EXPERTIZES = 4;
function handleBulkresults(results, max, collection) {
    return results.pipe(mergeMap((inserted) => {
        return of(inserted.insertedCount === max);
    }), tap((inserted) => inserted
        ? console.log(`Created ${max} ${collection}`)
        : console.log(`no ${collection} created`)));
}
function generateMyPatients() {
    return handleBulkresults(from(Professional.findOne({
        email: "gregory-house@yopmail.com",
    })).pipe(mergeMap((professional) => {
        const patients = [];
        for (let i = 0; i < MAX_PATIENTS; i++) {
            patients.push({
                insertOne: {
                    document: {
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName(),
                        email: faker.internet.email(),
                        birthdate: faker.date.birthdate(),
                        phone: faker.phone.number("+33 6 ## ## ## ##"),
                        professional,
                    },
                },
            });
        }
        return from(Patient.bulkWrite(patients));
    })), MAX_PATIENTS, "patients");
}
function generateExpertizes() {
    const exprtizes = [
        {
            insertOne: {
                document: {
                    label: {
                        female: "Psychomotricienne",
                        male: "Psychomotricien",
                        unknown: "Psychomotricien(ne)",
                    },
                },
            },
        },
        {
            insertOne: {
                document: {
                    label: {
                        female: "Ergothérapeute",
                        male: "Ergothérapeute",
                        unknown: "Ergothérapeute",
                    },
                },
            },
        },
        {
            insertOne: {
                document: {
                    label: {
                        female: "Médecin",
                        male: "Médecin",
                        unknown: "Médecin",
                    },
                },
            },
        },
        {
            insertOne: {
                document: {
                    label: {
                        female: "Orthophoniste",
                        male: "Orthophoniste",
                        unknown: "Orthophoniste",
                    },
                },
            },
        },
    ];
    return handleBulkresults(from(Expertize.bulkWrite(exprtizes)), MAX_EXPERTIZES, "expertizes");
}
function generateMyProfessionalAccount() {
    return handleBulkresults(from(Expertize.findOne({ "label.unknown": "Médecin" })).pipe(mergeMap((expertize) => {
        const pro = {
            firstName: "Gregory",
            lastName: "House",
            email: "gregory-house@yopmail.com",
            birthdate: faker.date.birthdate(),
            phone: faker.phone.number("+33 6 ## ## ## ##"),
            mainExpertize: expertize,
            password: "greg2000",
            about: faker.random.words(50),
            services: { prl: { enabled: false } },
            address: {
                city: faker.address.city(),
                country: faker.address.countryCode(),
            },
            isConfirmed: {
                email: true,
            },
        };
        return from(Professional.bulkWrite([{ insertOne: { document: pro } }]));
    })), 1, "professionalAccount");
}
function generateRandomProfessionalAccounts() {
    return handleBulkresults(from(Expertize.find({})).pipe(mergeMap((expertize) => {
        const inserts = [];
        console.log("creating Professionals...wait");
        for (let i = 0; i < MAX_PROFESSIONALS; i++) {
            inserts.push({
                insertOne: {
                    document: {
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName(),
                        email: faker.internet.email(),
                        birthdate: faker.date.birthdate(),
                        phone: faker.phone.number("+33 6 ## ## ## ##"),
                        services: { prl: { enabled: faker.datatype.boolean() } },
                        mainExpertize: expertize[Math.floor(Math.random() * MAX_EXPERTIZES - 1)],
                        password: faker.internet.password(),
                        about: faker.random.words(10),
                        isConfirmed: { email: faker.datatype.boolean() },
                        address: {
                            city: faker.address.city(),
                            country: faker.address.countryCode(),
                        },
                    },
                },
            });
        }
        return from(Professional.bulkWrite(inserts));
    })), MAX_PROFESSIONALS, "professionals");
}
export function generateSeedIfNeeded() {
    console.log("Generating data...");
    console.log("Please do not stop the process and wait a few minutes for the initialization.");
    zip(generateExpertizes(), generateMyProfessionalAccount())
        .pipe(mergeMap((results) => {
        return results.every((r) => r)
            ? zip(generateRandomProfessionalAccounts(), generateMyPatients())
            : zip(of(false));
    }), mergeMap((results) => results.every((r) => r)
        ? from(new Core({
            generatedSeed: true,
        }).save())
        : of(false)), take(1))
        .subscribe((data) => {
        if (data) {
            console.log("test Data generated");
        }
        else {
            console.log("an error occured");
        }
    });
}
//# sourceMappingURL=seed.js.map