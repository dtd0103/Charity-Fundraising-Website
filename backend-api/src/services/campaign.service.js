const knex = require("../database/knex");
const path = require("path");
function campaignRepository() {
    return knex("campaigns");
}
const fs = require("fs");

async function create(req, payload) {
    try {
        const newCampaign = {
            title: payload.title,
            description: payload.description,
            goal_amount: payload.goal_amount,
            raised_amount: 0.0,
            start_date: new Date(),
            created_at: new Date(),
        };

        let mediaPath = null;

        if (req.file) {
            mediaPath = req.file.path;
        }

        if (mediaPath) {
            newCampaign.campaign_media = mediaPath;
        }

        const [campaignId] = await campaignRepository().insert(newCampaign);

        if (payload.category_id) {
            const categoryCampaignData = {
                campaign_id: campaignId,
                category_id: payload.category_id,
            };

            await knex("campaign_category").insert(categoryCampaignData);
        }

        return { id: campaignId, ...newCampaign };
    } catch (error) {
        console.error("Error creating campaign:", error);
        throw new Error("Unable to create campaign");
    }
}

async function getCampaignById(campaignId) {
    const campaign = await campaignRepository()
        .where("campaign_id", campaignId)
        .first();

    if (!campaign) {
        throw new Error("Campaign not found");
    }

    return campaign;
}

async function getAllCampaigns() {
    return await campaignRepository().select("*");
}

async function getCampaignsByCategoryId(categoryId) {
    return await campaignRepository()
        .join(
            "campaign_category",
            "campaigns.campaign_id",
            "=",
            "campaign_category.campaign_id"
        )
        .join(
            "categories",
            "campaign_category.category_id",
            "=",
            "categories.category_id"
        )
        .where("campaign_category.category_id", categoryId)
        .select("campaigns.*", "categories.category_name");
}

async function updateCampaign(req, campaignId, payload) {
    try {
        const updatedCampaign = {
            title: payload.title,
            description: payload.description,
            goal_amount: payload.goal_amount,
            raised_amount: payload.raised_amount || 0.0,
            start_date: payload.start_date,
            end_date: payload.end_date,
            updated_at: new Date(),
        };

        let mediaPath = null;

        if (req.file) {
            mediaPath = req.file.path;
        }

        if (mediaPath) {
            updatedCampaign.campaign_media = mediaPath;
        }

        await campaignRepository()
            .where("campaign_id", campaignId)
            .update(updatedCampaign);

        if (payload.category_id) {
            await knex("campaign_category")
                .where("campaign_id", campaignId)
                .del();

            const categoryCampaignData = {
                campaign_id: campaignId,
                category_id: payload.category_id,
            };

            await knex("campaign_category").insert(categoryCampaignData);
        }

        return { id: campaignId, ...updatedCampaign };
    } catch (error) {
        console.error("Error updating campaign:", error);
        throw new Error("Unable to update campaign");
    }
}

async function deleteCampaign(campaignId) {
    await campaignRepository().where("campaign_id", campaignId).del();
    return { message: "Campaign deleted successfully" };
}

module.exports = {
    create,
    getCampaignById,
    getAllCampaigns,
    getCampaignsByCategoryId,
    updateCampaign,
    deleteCampaign,
};
