// const transactionService = require("../services/transaction.service");
// const ApiError = require("../api-error");
// const JSend = require("../jsend");

// async function getTransactionById(req, res, next) {
//     const { donation_id, transaction_id } = req.params;
//     console.log(donation_id, transaction_id);

//     try {
//         const transaction = await transactionService.getById(transaction_id);

//         if (!transaction) {
//             return next(new ApiError(404, "Transaction not found."));
//         }

//         return res.status(200).json(JSend.success({ transaction }));
//     } catch (error) {
//         console.error(error);
//         return next(
//             new ApiError(
//                 500,
//                 "An error occurred while retrieving the transaction."
//             )
//         );
//     }
// }

// async function getAllTransactionsByDonationId(req, res, next) {
//     try {
//         const { donation_id } = req.params;
//         const transactions = await transactionService.getByDonationId(
//             donation_id
//         );

//         if (!transactions.length) {
//             return next(
//                 new ApiError(404, "No transactions found for this donation.")
//             );
//         }

//         return res.status(200).json(JSend.success({ transactions }));
//     } catch (error) {
//         console.error(error);
//         return next(
//             new ApiError(
//                 500,
//                 "An error occurred while retrieving transactions."
//             )
//         );
//     }
// }

// async function createTransaction(req, res, next) {
//     try {
//         const newTransaction = await transactionService.create(
//             req.params.donation_id,
//             req.body
//         );
//         return res.status(201).json(JSend.success({ newTransaction }));
//     } catch (error) {
//         console.error(error);

//         if (error.message === "Donation not found.") {
//             return res.status(404).json({
//                 status: "error",
//                 message: error.message,
//             });
//         }

//         if (error.status === "error" && error.message) {
//             return res.status(400).json({
//                 status: error.status,
//                 message: error.message,
//             });
//         }

//         return next(
//             new ApiError(500, "An error occurred while creating a transaction.")
//         );
//     }
// }

// async function updateTransactionStatus(req, res, next) {
//     try {
//         const transactionId = req.params.transaction_id;
//         const { status } = req.body;

//         const validStatuses = ["pending", "completed", "failed"];
//         if (!validStatuses.includes(status)) {
//             return next(
//                 new ApiError(
//                     400,
//                     `Invalid status: ${status}. Valid statuses are ${validStatuses.join(
//                         ", "
//                     )}.`
//                 )
//             );
//         }

//         const result = await transactionService.updateStatus(
//             transactionId,
//             status
//         );

//         return res.status(200).json(JSend.success({ result }));
//     } catch (error) {
//         console.error(error);

//         if (error instanceof ApiError) {
//             return next(error);
//         }

//         return next(
//             new ApiError(
//                 500,
//                 "An error occurred while updating the transaction status."
//             )
//         );
//     }
// }

// module.exports = {
//     getTransactionById,
//     getAllTransactionsByDonationId,
//     createTransaction,
//     updateTransactionStatus,
// };
