const userService = require("../services/user.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
    try {
        const newUser = await userService.create(req.body);

        return res
            .status(201)
            .set({
                Location: `${req.baseUrl}`,
            })
            .json(
                JSend.success({
                    newUser,
                })
            );
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating a new user.")
        );
    }
}

async function login(req, res, next) {
    console.log("Request Body:", JSON.stringify(req.body, null, 2));

    try {
        const { username, password } = req.body;
        console.log(username);
        const token = await userService.checkCredential(username, password);

        return res
            .status(200)
            .set({
                Location: `${req.baseUrl}`,
            })
            .json(JSend.success({ token }));
    } catch (error) {
        console.error(error);
        if (error.message === "User not found.") {
            return next(new ApiError(404, error.message));
        }
        if (error.message === "Invalid credential information.") {
            return next(new ApiError(401, error.message));
        }
        return next(
            new ApiError(
                500,
                "An error occurred while logging in to the website."
            )
        );
    }
}

async function getAllUser(req, res, next) {
    try {
        const users = await userService.getAll();

        if (!users) {
            return next(new ApiError(404, "User not found."));
        }

        return res
            .status(200)
            .set({
                Location: `${req.baseUrl}`,
            })
            .json(JSend.success({ users }));
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                "An error occurred while getting user information."
            )
        );
    }
}

async function getUser(req, res, next) {
    try {
        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return next(new ApiError(404, "User not found."));
        }

        return res
            .status(200)
            .set({
                Location: `${req.baseUrl}`,
            })
            .json(JSend.success({ user }));
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                "An error occurred while getting user information."
            )
        );
    }
}

async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        console.log(req.body);

        const userData = req.body.user || req.body;

        if (!userData) {
            return next(new ApiError(400, "User data is required"));
        }

        const { username, email, phone, role } = userData;

        const updateData = {};
        if (role) updateData.role = role;
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;

        const updatedUser = await userService.update(id, updateData);

        if (!updatedUser) {
            return next(new ApiError(404, "User not found."));
        }

        return res.status(200).json(JSend.success({ updatedUser }));
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while updating user.")
        );
    }
}

async function deleteUser(req, res, next) {
    try {
        const userId = req.params.id;
        const result = await userService.remove(userId);

        return res.status(200).json(JSend.success(result));
    } catch (error) {
        console.error(error);
        if (error.message === "User not found.") {
            return next(new ApiError(404, error.message));
        }
        return next(
            new ApiError(500, "An error occurred while deleting the user.")
        );
    }
}

module.exports = {
    register,
    login,
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
};
