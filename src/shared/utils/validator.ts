export const isEmail = (email: string) => {
  const regex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

export const isNumber = (num: string) => {
  const regex = /^\d+$/;
  return regex.test(num);
};

export const isPhone = (phone: string) => {
  const regex = /^(?:\+62|0)[0-9]{8,13}$/;
  return regex.test(phone);
};
