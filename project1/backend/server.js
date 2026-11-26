import express from "express";
import cors from "cors";

const app = express();

const PORT = 5000;

 
// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());


// =====================================
// LOGIN USER
// =====================================

const loginUser = {
    email: "admin@project1.com",
    password: "admin123",
    name: "Admin"
};


// =====================================
// USERS
// =====================================

let users = [
    {
        id: 101,
        name: "CM",
        email: "cmrj88@gmail.com",
        department: "Computer Science"
    },

    {
        id: 102,
        name: "PM",
        email: "pmrj88@gmail.com",
        department: "Information Technology"
    },

    {
        id: 105,
        name: "Shubh",
        email: "shubh@gmail.com",
        department: "Management"
    },

    {
        id: 108,
        name: "Ananya",
        email: "ananya@gmail.com",
        department: "Design"
    }
];


// =====================================
// HOME
// =====================================

app.get("/", (req, res) => {

    res.send("PROJECT1 Backend is working!");

});


// =====================================
// LOGIN
// =====================================

app.post("/api/login", (req, res) => {

    const { email, password } = req.body;

    console.log("Login request received:");
    console.log("Email:", email);

    if (
        email === loginUser.email &&
        password === loginUser.password
    ) {

        console.log("Login successful");

        return res.json({

            success: true,

            message: "Login successful",

            user: {
                name: loginUser.name,
                email: loginUser.email
            }

        });

    }

    console.log("Login failed");

    return res.status(401).json({

        success: false,

        message: "Invalid email or password"

    });

});


// =====================================
// GET USERS
// =====================================

app.get("/api/users", (req, res) => {

    res.json(users);

});


// =====================================
// GET ONE USER
// =====================================

app.get("/api/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find(
        user => user.id === id
    );

    if (!user) {

        return res.status(404).json({
            message: "User not found"
        });

    }

    res.json(user);

});


// =====================================
// EDIT USER
// =====================================

app.put("/api/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const userIndex = users.findIndex(
        user => user.id === id
    );

    if (userIndex === -1) {

        return res.status(404).json({
            message: "User not found"
        });

    }

    const {
        name,
        email,
        department
    } = req.body;


    users[userIndex] = {

        ...users[userIndex],

        name: name,
        email: email,
        department: department

    };


    res.json({

        message: "User updated successfully",

        user: users[userIndex]

    });

});


// =====================================
// DELETE USER
// =====================================

app.delete("/api/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const userExists = users.some(
        user => user.id === id
    );

    if (!userExists) {

        return res.status(404).json({
            message: "User not found"
        });

    }


    users = users.filter(
        user => user.id !== id
    );


    res.json({

        message: "User deleted successfully"

    });

});


// =====================================
// START SERVER
// =====================================

app.listen(PORT, () => {

    console.log(
        `Backend running on http://localhost:${PORT}`
    );

});