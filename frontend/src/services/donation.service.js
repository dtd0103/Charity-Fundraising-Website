function makeDonationService() {
  const baseUrl = '/api/v1/donations';

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

  async function getAllDonation() {
    return await efetch(`${baseUrl}`);
  }

  async function getDonation(donationId) {
    return await efetch(`${baseUrl}/${donationId}`);
  }

  async function createDonation(donationData) {
    return efetch(`${baseUrl}`, {
      method: 'POST',
      body: JSON.stringify(donationData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return {
    getAllDonation,
    getDonation,
    createDonation
  };
}
export default makeDonationService();
