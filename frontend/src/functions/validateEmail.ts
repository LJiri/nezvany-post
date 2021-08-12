const validateEmail = (email: string): boolean =>
  email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? true : false;

export default validateEmail;
