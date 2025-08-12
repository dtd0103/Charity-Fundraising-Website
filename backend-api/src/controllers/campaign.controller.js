const campaignService = require("../services/campaign.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

async function create(req, res, next) {
    try {
        const campaignData = {
            ...req.body,
        };

        const newCampaign = await campaignService.create(req, campaignData);

        return res
            .status(201)
            .set({ Location: `${req.baseUrl}` })
            .json(JSend.success({ newCampaign }));
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                "An error occurred while creating a new campaign."
            )
        );
    }
}

async function getCampaign(req, res, next) {
    try {
        const campaign = await campaignService.getCampaignById(req.params.id);
        return res.status(200).json(JSend.success({ campaign }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(404, "Campaign not found."));
    }
}

async function getCampaignByCategory(req, res, next) {
    try {
        const campaign = await campaignService.getCampaignsByCategoryId(
            req.params.id
        );
        return res.status(200).json(JSend.success({ campaign }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(404, "Campaign not found."));
    }
}

async function getAll(req, res, next) {
    try {
        const campaigns = await campaignService.getAllCampaigns();
        return res.status(200).json(JSend.success({ campaigns }));
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while fetching campaigns.")
        );
    }
}

async function update(req, res, next) {
    const { id } = req.params;

    try {
        const campaignData = { ...req.body };

        const updatedCampaign = await campaignService.updateCampaign(
            req,
            id,
            campaignData
        );

        return res.status(200).json(JSend.success({ updatedCampaign }));
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while updating the campaign.")
        );
    }
}

async function remove(req, res, next) {
    try {
        const result = await campaignService.deleteCampaign(req.params.id);
        return res.status(200).json(JSend.success(result));
    } catch (error) {
        console.log(error);
        return next(new ApiError(404, "Campaign not found."));
    }
}

module.exports = {
    create,
    getCampaign,
    getCampaignByCategory,
    getAll,
    update,
    remove,
};
