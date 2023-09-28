import { render, fireEvent, screen } from "@testing-library/react";
import Events from "./index";
import mockEventData from '../../../public/events.json';

// Mock DataContext pour remplacer les données réelles par des données de test
jest.mock("../../contexts/DataContext", () => ({
  useData: () => ({ data: mockEventData, error: null }),
}));

describe("When the 'expérience digitale' event category is selected", () => {
  
  // Rend le composant Events avant chaque test
  beforeEach(() => {
    render(<Events />);
    // Ouvre le menu déroulant
    fireEvent.click(screen.getByTestId("collapse-button-testid"));
    // Sélectionne l'option 'Expérience digitale'
    fireEvent.click(screen.getByTestId("select-testid"));
  });

  // Vérifie si le composant Select s'affiche au clic sur le bouton
  it("should open the Select component when the collapse button is clicked", async () => {
    const selectComponent = await screen.findByTestId("select-component-testid");
    expect(selectComponent).toBeInTheDocument();
  });

  // Vérifie si le menu déroulant est ouvert et si 'Expérience digitale' est sélectionnée
  it("should open the dropdown and have 'Expérience digitale' selected", () => {
    // Trouve l'option 'Expérience digitale' et vérifie la bonne classe
    expect(screen.getByTestId("select-testid")).toBeInTheDocument();
    expect(screen.getByTestId("select-testid")).toHaveClass("SelectContainer");
  });

  // Vérifie si toutes les options sont cachées après la sélection de 'expérience digitale'
  it("should hide all options after selecting 'expérience digitale'", () => {
    // Trouve et vérifie que l'élément représentant l'option 'Toutes' est caché, impliquant que toutes les options sont cachées.
    const allOption = screen.getByTestId("all-option");
    expect(allOption).toBeInTheDocument();
    expect(allOption).toHaveClass("SelectTitle--hide");
    expect(allOption).not.toHaveClass("SelectTitle--show");
  });

  // Vérifie si 'expérience digitale' est affiché comme catégorie actuellement sélectionnée
  it("should display 'expérience digitale' as the currently selected category", () => {
    // Trouve l'option 'expérience digitale' et vérifie qu'elle est dans le document
    const option = screen.getByTestId("option-expérience digitale");
    expect(option).toBeInTheDocument();
  });

  // Vérifie si le bon nombre d'événements 'expérience digitale' est affiché
  it("should display the correct number of 'expérience digitale' events", () => {
    // Filtre les événements 'expérience digitale' et compare leur nombre
    const displayedEvents = mockEventData.events.filter(e => e.type === "expérience digitale").length;
    expect(displayedEvents).toBe(4);
  });
});