const express = require("express");
const campaignController = require("../controllers/campaign.controller");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const campaignRouter = express.Router();
const upload = multer({
    dest: path.join(__dirname, "../uploads"),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only image files are allowed."));
        }
        cb(null, true);
    },
});
const mediaUpload = require("../middlewares/media-upload.middleware");

module.exports.setup = (app) => {
    app.use("/api/v1/campaign", campaignRouter);

    /**
     * @swagger
     * /api/v1/campaign:
     *  post:
     *      summary: Create a new campaign
     *      description: Create a new campaign in the system
     *      requestBody:
     *        required: true
     *        content:
     *          multipart/form-data:
     *            schema:
     *              type: object
     *              properties:
     *                title:
     *                  type: string
     *                  description: Title of the campaign
     *                description:
     *                  type: string
     *                  description: Description of the campaign
     *                goal_amount:
     *                  type: number
     *                  format: decimal
     *                  description: Goal amount for the campaign
     *                raised_amount:
     *                  type: number
     *                  format: decimal
     *                  description: Amount raised so far
     *                start_date:
     *                  type: string
     *                  format: date
     *                  description: Start date of the campaign
     *                end_date:
     *                  type: string
     *                  format: date
     *                  description: End date of the campaign
     *                media:
     *                  type: string
     *                  format: binary
     *                  description: Media file (image/video) for the campaign
     *                categoryId:
     *                  type: integer
     *                  description: The category ID the campaign belongs to
     *      tags:
     *        - Campaign Management
     *      responses:
     *          201:
     *              $ref: '#/components/responses/201'
     *          400:
     *              $ref: '#/components/responses/400'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    campaignRouter.post("/", mediaUpload, campaignController.create);

    /**
     * @swagger
     * /api/v1/campaign:
     *  get:
     *      summary: Get all campaigns
     *      description: Retrieve all campaigns
     *      tags:
     *        - Campaign Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    campaignRouter.get("/", campaignController.getAll);

    /**
     * @swagger
     * /api/v1/campaign/{id}:
     *  get:
     *      summary: Get a campaign by ID
     *      description: Retrieve a campaign by its ID
     *      parameters:
     *        - $ref: '#/components/parameters/CampaignId'
     *      tags:
     *        - Campaign Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          404:
     *              $ref: '#/components/responses/404'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    campaignRouter.get("/:id", campaignController.getCampaign);

    /**
     * @swagger
     * /api/v1/campaign/category/{id}:
     *  get:
     *      summary: Get all campaign by category ID
     *      description: Retrieve all campaign by category ID
     *      parameters:
     *        - $ref: '#/components/parameters/categoryId'
     *      tags:
     *        - Campaign Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          404:
     *              $ref: '#/components/responses/404'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    campaignRouter.get(
        "/category/:id",
        campaignController.getCampaignByCategory
    );

    /**
     * @swagger
     * /api/v1/campaign/{id}:
     *  put:
     *      summary: Update a campaign by ID
     *      description: Update a specific campaign
     *      parameters:
     *        - $ref: '#/components/parameters/CampaignId'
     *      requestBody:
     *        required: true
     *        content:
     *          multipart/form-data:
     *            schema:
     *              type: object
     *              properties:
     *                title:
     *                  type: string
     *                  description: Title of the campaign
     *                description:
     *                  type: string
     *                  description: Description of the campaign
     *                goal_amount:
     *                  type: number
     *                  format: decimal
     *                  description: Goal amount for the campaign
     *                raised_amount:
     *                  type: number
     *                  format: decimal
     *                  description: Amount raised so far
     *                start_date:
     *                  type: string
     *                  format: date
     *                  description: Start date of the campaign
     *                end_date:
     *                  type: string
     *                  format: date
     *                  description: End date of the campaign
     *                media:
     *                  type: string
     *                  format: binary
     *                  description: Media file (image/video) for the campaign
     *      tags:
     *        - Campaign Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          404:
     *              $ref: '#/components/responses/404'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    campaignRouter.put("/:id", mediaUpload, campaignController.update);

    /**
     * @swagger
     * /api/v1/campaign/{id}:
     *  delete:
     *      summary: Delete a campaign by ID
     *      description: Delete a specific campaign
     *      parameters:
     *        - $ref: '#/components/parameters/CampaignId'
     *      tags:
     *        - Campaign Management
     *      responses:
     *          200:
     *              $ref: '#/components/responses/200'
     *          404:
     *              $ref: '#/components/responses/404'
     *          500:
     *              $ref: '#/components/responses/500'
     */
    campaignRouter.delete("/:id", campaignController.remove);
};
