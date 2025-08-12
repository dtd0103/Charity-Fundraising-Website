const express = require("express");
const multer = require("multer");
const donationController = require("../controllers/donation.controller");
const { swaggerUi } = require("../docs/swagger");

const upload = multer();

const donationRouter = express.Router();

module.exports.setup = (app) => {
    app.use("/api/v1/donations", donationRouter);

    /**
     * @swagger
     * /api/v1/donations:
     *  post:
     *      summary: Create a new donation
     *      description: Create a new donation
     *      requestBody:
     *        required: true
     *        content:
     *          multipart/form-data:
     *            schema:
     *              type: object
     *              properties:
     *                donor_id:
     *                  type: integer
     *                campaign_id:
     *                  type: integer
     *                amount:
     *                  type: number
     *                  format: decimal
     *      tags:
     *        - Donations Management
     *      responses:
     *          201:
     *               $ref: '#/components/responses/201'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    donationRouter.post("/", upload.none(), donationController.createDonation);

    /**
     * @swagger
     * /api/v1/donations:
     *  get:
     *      summary: Get all donations
     *      description: Retrieve all donation
     *      tags:
     *        - Donations Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          404:
     *              $ref: '#/components/responses/404'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    donationRouter.get("/", donationController.getAllDonation);

    /**
     * @swagger
     * /api/v1/donations/{id}:
     *  get:
     *      summary: Get donation by ID
     *      description: Retrieve a donation by ID
     *      parameters:
     *          - name: id
     *            in: path
     *            required: true
     *            description: The ID of the donation
     *            schema:
     *                type: integer
     *      tags:
     *        - Donations Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          404:
     *              $ref: '#/components/responses/404'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    donationRouter.get("/:id", donationController.getDonationById);

    /**
     * @swagger
     * /api/v1/donations/user/{userId}:
     *  get:
     *      summary: Get all donations by user ID
     *      description: Retrieve all donations made by a specific user
     *      parameters:
     *          - name: userId
     *            in: path
     *            required: true
     *            description: The ID of the user
     *            schema:
     *                type: integer
     *      tags:
     *        - Donations Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    donationRouter.get(
        "/user/:userId",
        donationController.getDonationsByUserId
    );
};
