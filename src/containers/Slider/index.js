import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trie les événements par date en ordre décroissant
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  // Gère le clic sur les points de pagination pour afficher la slide correspondante
  const dotClick = (dotIndex) => {
    setIndex(dotIndex);
  };

  // Démarre un timer pour changer automatiquement de slide toutes les 5 secondes
  useEffect(() => {
    let timer;

    if (byDateDesc && byDateDesc.length > 0) {
      timer = setInterval(() => {
        setIndex((currentIndex) =>
          currentIndex < byDateDesc.length - 1 ? currentIndex + 1 : 0
        );
      }, 5000);
    }

    // Nettoie le timer lorsque le composant est démonté ou lorsque byDateDesc change
    return () => {
      clearInterval(timer);
    };
  }, [byDateDesc]);

  return (
    <div className="SlideCardList">
      {/* // Parcours les événements triés par date et affiche chaque slide */}
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          // Applique une classe CSS conditionnelle pour afficher ou masquer la slide
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              {/* Affiche le mois de l'événement en convertissant la date en objet Date JavaScript */}
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {/* Crée des boutons radio pour la pagination des slides */}
          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={_.title}
              type="radio"
              name="radio-button"
              // Vérifie si le bouton radio actuel correspond à la slide active
              checked={index === radioIdx}
              // Appelle la fonction dotClick avec l'indice du bouton radio cliqué
              onChange={() => dotClick(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;