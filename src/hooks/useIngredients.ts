import { useState, useEffect, useMemo } from "react";
import { ingredients, Ingredient } from "@/data/ingredients";

export const useIngredients = () => {
  const [customIngredients, setCustomIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("gigizi_custom_ingredients");
    if (stored) {
      setCustomIngredients(JSON.parse(stored));
    }
  }, []);

  const allIngredients = useMemo(() => {
    return [...ingredients, ...customIngredients];
  }, [customIngredients]);

  const addCustomIngredient = (ingredient: Ingredient) => {
    const updated = [...customIngredients, ingredient];
    setCustomIngredients(updated);
    localStorage.setItem("gigizi_custom_ingredients", JSON.stringify(updated));
  };

  return { allIngredients, addCustomIngredient };
};
