import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { ActiveSelectorProvider } from "./Providers/ActiveSelectorProvider";
import { AllDogsProvider } from "./Providers/DogProvider";

export function App() {
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <AllDogsProvider>
        <ActiveSelectorProvider>
          <Section label={"Dogs: "}>
            <Dogs />
          </Section>
        </ActiveSelectorProvider>
      </AllDogsProvider>
    </div>
  );
}
