// const knex = require("../database/knex");

// function transactionRepository() {
//     return knex("transactions");
// }

// function donationRepository() {
//     return knex("donations");
// }

// async function create(donationId, payload) {
//     console.log("Payload:", payload);
//     const donation = await getDonationById(donationId);

//     if (!donation) {
//         throw new Error("Donation not found.");
//     }

//     const transactions = await transactionRepository()
//         .where({
//             donation_id: donationId,
//         })
//         .select(
//             "transaction_id",
//             "donation_id",
//             "transaction_amount",
//             "transaction_date",
//             "status"
//         );

//     const totalPaid = transactions.reduce((sum, transaction) => {
//         if (
//             transaction.status === "pending" ||
//             transaction.status === "completed"
//         ) {
//             return sum + transaction.transaction_amount;
//         }
//         return sum;
//     }, 0);

//     if (totalPaid > 0) {
//         throw {
//             status: "error",
//             message:
//                 "The donation must be transferred in full at once. No partial transactions are allowed.",
//         };
//     }

//     const transactionAmount = parseFloat(payload.transaction_amount);

//     if (transactionAmount !== donation.amount) {
//         throw {
//             status: "error",
//             message: `The transaction amount must be exactly ${donation.amount}.`,
//         };
//     }

//     const newTransaction = {
//         donation_id: donationId,
//         transaction_amount: transactionAmount,
//         status: payload.status,
//         transaction_date: new Date(),
//     };

//     const [id] = await transactionRepository().insert(newTransaction);
//     return id;
// }

// async function getByDonationId(donationId) {
//     const transactions = await transactionRepository()
//         .where("donation_id", donationId)
//         .select(
//             "transaction_id",
//             "donation_id",
//             "transaction_amount",
//             "transaction_date",
//             "status"
//         );

//     return transactions.length > 0 ? transactions : null;
// }

// async function getById(transactionId) {
//     const transaction = await transactionRepository()
//         .where("transaction_id", transactionId)
//         .first();

//     if (!transaction) {
//         throw new Error("Transaction not found");
//     }

//     return transaction;
// }

// async function getDonationById(donationId) {
//     const donation = await donationRepository()
//         .where("donation_id", donationId)
//         .select("donation_id", "amount")
//         .first();

//     return donation;
// }

// async function updateStatus(transactionId, newStatus) {
//     const validStatuses = ["pending", "completed", "failed"];

//     if (!validStatuses.includes(newStatus)) {
//         throw {
//             status: "error",
//             message: `Invalid status: ${newStatus}. Valid statuses are ${validStatuses.join(
//                 ", "
//             )}.`,
//         };
//     }

//     const updatedRows = await transactionRepository()
//         .where("transaction_id", transactionId)
//         .update({
//             status: newStatus,
//         });

//     if (updatedRows === 0) {
//         throw {
//             status: "error",
//             message: `Transaction with ID ${transactionId} not found.`,
//         };
//     }

//     const transaction = await transactionRepository()
//         .where("transaction_id", transactionId)
//         .first();

//     const donationId = transaction.donation_id;

//     if (newStatus === "completed") {
//         await donationRepository()
//             .where({ donation_id: donationId })
//             .update({ status: "completed" });
//     }

//     return { transactionId, newStatus };
// }

// module.exports = {
//     create,
//     getByDonationId,
//     getById,
//     updateStatus,
// };
