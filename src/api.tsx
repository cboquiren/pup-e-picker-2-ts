import { z } from "zod";
import { Dog, dogSchema } from "./types";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

const getAllDogs = (): Promise<Dog[]> => {
  return fetch(`${BASE_URL}/dogs`)
    .then((response) => response.json())
    .then((shouldBeDogs) => z.array(dogSchema).parse(shouldBeDogs));
};

const postDog = (dog: Omit<Dog, "id">) => {
  return fetch(`${BASE_URL}/dogs`, {
    method: "POST",
    body: JSON.stringify(dog),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

const deleteDogRequest = (dog: Dog) => {
  return fetch(`${BASE_URL}/dogs/${dog.id}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

const patchFavoriteForDog = (dog: Dog, isLiked: boolean) => {
  return fetch(`${BASE_URL}/dogs/${dog.id}`, {
    method: "PATCH",
    body: JSON.stringify({ isFavorite: isLiked }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
