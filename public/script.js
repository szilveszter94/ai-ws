// script.js

document.addEventListener("DOMContentLoaded", () => {
    const ingredientsList = document.getElementById("ingredients-list");
    const ingredientForm = document.getElementById("ingredient-form");

    // Function to fetch and display ingredients
    const fetchIngredients = async () => {
        try {
            const response = await fetch("/ingredients");
            const ingredients = await response.json();
            ingredientsList.innerHTML = "<ul>" + ingredients.map(ingredient => `<li>${ingredient.name} (${ingredient.unit})</li>`).join("") + "</ul>";
        } catch (error) {
            console.error("Error fetching ingredients:", error);
        }
    };

    // Function to add a new ingredient
    ingredientForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const unit = document.getElementById("unit").value;

        try {
            const response = await fetch("/ingredients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, unit })
            });

            if (response.ok) {
                // Clear input fields and refresh the ingredients list
                document.getElementById("name").value = "";
                document.getElementById("unit").value = "";
                fetchIngredients();
            } else {
                const data = await response.json();
                console.error("Error adding ingredient:", data.message);
            }
        } catch (error) {
            console.error("Error adding ingredient:", error);
        }
    });

    // Initial fetch of ingredients
    fetchIngredients();
});