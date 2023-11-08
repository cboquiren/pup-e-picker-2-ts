/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type allDogsContextType = {
  allDogs: Dog[];
  setAllDogs: (allDogs: Dog[]) => void;
  deleteDog: (dog: Dog) => void;
  updateDog: (dog: Dog, isFavorite: boolean) => void;
  createDog: (dog: Omit<Dog, "id">) => void;
};

const AllDogsContext = createContext<allDogsContextType>({} as allDogsContextType);

const getAllDogs = () => {
  return Requests.getAllDogs();
};

export const AllDogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  const refreshDogs = () => {
    return getAllDogs().then(setAllDogs);
  };

  useEffect(() => {
    refreshDogs();
  }, []);

  const deleteDog = (dog: Dog) => {
    setAllDogs(allDogs.filter((dogCard) => dogCard.id !== dog.id));
    Requests.deleteDogRequest(dog)
      .then((response) => {
        if (!response) {
          setAllDogs(allDogs);
        } else return;
      })
      .then(() => toast.success(`${dog.name} was deleted`));
  };

  const updateDog = (dog: Dog, isFavorite: boolean) => {
    setAllDogs(
      allDogs.map((dogCard) =>
        dogCard.id !== dog.id ? dogCard : { ...dog, isFavorite: isFavorite }
      )
    );
    Requests.patchFavoriteForDog(dog, isFavorite).then((response) => {
      if (!response) {
        setAllDogs(allDogs);
      } else {
        console.log(response);
      }
    });
  };

  const createDog = (dog: Omit<Dog, "id">) => {
    setAllDogs([...allDogs, dog as Dog]);
    Requests.postDog(dog)
      .then((response: Dog) => {
        if (!response) {
          setAllDogs(allDogs);
        } else {
          setAllDogs([...allDogs, { ...dog, id: response.id }]);
        }
      })
      .then(() => toast.success(`${dog.name} was created`));
  };

  return (
    <AllDogsContext.Provider value={{ allDogs, setAllDogs, deleteDog, updateDog, createDog }}>
      {children}
    </AllDogsContext.Provider>
  );
};

export const useAllDogs = () => useContext(AllDogsContext);
