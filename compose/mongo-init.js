db = db.getSiblingDB('gabix')
db.createUser(
    {
        user: "api",
        pwd: "api",
        roles: [
            {
                role: "readWrite",
                db: "gabix"
            }
        ]
    }
);