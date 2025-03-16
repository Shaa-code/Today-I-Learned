type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type Union = Dog | Person;
type InterSection = Dog & Person;

let Union: InterSection = {
  name: "",
  color: "",
};
