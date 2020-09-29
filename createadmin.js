const prompt = require("prompt");
const bcrypt = require("bcrypt");
const Admin = require('./models/Admin')
const connectDB = require("./config/db");

const schema = {
    properties: {
        username: {
            pattern: /^[a-zA-Z\s\-]+$/,
            message: "Name must be only letters, spaces, or dashes",
            required: true,
        },
        name: {
            pattern: /^[a-zA-Z\s\-]+$/,
            message: "Name must be only letters, spaces, or dashes",
            required: true,
        },
        password: {
            hidden: true,
        },
        password_confirm: {
            hidden: true,
        },
    },
};

connectDB().then(() => {
    prompt.start();

    prompt.get(schema, async function (err, result) {
        try {
            if (err) {
                return onErr(err);
            }
            if (result.password !== result.password_confirm) {
                console.log("Passwords doesnt match");
                return 1;
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(result.password, salt);

            let admin = new Admin({
                username: result.username,
                name: result.name,
                password: hash,
                role: 1
            })

            admin.save().then(() => {
                console.log("Admin terdaftar sebagai berikut: ");
                console.log("  Username: " + result.username);
                console.log("  Name: " + result.name);
                console.log("  Password: " + result.password);
                process.exit();
            });
        } catch (err) {
            console.log(err);
            process.exit();
        }
    });
})