import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {

  // Rend le composant Home avant chaque test
  beforeEach(() => {
    render(<Home />);
  });

  // Vérifie l'affichage de la liste des événements
  it("a list of events is displayed", () => {
    const eventsSection = screen.getByTestId("events-section");
    expect(eventsSection).toBeInTheDocument();
  })
  // Vérifie l'affichage de la liste des personnes
  it("a list a people is displayed", () => {
    const peopleSection = screen.getByTestId("people-section");
    expect(peopleSection).toBeInTheDocument();
  })
  // Vérifie la présence du footer sur la page
  it("a footer is displayed", () => {
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  })
  // Vérifie l'affichage de la card avec le dernier événement
  it("an event card, with the last event, is displayed", () => {
    const lastEventCard = screen.getByTestId("last-event-card");
    expect(lastEventCard).toBeInTheDocument();
  })
});
