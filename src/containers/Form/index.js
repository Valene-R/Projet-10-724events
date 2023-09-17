import { useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// Fonction simulant une API de contact asynchrone avec un délai de réponse
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 900); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  // useRef est utilisé pour obtenir une référence à l'élément du formulaire
  const formRef = useRef(null);

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  // Fonction pour gérer la soumission du formulaire
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(); // Appelle la fonction onSuccess après un envoi réussi
        resetForm(); // Réinitialise le formulaire après un envoi réussi
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    // Gère la soumission du formulaire en appelant la fonction sendContact
    // La référence formRef est liée à l'élément du formulaire
    <form onSubmit={sendContact} data-testid="form" ref={formRef}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select 
            selection={["Personnel", "Entreprise"]}
            onChange={() => null}
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending} data-testid="button-test-id">
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;