import { render, screen } from "./test-utils";
import { Form1 } from "../pages/form1";

test("Form1 Show", () => {
  render(<Form1 updateAction={() => {}} moveToForm2={() => {}} />);
  const input = screen.getByLabelText("FirstName");
  console.log(input);
});
