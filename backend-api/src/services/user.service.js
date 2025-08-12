const knex = require("../database/knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function userRepository() {
    return knex("users");
}

async function getUserInfo(payload) {
    return {
        username: payload.username,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
    };
}

async function create(payload) {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = {
        ...(await getUserInfo(payload)),
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
    };

    const [id] = await userRepository().insert(newUser);
    return { id, ...newUser };
}

async function update(userId, payload) {
    const user = await getUserById(userId);
    if (!user) {
        throw new Error("User not found.");
    }

    const updatedFields = {};
    if (payload.username) {
        updatedFields.username = payload.username;
    }
    if (payload.email) {
        updatedFields.email = payload.email;
    }
    if (payload.phone) {
        updatedFields.phone = payload.phone;
    }
    if (payload.role) {
        updatedFields.role = payload.role;
    }

    await userRepository()
        .where("user_id", userId)
        .update({
            ...updatedFields,
            updated_at: new Date(),
        });

    return await getUserById(userId);
}

async function remove(userId) {
    const user = await getUserById(userId);
    if (!user) {
        throw new Error("User not found.");
    }

    await userRepository().where("user_id", userId).del();

    return { message: "User deleted successfully." };
}

async function getAll() {
    const users = await userRepository().select(
        "user_id",
        "username",
        "email",
        "phone",
        "role",
        "created_at",
        "updated_at"
    );

    if (!users || users.length === 0) {
        throw new Error("User not found");
    }

    return users;
}

async function getUserByUsername(userName) {
    const user = await userRepository()
        .where("username", userName)
        .select("user_id", "username", "password", "role")
        .first();

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

async function getUserById(userId) {
    const user = await userRepository()
        .where("user_id", userId)
        .select(
            "user_id",
            "username",
            "email",
            "phone",
            "role",
            "created_at",
            "updated_at"
        )
        .first();

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

async function checkCredential(username, password) {
    const user = await getUserByUsername(username);
    if (!user) {
        throw new Error("User not found.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Invalid credential information.");
    }

    const token = jwt.sign(
        { id: user.user_id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "5h" }
    );

    return token;
}

module.exports = {
    create,
    getUserByUsername,
    getAll,
    getUserById,
    checkCredential,
    update,
    remove,
};
