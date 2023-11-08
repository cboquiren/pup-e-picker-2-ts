import { ReactNode } from "react";
import { useActiveSelector } from "../Providers/ActiveSelectorProvider";
import { ActiveSelectorType, Dog } from "../types";
import { useAllDogs } from "../Providers/DogProvider";

const getCounts = (dogs: Dog[]) => {
  let likedCount = 0;
  let unlikedCount = 0;

  for (const dog of dogs) {
    dog.isFavorite ? likedCount++ : unlikedCount++;
  }

  return { likedCount, unlikedCount };
};

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { activeSelector, setActiveSelector } = useActiveSelector();
  const { allDogs } = useAllDogs();
  const { likedCount, unlikedCount } = getCounts(allDogs);

  const setSelector = (value: ActiveSelectorType) => {
    return activeSelector === value ? setActiveSelector("all") : setActiveSelector(value);
  };

  const setActiveClass = (value: ActiveSelectorType) => {
    return activeSelector === value ? "active" : "";
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${setActiveClass("favorited")}`}
            onClick={() => {
              setSelector("favorited");
            }}
          >
            favorited ( {likedCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${setActiveClass("unfavorited")}`}
            onClick={() => {
              setSelector("unfavorited");
            }}
          >
            unfavorited ( {unlikedCount} )
          </div>
          <div
            className={`selector ${setActiveClass("create")}`}
            onClick={() => {
              setSelector("create");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
