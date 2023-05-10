import { defaults } from "lodash";

const msg0 = "Hello Jest!!";
const msg1 = "Delightful JavaScript Testing";
const millis = 3000;

const showMessage = async () => {
  console.log(msg0);
  setTimeout(() => {
    console.log(msg1);
  }, millis);
};

showMessage();

export default showMessage;
