const donationService = require("../services/donation.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

async function createDonation(req, res, next) {
    try {
        const { donor_id, amount, message, campaign_id } = req.body;

        const { donationId, transactionId } = await donationService.create({
            donor_id,
            amount,
            campaign_id,
        });

        return res
            .status(201)
            .json(JSend.success({ donationId, transactionId }));
    } catch (error) {
        console.error(error);
        if (error.status === "error") {
            return res.status(400).json(JSend.error(error.message));
        }
        return next(
            new ApiError(500, "An error occurred while creating the donation.")
        );
    }
}

async function getAllDonation(req, res, next) {
    try {


        const donations = await donationService.getAll();

        return res.status(200).json(JSend.success({ donations }));
    } catch (error) {
        console.error(error);
        if (error.status === "error") {
            return res.status(404).json(JSend.error(error.message));
        }
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving the donation."
            )
        );
    }
}

async function getDonationById(req, res, next) {
    try {
        const { id } = req.params;

        const donation = await donationService.getById(id);

        return res.status(200).json(JSend.success({ donation }));
    } catch (error) {
        console.error(error);
        if (error.status === "error") {
            return res.status(404).json(JSend.error(error.message));
        }
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving the donation."
            )
        );
    }
}

async function getDonationsByUserId(req, res, next) {
    try {
        const userId = req.params.userId;
        const donations = await donationService.getByUserId(userId);

        return res.status(200).json(JSend.success(donations));
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while retrieving donations.")
        );
    }
}

module.exports = {
    createDonation,
    getAllDonation,
    getDonationById,
    getDonationsByUserId,
};
