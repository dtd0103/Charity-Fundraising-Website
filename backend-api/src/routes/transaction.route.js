// const express = require("express");
// const multer = require("multer");
// const transactionController = require("../controllers/transaction.controller");

// const upload = multer();
// const transactionRouter = express.Router();

// module.exports.setup = (app) => {
//     app.use("/api/v1/donations", transactionRouter);

//     /**
//      * @swagger
//      * /api/v1/donations/{donation_id}/transactions/{transaction_id}:
//      *  get:
//      *      summary: Get a specific transaction
//      *      description: Retrieve details of a specific transaction.
//      *      parameters:
//      *        - $ref: '#/components/parameters/donationId'
//      *        - $ref: '#/components/parameters/transactionId'
//      *      tags:
//      *        - Transactions Management
//      *      responses:
//      *          200:
//      *              $ref: '#/components/responses/200'
//      *          404:
//      *              $ref: '#/components/responses/404'
//      *          500:
//      *              $ref: '#/components/responses/500'
//      */
//     transactionRouter.get(
//         "/:donation_id/transactions/:transaction_id",
//         transactionController.getTransactionById
//     );

//     /**
//      * @swagger
//      * /api/v1/donations/{donation_id}/transactions:
//      *  get:
//      *      summary: Get all transactions for a donation
//      *      description: Retrieve a list of all transactions for a specific donation.
//      *      parameters:
//      *        - $ref: '#/components/parameters/donationId'
//      *      tags:
//      *        - Transactions Management
//      *      responses:
//      *          200:
//      *              $ref: '#/components/responses/200'
//      *          404:
//      *              $ref: '#/components/responses/404'
//      *          500:
//      *              $ref: '#/components/responses/500'
//      */
//     transactionRouter.get(
//         "/:donation_id/transactions",
//         upload.none(),
//         transactionController.getAllTransactionsByDonationId
//     );

//     /**
//      * @swagger
//      * /api/v1/donations/{donation_id}/transactions:
//      *  post:
//      *      summary: Create a new transaction for a donation
//      *      description: Create a new transaction related to a specific donation.
//      *      parameters:
//      *          - $ref: '#/components/parameters/donationId'
//      *      requestBody:
//      *        required: true
//      *        content:
//      *          multipart/form-data:
//      *            schema:
//      *              type: object
//      *              properties:
//      *                transaction_amount:
//      *                  type: number
//      *                  format: decimal
//      *                  description: The transaction amount
//      *                status:
//      *                  type: string
//      *                  enum: [pending, completed, failed]
//      *                  description: The status of the transaction
//      *      tags:
//      *        - Transactions Management
//      *      responses:
//      *          201:
//      *              $ref: '#/components/responses/201'
//      *          400:
//      *              $ref: '#/components/responses/400'
//      *          404:
//      *              $ref: '#/components/responses/404'
//      *          500:
//      *              $ref: '#/components/responses/500'
//      */
//     transactionRouter.post(
//         "/:donation_id/transactions",
//         upload.none(),
//         transactionController.createTransaction
//     );

//     /**
//      * @swagger
//      * /api/v1/donations/{donation_id}/transactions/{transaction_id}/status:
//      *  put:
//      *      summary: Update transaction status
//      *      description: Update the status of a specific transaction.
//      *      parameters:
//      *        - $ref: '#/components/parameters/donationId'
//      *        - $ref: '#/components/parameters/transactionId'
//      *      requestBody:
//      *        required: true
//      *        content:
//      *          multipart/form-data:
//      *            schema:
//      *              type: object
//      *              properties:
//      *                status:
//      *                  type: string
//      *                  enum: [pending, completed, failed]
//      *                  description: The new status of the transaction
//      *      tags:
//      *        - Transactions Management
//      *      responses:
//      *          200:
//      *              $ref: '#/components/responses/200'
//      *          400:
//      *              $ref: '#/components/responses/400'
//      *          500:
//      *              $ref: '#/components/responses/500'
//      */
//     transactionRouter.put(
//         "/:donation_id/transactions/:transaction_id/status",
//         upload.none(),
//         transactionController.updateTransactionStatus
//     );
// };
