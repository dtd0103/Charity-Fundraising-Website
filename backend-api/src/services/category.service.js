const knex = require("../database/knex");

function categoryRepository() {
    return knex("categories");
}

async function getAll() {
    return await categoryRepository().select("category_id", "category_name");
}

async function create(category_name) {
    const [newCategory] = await categoryRepository()
        .insert(category_name)
        .returning(["category_id", "category_name"]);
    return newCategory;
}

async function remove(categoryId) {
    const result = await categoryRepository()
        .where({ category_id: categoryId })
        .del();
    return result;
}

module.exports = {
    getAll,
    create,
    remove,
};
