import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../instance/AxiosClient";

const ClientInventory = () => {
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch inventory when the component mounts
    const fetchInventory = async () => {
      try {
        const response = await apiClient.get("/inventory", {
          withCredentials: true, // Include cookies in the request
        });
        setInventory(response.data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        if (err.response?.status === 401) {
          setError("Unauthorized. Redirecting to login...");
          navigate("/client/login"); // Redirect to login if unauthorized
        } else {
          setError("Failed to fetch inventory. Please try again.");
        }
      }
    };

    fetchInventory();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ingredientName || !quantity || !unit) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await apiClient.post(
        "/inventory",
        { ingredientName, quantity, unit },
        { withCredentials: true } // Include cookies in the request
      );

      if (response.data.success) {
        setSuccessMessage("Ingredient added successfully!");
        setIngredientName("");
        setQuantity("");
        setUnit("");

        // Refresh inventory
        const updatedInventory = await apiClient.get("/inventory", {
          withCredentials: true,
        });
        setInventory(updatedInventory.data);
      }
    } catch (err) {
      console.error("Failed to add ingredient:", err);
      setError(
        err.response?.data?.message ||
          "Failed to add ingredient. Please try again."
      );
    }
  };

  return (
    <div className="inventory-container">
      <h2>Add Ingredient to Inventory</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ingredientName">Ingredient Name:</label>
          <input
            type="text"
            id="ingredientName"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="unit">Unit (e.g., kg, lbs):</label>
          <input
            type="text"
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <button type="submit">Add Ingredient</button>
      </form>

      <h3>Inventory List</h3>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            {item.ingredient_name} - {item.quantity} {item.unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientInventory;
