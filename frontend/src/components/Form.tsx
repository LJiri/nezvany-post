import { FormEvent, FC, useState } from 'react';
import '../styles/form.scss';
import Axios from 'axios';
import validateEmail from '../functions/validateEmail';

export const Form: FC = () => {
  const [email, setEmail] = useState('');
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [emailIsSubmited, setEmailIsSubmited] = useState(false);

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
      setEmail('');
      setShowValidationMessage(false);
      setEmailIsSubmited(true);
      console.log('testttt');
      setTimeout(() => {
        console.log('working');
        setEmailIsSubmited(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1 className="form__header">
        Pro více informací o projektu{' '}
        <span className="form__highlighted">Nezvaný post</span> prosím vyplňte
        svůj e-mail:
      </h1>
      <div className="form__input-wrapper">
        <input
          type="email"
          className="form__input"
          value={email}
          onChange={changeEmail}
          disabled={emailIsSubmited}
        />
        {showValidationMessage && (
          <p className="form__validation-msg">
            **Zadejte email ve správném formátu
          </p>
        )}
      </div>
      <div className="form__button-wrapper">
        <button
          type="button"
          className="form__button"
          onClick={sendEmailWithValidation}
          disabled={emailIsSubmited}
        >
          {!emailIsSubmited && 'Odeslat'}
          {emailIsSubmited && 'E-mail odeslán'}
        </button>
        <div className="form__gdpr">
          **Vyplněním a odesláním svého e-mailu souhlasíte s jeho zpracováním
          pouze pro účely projektu{' '}
          <span className="form__highlighted">NEZVANÝ POST</span>.
        </div>
      </div>
    </div>
  );
};
