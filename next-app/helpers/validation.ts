const validateEmail = (mail: string): boolean => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

const validateLength = (
  min_len: string | number,
  max_len: string | number,
  value: string | any[]
) => {
  if (value.length < min_len) {
    return [
      false,
      "Should not be less than "
        .concat(min_len.toString())
        .concat(" characters"),
    ];
  } else if (value.length > max_len) {
    return [
      false,
      "Should not be greater than "
        .concat(max_len.toString())
        .concat(" characters"),
    ];
  }

  return [true];
};

const validatePassword = (inputtxt: string) => {
  var decimal =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  return inputtxt.match(decimal);
};

const checkEquality = (input1: string, input2: string): boolean => {
  return input1 === input2;
};

export { validateEmail, validateLength, validatePassword, checkEquality };
