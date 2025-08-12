const express = require("express");
const multer = require("multer");
const userController = require("../controllers/user.controller");
const { swaggerUi } = require("../docs/swagger");

const upload = multer();

const userRouter = express.Router();

module.exports.setup = (app) => {
    app.use("/api/v1/user", userRouter);

    /**
     * @swagger
     * /api/v1/user/register:
     *  post:
     *      summary: Register new user
     *      description: Create a new user account
     *      requestBody:
     *        required: true
     *        content:
     *          multipart/form-data:
     *            schema:
     *              $ref: '#/components/schemas/UserRegister'
     *      tags:
     *        - User Management
     *      responses:
     *          201:
     *               $ref: '#/components/responses/201'
     *          500:
     *               $ref: '#/components/responses/500'
     */
    userRouter.post("/register", upload.none(), userController.register);

    /**
     * @swagger
     * /api/v1/user/login:
     *  post:
     *      summary: User login
     *      description: User login to account
     *      requestBody:
     *        required: true
     *        content:
     *          multipart/form-data:
     *            schema:
     *              $ref: '#/components/schemas/UserLogin'
     *      tags:
     *        - User Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          404:
     *              $ref: '#/components/responses/404'
     *          401:
     *              $ref: '#/components/responses/401'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    userRouter.post("/login", upload.none(), userController.login);

    /**
     * @swagger
     * /api/v1/user:
     *  get:
     *      summary: Get all user
     *      description: Retrieve all users detail
     *      tags:
     *        - User Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          404:
     *              $ref: '#/components/responses/404'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    userRouter.get("/", upload.none(), userController.getAllUser);

    /**
     * @swagger
     * /api/v1/user/{id}:
     *  get:
     *      summary: Get user by ID
     *      description: Retrieve user details by user ID
     *      parameters:
     *        - $ref: '#/components/parameters/userId'
     *      tags:
     *        - User Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          404:
     *              $ref: '#/components/responses/404'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    userRouter.get("/:id", upload.none(), userController.getUser);

    /**
     * @swagger
     * /api/v1/user/{id}:
     *  put:
     *      summary: Update user by ID
     *      description: Update user details by user ID
     *      parameters:
     *          - $ref: '#/components/parameters/userId'
     *      requestBody:
     *        required: true
     *        content:
     *          multipart/form-data:
     *            schema:
     *              type: object
     *              properties:
     *                username:
     *                  type: string
     *                  description: The new username of the user
     *                email:
     *                  type: string
     *                  description: The new email of the user
     *                phone:
     *                  type: string
     *                  description: The new phone number of the user
     *                role:
     *                  type: string
     *                  description: The role of the user (user or admin)
     *                  enum:
     *                    - user
     *                    - admin
     *      tags:
     *        - User Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          404:
     *              $ref: '#/components/responses/404'
     *          500:
     *              $ref: '#/components/responses/500'
     */

    userRouter.put("/:id", upload.none(), userController.updateUser);

    /**
     * @swagger
     * /api/v1/user/{id}:
     *  delete:
     *      summary: Delete user by ID
     *      description: Remove a user from the system using their ID
     *      parameters:
     *        - $ref: '#/components/parameters/userId'
     *      tags:
     *        - User Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          404:
     *              $ref: '#/components/responses/404'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    userRouter.delete("/:id", userController.deleteUser);
};
