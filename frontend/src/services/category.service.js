function makeCategoryService() {
  const baseUrl = 'api/v1/categories';

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

  async function getAllCategory() {
    const categories = await efetch(`${baseUrl}`);

    return {
      categories
    };
  }

  async function createCategory(categoryData) {
    return efetch(`${baseUrl}`, {
      method: 'POST',
      body: JSON.stringify(categoryData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async function deleteCategory(categoryId) {
    return efetch(`${baseUrl}/${categoryId}`, {
      method: 'DELETE'
    });
  }

  return {
    getAllCategory,
    createCategory,
    deleteCategory
  };
}

export default makeCategoryService();
