import type { Food } from "../../model";
import { AuthError } from "../auth/auth.error";
import { fetchWithAuth } from "../client";
import { ApiError } from "../error";
import type { FoodRequestDto, FoodSearchResponse } from "./food.dto";
import { rawItemToFood } from "./food.mapper";

const FOOD_ENDPOINT = "/api/foods";

export async function getFoodSearchResults(
  query: string,
  page = 0,
): Promise<FoodSearchResponse> {
  query = query.trim();

  const params = new URLSearchParams({
    name: query,
    page: page.toString(),
    size: "20", // TODO put in config
  });

  const endpoint = `${FOOD_ENDPOINT}?${params.toString()}`;
  const response = await fetchWithAuth(endpoint);
  const raw = await response.json();

  console.log(raw);

  const foodItems = raw.content.map((rawItem: any) => rawItemToFood(rawItem));

  return {
    foodItems: foodItems,
    hasMore: !Boolean(raw.last),
  };
}

export async function postFood(
  food: Food,
  imgFile = null as File | null,
): Promise<boolean> {
  const foodRequestDto: FoodRequestDto = {
    id: food.id, // TODO tady vygenerovat ID, food.id by asi nemelo existovat v tenhle moment
    name: food.name,
    brand: food.brand,
    barcode: food.barcode,
    isMass: food.isMass,
    macronutrients: food.macronutrients,
    micronutrients: food.micronutrients,
    servings: food.servings,
  };

  const formData = new FormData();
  const foodBlob = new Blob([JSON.stringify(foodRequestDto)], {
    type: "application/json",
  });
  formData.append("food", foodBlob);
  if (imgFile) formData.append("file", imgFile);

  try {
    const response = await fetchWithAuth(
      FOOD_ENDPOINT,
      {
        method: "POST",
        body: formData,
      },
      true,
    );

    return response.ok;
  } catch (err: unknown) {
    if (err instanceof AuthError) {
      err.log();
      return false;
    } else {
      throw new ApiError(
        "Unexpected error when posting a food to backend!",
        null,
        true,
      );
    }
  }
}

export async function deleteFood(food: Food): Promise<boolean> {
  const endpoint = FOOD_ENDPOINT + "/" + food.id;
  const resposne = await fetchWithAuth(endpoint, {
    method: "DELETE",
  });
  return resposne.ok;
}
