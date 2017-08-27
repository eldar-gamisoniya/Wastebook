export const callIfChanged = (validate, value, previousValue, func1, func2) => {
  if (value === previousValue || validate(value) === validate(previousValue))
    return;
  if (validate(value)) func1();
  else func2();
};
