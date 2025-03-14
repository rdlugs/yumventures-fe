import { Asterisk, ImageUp, NotebookPen, Trash2, XCircle } from "lucide-react";
import DialogComponent from "../components/DialogComponent";
import useDialogStore from "../store/useDialogStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiClient from "../instance/AxiosClient";
import PropTypes from "prop-types";
import { useState } from "react";

const AddMenu = ({ inventory, categories, fetchMenuItems }) => {
  const { closeDialog } = useDialogStore();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState({
    ingredientId: "",
    quantity: "",
  });
  const validationSchema = Yup.object({
    name: Yup.string().required("Menu item name is required"),
    description: Yup.string().required("Category is required"),
    categoryId: Yup.number()
      .required("Category ID is required")
      .positive("Category ID must be positive")
      .min(1, "Category ID must be at least 1"),
    ingredients: Yup.array()
      .of(
        Yup.object({
          ingredientId: Yup.string().required("Ingredient is required"),
          quantity: Yup.number()
            .required("Quantity is required")
            .positive("Quantity must be positive"),
        })
      )
      .min(1, "At least one ingredient is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive")
      .min(0, "Price cannot be negative"),

    image: Yup.mixed().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      categoryId: "",
      ingredients: [],
      price: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "ingredients") {
          formData.append(key, JSON.stringify(values[key]));
        } else {
          formData.append(key, values[key]);
        }
      });

      try {
        const response = await apiClient.post("/menu/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        // Check if the response status is 201 (Created) or 200 (OK)
        if (response.status === 201 || response.status === 200) {
          alert("Menu item added successfully!");
          closeDialog();
          fetchMenuItems();
        } else {
          alert("Failed to add menu item.");
        }
      } catch (err) {
        console.error("Error submitting form:", err);
        alert("Failed to add menu item.");
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("image", file); // Updates Formik's state
      setImagePreview(URL.createObjectURL(file)); // Sets preview for display
    }
  };

  const handleAddIngredient = () => {
    if (selectedIngredient.ingredientId && selectedIngredient.quantity) {
      // Find if the ingredient already exists in the list
      const existingIndex = formik.values.ingredients.findIndex(
        (ingredient) =>
          ingredient.ingredientId === selectedIngredient.ingredientId
      );

      if (existingIndex !== -1) {
        // Update the quantity of the existing ingredient
        const updatedIngredients = [...formik.values.ingredients];
        updatedIngredients[existingIndex].quantity =
          parseFloat(updatedIngredients[existingIndex].quantity) +
          parseFloat(selectedIngredient.quantity);

        formik.setFieldValue("ingredients", updatedIngredients);
      } else {
        // Add the new ingredient to the list
        formik.setFieldValue("ingredients", [
          ...formik.values.ingredients,
          { ...selectedIngredient },
        ]);
      }

      // Reset the temporary state
      setSelectedIngredient({ ingredientId: "", quantity: "" });
    } else {
      alert("Please select an ingredient and provide a quantity.");
    }
  };

  // Handle removing an ingredient
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = formik.values.ingredients.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("ingredients", updatedIngredients);
  };

  return (
    <DialogComponent id="addMenu">
      <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-800">
        <h3 className="font-bold text-gray-800 dark:text-neutral-200">
          Add new menu
        </h3>
        <button
          type="button"
          onClick={closeDialog}
          className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
        >
          <span className="sr-only">Close</span>
          <XCircle className="shrink-0 size-4" />
        </button>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="space-y-4  py-3 px-4 overflow-auto"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex flex-col gap-y-4">
            <div className="max-w-sm space-y-3">
              <div>
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
                <label
                  htmlFor="image"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    placeholder="Menu Item Name"
                    className="py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />

                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                    <ImageUp className="shrink-0 size-4 text-gray-400 dark:text-neutral-600" />
                  </div>
                </div>
              </div>

              {formik.errors.image && formik.touched.image && (
                <div>{formik.errors.image}</div>
              )}
            </div>

            <div className="max-w-sm space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Menu Item Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className="py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                    <NotebookPen className="shrink-0 size-4 text-gray-400 dark:text-neutral-600" />
                  </div>
                </div>
              </div>
              {formik.errors.name && formik.touched.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
            <div className="max-w-sm">
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                Description
              </label>
              <textarea
                name="description"
                placeholder="Input menu description..."
                value={formik.values.description}
                onChange={formik.handleChange}
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                rows="3"
              ></textarea>
              {formik.errors.description && formik.touched.description && (
                <div>{formik.errors.description}</div>
              )}
            </div>

            <div className="max-w-sm space-y-3 ">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    name="categoryId"
                    value={formik.values.categoryId}
                    onChange={formik.handleChange}
                    className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.category_id}>
                        {category.name}
                      </option>
                    ))}
                    {/* Categories should be mapped here */}
                    {formik.errors.categoryId && formik.touched.categoryId && (
                      <div>{formik.errors.categoryId}</div>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="max-w-sm space-y-3">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Price
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    className="py-3 px-4 ps-9 pe-16 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                    <span className="text-gray-500 dark:text-neutral-500">
                      ₱
                    </span>
                  </div>
                  <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
                    <span className="text-gray-500 dark:text-neutral-500">
                      PHP
                    </span>
                  </div>
                </div>
              </div>
              {formik.errors.price && formik.touched.price && (
                <div>{formik.errors.price}</div>
              )}
            </div>
          </div>

          <div>
            {/* Ingredients Section */}
            <div className="flex flex-col gap-y-4">
              <div>
                <label
                  htmlFor="ingredientId"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Add Ingredients
                </label>
                <select
                  name="ingredientId"
                  className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  value={selectedIngredient.ingredientId}
                  onChange={(e) =>
                    setSelectedIngredient({
                      ...selectedIngredient,
                      ingredientId: e.target.value,
                    })
                  }
                >
                  <option value="">Select Ingredient</option>
                  {inventory.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.ingredient_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Input */}
              <div className="relative">
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={selectedIngredient.quantity}
                  onChange={(e) =>
                    setSelectedIngredient({
                      ...selectedIngredient,
                      quantity: e.target.value,
                    })
                  }
                  className="py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                  <Asterisk className="shrink-0 size-4 text-gray-400 dark:text-neutral-600" />
                </div>
              </div>

              {/* Add Ingredient Button */}
              <button
                type="button"
                onClick={handleAddIngredient}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Add Ingredient
              </button>
              <div>
                <label
                  htmlFor="ingredientId"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Ingredient List
                </label>
                {/* List of added ingredients */}
                <ul className="max-w-xs flex flex-col max-h-40 overflow-auto">
                  {formik.values.ingredients.map((ingredient, index) => {
                    // Find the matching inventory item
                    const matchedItem = inventory.find(
                      (item) =>
                        item.id === parseInt(ingredient.ingredientId, 10)
                    );

                    if (!matchedItem) return null; // Skip if no match is found

                    return (
                      <li
                        key={index}
                        className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                      >
                        <div className="flex justify-between w-full">
                          {matchedItem.ingredient_name} - Qty.
                          {ingredient.quantity}
                          <button
                            type="button"
                            onClick={() => handleRemoveIngredient(index)}
                            className="text-red-500"
                          >
                            <Trash2 className="shrink-0 size-4" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-blue-600 text-white"
        >
          Submit
        </button>
      </form>
    </DialogComponent>
  );
};

AddMenu.propTypes = {
  inventory: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  fetchMenuItems: PropTypes.func.isRequired,
};

export default AddMenu;
