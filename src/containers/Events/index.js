import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  // Récupére les données et l'erreur depuis le contexte de données
  const { data, error } = useData();
  // État pour stocker la catégorie sélectionnée et la page en cours
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Calcule le nombre total de pages pour la catégorie sélectionnée
  const categoryPageCount = Math.ceil(
    ((selectedCategory
        ? data?.events.filter((event) => event.type === selectedCategory)
        : data?.events) || []
    ).length / PER_PAGE
  );

  // Fonction pour changer la catégorie sélectionnée
  const changeType = (evtType) => {
    setCurrentPage(1); // Réinitialise la page en cours à 1 lorsqu'une nouvelle catégorie est sélectionnée
    setSelectedCategory(evtType); // Met à jour la catégorie sélectionnée
  };

  // Filtre les événements en fonction de la catégorie et de la pagination
  const filteredEvents = (
    (!selectedCategory
      ? data?.events
      : data?.events.filter((event) => event.type === selectedCategory)) || []
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true; // Inclut l'événement dans la liste affichée
    }
    return false; // Exclut l'événement de la liste affichée
  });

  // Récupére la liste des types d'événements uniques
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => changeType(value)} // Appelle changeType avec la valeur sélectionnée dans le composant Select
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {Array.from({ length: categoryPageCount }).map((_, pageIndex) => (
              <button
                // Clé unique pour gérer efficacement les mises à jour à chaque changement
                key={`page-${pageIndex + 1}`}
                type="button" 
                // Applique la classe "active" si currentPage correspond à cette page
                className={currentPage === pageIndex + 1 ? "active" : ""}
                // Lorsque le bouton est cliqué, met à jour la page actuelle
                onClick={() => setCurrentPage(pageIndex + 1)}
              >
                {/* Numéro de la page à afficher sur le bouton */}
                {pageIndex + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;