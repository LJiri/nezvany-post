import { FormEvent, FC, useState } from 'react';
import '../styles/form.scss';
import Axios from 'axios';
import validateEmail from '../functions/validateEmail';

export const Form: FC = () => {
  const [email, setEmail] = useState('');
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const changeEmail = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const sendEmailWithValidation = () => {
    if (validateEmail(email)) {
      sendEmail();
    } else {
      setShowValidationMessage(true);
    }
  };

  const sendEmail = async () => {
    try {
      const data = await Axios.post('/api/emails/register', {
        email,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1 className="form__header">Pro více informací zadejte svůj email</h1>
      <div className="form__input-wrapper">
        <input
          type="email"
          className="form__input"
          value={email}
          onChange={changeEmail}
        />
        {showValidationMessage && (
          <p className="form__validation-msg">
            ** Zadejte email ve správném formátu
          </p>
        )}
      </div>
      <button
        type="button"
        className="form__button"
        onClick={sendEmailWithValidation}
      >
        Odeslat
      </button>
    </div>
  );
};