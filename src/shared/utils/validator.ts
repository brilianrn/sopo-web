export const isEmail = (email: string) => {
  const regex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

export const isNumber = (num: string) => {
  const regex = /^\d+$/;
  return regex.test(num);
};
