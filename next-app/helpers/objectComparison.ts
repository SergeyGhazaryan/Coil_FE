export default function isEqual(object1: object, object2: object): boolean {
  const props1 = Object.getOwnPropertyNames(object1);
  const props2 = Object.getOwnPropertyNames(object2);

  if (props1.length !== props2.length) {
    return false;
  }

  for (let i = 0; i < props1.length; i++) {
    const prop = props1[i];

    if (
      JSON.stringify(object1[prop]).replace(/"/g, "") !==
      JSON.stringify(object2[prop]).replace(/"/g, "")
    ) {
      if (+object1[prop] && +(+object2[prop])) {
        return +object1[prop] === +object2[prop];
      }
      return false;
    }
  }
  return true;
}
