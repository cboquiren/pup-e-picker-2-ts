// Right now these dogs are constant, but in reality we should be getting these from our server
import { useAllDogs } from "../Providers/DogProvider";
import { DogCard } from "./DogCard";
import { useActiveSelector } from "../Providers/ActiveSelectorProvider";
import { CreateDogForm } from "./CreateDogForm";
import { Dog } from "../types";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  const { allDogs, deleteDog, updateDog } = useAllDogs();
  const { activeSelector } = useActiveSelector();

  const shouldShowDogs = ["all", "favorited", "unfavorited"].includes(activeSelector);

  const createCard = (dog: Dog) => {
    return (
      <DogCard
        dog={{
          id: dog.id,
          image: dog.image,
          description: dog.description,
          isFavorite: dog.isFavorite,
          name: dog.name,
        }}
        key={dog.id}
        onTrashIconClick={() => {
          deleteDog(dog);
        }}
        onEmptyHeartClick={() => {
          updateDog(dog, true);
        }}
        onHeartClick={() => {
          updateDog(dog, false);
        }}
        isLoading={false}
      />
    );
  };

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {!shouldShowDogs && <CreateDogForm />}

      {shouldShowDogs &&
        allDogs
          .filter((dog) => {
            if (activeSelector === "all") {
              return true;
            }
            if (activeSelector === "unfavorited") {
              return !dog.isFavorite;
            }
            if (activeSelector === "favorited") {
              return dog.isFavorite;
            }
          })
          .map((dog) => createCard(dog))}
    </>
  );
};
