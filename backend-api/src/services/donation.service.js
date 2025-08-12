const knex = require("../database/knex");

function donationRepository() {
    return knex("donations");
}

function campaignRepository() {
    return knex("campaigns");
}

async function create(payload) {
    const campaign = await campaignRepository()
        .where("campaign_id", payload.campaign_id)
        .first();

    if (!campaign) {
        throw new Error("Campaign not found");
    }

    const raisedAmount = campaign.raised_amount;
    const goalAmount = campaign.goal_amount;

    if (raisedAmount + Number(payload.amount) > goalAmount) {
        throw new Error("Donation exceeds the campaign goal amount");
    }

    const newDonation = {
        donor_id: payload.donor_id,
        amount: Number(payload.amount),
        status: "completed",
        campaign_id: payload.campaign_id,
    };

    const [donationId] = await knex("donations")
        .insert(newDonation)
        .returning("donation_id");

    await campaignRepository()
        .where("campaign_id", payload.campaign_id)
        .update({
            raised_amount: raisedAmount + payload.amount,
        });

    return {
        donationId,
    };
}

async function getByCampaignId(campaignId) {
    const donations = await donationRepository().where(
        "campaign_id",
        campaignId
    );
    return donations;
}

async function getAll(id) {
    const donation = await donationRepository().select("*");
    if (!donation) {
        throw new Error(`Donation with ID ${id} not found.`);
    }
    return donation;
}

async function getById(id) {
    const donation = await donationRepository()
        .where("donation_id", id)
        .first();
    if (!donation) {
        throw new Error(`Donation with ID ${id} not found.`);
    }
    return donation;
}

async function getByUserId(userId) {
    const donations = await donationRepository().where("donor_id", userId);
    return donations;
}

module.exports = {
    getByCampaignId,
    create,
    getAll,
    getById,
    getByUserId,
};
