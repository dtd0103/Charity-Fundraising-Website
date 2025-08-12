const express = require("express");
const multer = require("multer");
const categoryController = require("../controllers/category.controller");
const { swaggerUi } = require("../docs/swagger");

const upload = multer();

const categoryRouter = express.Router();

module.exports.setup = (app) => {
    app.use("/api/v1/categories", categoryRouter);

    /**
     * @swagger
     * /api/v1/categories:
     *  get:
     *      summary: Get all categories
     *      description: Retrieve a list of all categories
     *      tags:
     *        - Categories Management
     *      responses:
     *          200:
     *               $ref: '#/components/responses/200'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    categoryRouter.get("/", categoryController.getCategories);

    /**
     * @swagger
     * /api/v1/categories:
     *  post:
     *      summary: Create a new category
     *      description: Create a new category
     *      requestBody:
     *        required: true
     *        content:
     *          multipart/form-data:
     *            schema:
     *              type: object
     *              properties:
     *                category_name:
     *                  type: string
     *      tags:
     *        - Categories Management
     *      responses:
     *          201:
     *               $ref: '#/components/responses/201'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    categoryRouter.post("/", upload.none(), categoryController.createCategory);

    /**
     * @swagger
     * /api/v1/categories/{id}:
     *  delete:
     *      summary: Delete a category
     *      description: Remove a category by ID
     *      parameters:
     *          - $ref: '#/components/parameters/categoryId'
     *      tags:
     *        - Categories Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          404:
     *              $ref: '#/components/responses/404'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    categoryRouter.delete("/:id", categoryController.deleteCategory);
};
