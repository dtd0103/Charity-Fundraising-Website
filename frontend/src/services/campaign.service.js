function makeCampaignService() {
  const baseUrl = '/api/v1/campaign';

  async function efetch(url, options = {}) {
    let result = {};
    let json = {};
    try {
      result = await fetch(url, options);
      json = await result.json();
    } catch (error) {
      throw new Error(error.message);
    }
    if (!result.ok || json.status !== 'success') {
      throw new Error(json.message || 'An error occurred');
    }
    return json.data;
  }

  async function getAllCampaign() {
    return await efetch(`${baseUrl}`);
  }

  async function getCampaign(campaignId) {
    return await efetch(`${baseUrl}/${campaignId}`);
  }

  async function getCampaignByCategoryId(categoryId) {
    const campaigns = await efetch(`${baseUrl}/category/${categoryId}`);
    return {
      campaigns
    };
  }

  // async function createCampaign(campaignData) {
  //   return efetch(`${baseUrl}`, {
  //     method: 'POST',
  //     body: campaignData
  //   });
  // }

  async function createCampaign(campaignData) {
    const formData = new FormData();

    formData.append('title', campaignData.title);
    formData.append('description', campaignData.description);
    formData.append('goal_amount', campaignData.goal_amount);
    formData.append('category_id', campaignData.category_id);
    formData.append('media', campaignData.campaign_media);

    try {
      const response = await efetch(`${baseUrl}`, {
        method: 'POST',
        body: formData
      });

      return response;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  // async function updateCampaign(campaignId, campaignData) {
  //   return efetch(`${baseUrl}/${campaignId}`, {
  //     method: 'PUT',
  //     body: campaignData,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  // }

  async function updateCampaign(campaignId, campaignData) {
    console.log(campaignData);
    const formData = new FormData();

    formData.append('title', campaignData.title);
    formData.append('description', campaignData.description);
    formData.append('goal_amount', campaignData.goal_amount);
    formData.append('raised_amount', campaignData.raised_amount);
    formData.append('start_date', campaignData.start_date);
    formData.append('end_date', campaignData.end_date);

    if (campaignData.category_id !== null && campaignData.category_id !== undefined) {
      formData.append('category_id', campaignData.category_id);
    }

    if (campaignData.campaign_media) {
      formData.append('media', campaignData.campaign_media);
    }

    try {
      const response = await efetch(`${baseUrl}/${campaignId}`, {
        method: 'PUT',
        body: formData
      });

      return response;
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  }

  async function deleteCampaign(campaignId) {
    return efetch(`${baseUrl}/${campaignId}`, {
      method: 'DELETE'
    });
  }

  return {
    getAllCampaign,
    getCampaign,
    getCampaignByCategoryId,
    createCampaign,
    updateCampaign,
    deleteCampaign
  };
}
export default makeCampaignService();
