import { FOOD_SEARCH_PAGE_SIZE } from "@/constants/food.const";
import type { Food } from "@/model";
import { fetchWithAuth } from "../client";
import type { FoodRequestDto, FoodSearchResponse } from "./food.dto";
import { FoodSearchFilter } from "./food.filter";
import { foodToDto, rawItemToFood } from "./food.mapper";

const FOOD_ENDPOINT = "/api/foods";

export async function getFoods(
  query: string,
  filter = FoodSearchFilter.ALL as FoodSearchFilter,
  page = 0,
): Promise<FoodSearchResponse> {
  query = query.trim();

  const params = new URLSearchParams({
    query: query,
    filter: filter,
    page: page.toString(),
    size: FOOD_SEARCH_PAGE_SIZE.toString(),
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

export async function postFood(food: Food, imgFile = null as File | null) {
  const foodRequestDto: FoodRequestDto = foodToDto(food);

  const formData = new FormData();
  const foodBlob = new Blob([JSON.stringify(foodRequestDto)], {
    type: "application/json",
  });
  formData.append("food", foodBlob);
  if (imgFile) formData.append("file", imgFile);

  await fetchWithAuth(
    FOOD_ENDPOINT,
    {
      method: "POST",
      body: formData,
    },
    true,
  );
}

export async function putFood(
  food: Food,
  changedImageFile = null as File | null,
) {
  const foodRequestDto = foodToDto(food);
  const formData = new FormData();
  const foodBlob = new Blob([JSON.stringify(foodRequestDto)], {
    type: "application/json",
  });
  formData.append("food", foodBlob);
  if (changedImageFile) formData.append("file", changedImageFile);

  const endpoint = FOOD_ENDPOINT + "/" + food.id;
  await fetchWithAuth(
    endpoint,
    {
      method: "PUT",
      body: formData,
    },
    true,
  );
}

export async function deleteFood(food: Food) {
  const endpoint = FOOD_ENDPOINT + "/" + food.id;
  const response = await fetchWithAuth(endpoint, {
    method: "DELETE",
  });
}
