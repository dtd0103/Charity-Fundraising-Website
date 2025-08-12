const categoryService = require("../services/category.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

async function createCategory(req, res, next) {
    try {
        const { category_name } = req.body;

        if (!category_name) {
            return next(new ApiError(400, "Category name is required."));
        }

        const newCategory = await categoryService.create({ category_name });
        return res
            .status(201)
            .set({
                Location: `${req.baseUrl}/${newCategory.category_id}`,
            })
            .json(JSend.success({ newCategory }));
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(
                500,
                "An error occurred while creating a new category."
            )
        );
    }
}

async function getCategories(req, res, next) {
    try {
        const categories = await categoryService.getAll();
        return res.status(200).json(JSend.success({ categories }));
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while retrieving categories.")
        );
    }
}

async function deleteCategory(req, res, next) {
    try {
        const categoryId = req.params.id;
        const result = await categoryService.remove(categoryId);

        if (!result) {
            return next(new ApiError(404, "Category not found."));
        }

        return res
            .status(200)
            .json(JSend.success({ message: "Category deleted successfully." }));
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while deleting the category.")
        );
    }
}

module.exports = {
    createCategory,
    getCategories,
    deleteCategory,
};
