import type { Food } from "../../model";
import { AuthError } from "../auth/auth.error";
import { fetchWithAuth } from "../client";
import { ApiError } from "../error";
import type { FoodRequestDto, FoodSearchResponse } from "./food.dto";
import { foodToDto, rawItemToFood } from "./food.mapper";

const FOOD_ENDPOINT = "/api/foods";

export async function getFoodSearchResults(
  query: string,
  page = 0,
): Promise<FoodSearchResponse> {
  query = query.trim();

  const params = new URLSearchParams({
    query: query,
    page: page.toString(),
    size: "20", // TODO put in config
  });

  const endpoint = `${FOOD_ENDPOINT}?${params.toString()}`;
  const response = await fetchWithAuth(endpoint);
  const raw = await response.json();

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
  const foodRequestDto: FoodRequestDto = foodToDto(food);

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

export async function putFood(
  food: Food,
  changedImageFile = null as File | null,
): Promise<boolean> {
  const foodRequestDto = foodToDto(food);
  const formData = new FormData();
  const foodBlob = new Blob([JSON.stringify(foodRequestDto)], {
    type: "application/json",
  });
  formData.append("food", foodBlob);
  if (changedImageFile) formData.append("file", changedImageFile);

  const endpoint = FOOD_ENDPOINT + "/" + food.id;
  try {
    const response = await fetchWithAuth(
      endpoint,
      {
        method: "PUT",
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
