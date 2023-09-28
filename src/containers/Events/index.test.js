import { fireEvent, render, screen } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Events />
      </DataProvider>
    );
    // Ajout "expect" pour vérifier que le texte est présent dans le document
    expect(await screen.findByText("forum")).toBeInTheDocument();  // avant "avril" mais pas dans data ci-dessus
  });
  describe("and an error occurred", () => {
    it("an error message is displayed", async () => {
      // Utilise new Error pour créer un objet d'erreur avec le message 'some error'
      // Simule une erreur réelle renvoyée par l'API
      api.loadData = jest.fn().mockRejectedValue(new Error('some error'));
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
      expect(await screen.findByText("An error occurred")).toBeInTheDocument(); // Avant "occured" mais mal orthographié 
    });
  });
  describe("and we select a category", () => {
    it("an filtered list is displayed", async () => { // Retrait du it.only pour effectuer les autres tests
      api.loadData = jest.fn().mockReturnValue(data);
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
      // Ajout "expect" 
      expect(await screen.findByText("Forum #productCON")).toBeInTheDocument();
      fireEvent(
        await screen.findByTestId("collapse-button-testid"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      fireEvent(
        (await screen.findAllByText("soirée entreprise"))[0],
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // Ajout "expect"
      expect(await screen.findByText("Conférence #productCON")).toBeInTheDocument();
      expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
    });
  });

  describe("and we click on an event", () => {
    it("the event detail is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(data);
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      fireEvent(
        await screen.findByText("Conférence #productCON"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // Ajout "expect"
      expect(await screen.findByText("24-25-26 Février")).toBeInTheDocument();
      expect(await screen.findByText("1 site web dédié")).toBeInTheDocument();
    });
  });
});
