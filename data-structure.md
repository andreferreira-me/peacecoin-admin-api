// Users and admins
Users = {
    "_id" : "v94dGsPjsCqr7jKNP",
    "createdAt" : ISODate("2016-03-27T21:20:29.125Z"),
    "services" : {
            "password" : {
                    "bcrypt" : "$2a$10$5t9mPX8.LWCxSxp8stmfpOO6SvSiG3dRmuswU8fHxNcPdCymvbfx."
            }
    },
    "emails" : [
            {
                    "address" : "Delfina_Connelly84@gmail.com",
                    "verified" : false
            }
    ],
    "profile" : {
            "name" : {
                    "first" : "Esmeralda",
                    "last" : "Thiel"
            }
    }
};

// PeaceLabs Fake
Projects = {
    "_id" : "",
    "ownerId" : "", // Meteor.userId()
    "createdAt" : ISODate("2016-03-27T21:20:29.125Z"),
    "description" : String,
    "endDate" : ISODate("2016-03-27T21:20:29.125Z"),
    "image" : Image (GridFS),
    "active" : Boolean,
    "tasks" : {
      "name" : String,
      "value" : 15,
      "endDate" : ISODate("2016-03-27T21:20:29.125Z"),
    }
};

// Request all projects
projects.find();

// Request projects by ownerId
projects.find({ "ownerId" : Meteor.userId() });

// Request active projects
projects.find({ "active" : true });


// Accounts from Ethereum
Accounts = {
    "_id" : ""
};
