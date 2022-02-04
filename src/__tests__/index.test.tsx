import { render, screen, fireEvent, waitFor } from "./test-utils";
import { Form1 } from "../pages/form1";

describe("Form1 validation", () => {
  test("全ての要素が空", async () => {
    render(<Form1 updateAction={() => {}} moveToForm2={() => {}} />);
    const inputFirstName = screen.getByLabelText("FirstName");
    fireEvent.change(inputFirstName, { target: { value: "" } });
    const inputLastName = screen.getByLabelText("LastName");
    fireEvent.change(inputLastName, { target: { value: "" } });
    const submitButton = screen.getByText("次の画面へ");
    // 「次の画面へ」ボタンをクリック
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("FirstNameは必須入力です。")).toBeTruthy();
      expect(screen.getByText("LastNameは必須入力です。")).toBeTruthy();
    });
  });

  test("LastNameのみ空", async () => {
    render(<Form1 updateAction={() => {}} moveToForm2={() => {}} />);
    const inputFirstName = screen.getByLabelText("FirstName");
    fireEvent.change(inputFirstName, { target: { value: "田中" } });
    const submitButton = screen.getByText("次の画面へ");
    // 「次の画面へ」ボタンをクリック
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.queryByText("FirstNameは必須入力です。")).toBeNull();
      expect(screen.getByText("LastNameは必須入力です。"));
    });
  });

  test("FirstNameのみ空", async () => {
    render(<Form1 updateAction={() => {}} moveToForm2={() => {}} />);
    const inputLastName = screen.getByLabelText("LastName");
    fireEvent.change(inputLastName, { target: { value: "山田" } });
    const submitButton = screen.getByText("次の画面へ");
    // 「次の画面へ」ボタンをクリック
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("FirstNameは必須入力です。"));
      expect(screen.queryByText("LastNameは必須入力です。")).toBeNull();
    });
  });

  test("validationエラーなし", async () => {
    const mockUpdateAction = jest.fn(() => {});
    const moveToForm2 = jest.fn(() => {});
    render(<Form1 updateAction={mockUpdateAction} moveToForm2={moveToForm2} />);
    const inputFirstName = screen.getByLabelText("FirstName");
    fireEvent.change(inputFirstName, { target: { value: "田中" } });
    const inputLastName = screen.getByLabelText("LastName");
    fireEvent.change(inputLastName, { target: { value: "山田" } });
    const submitButton = screen.getByText("次の画面へ");
    // 「次の画面へ」ボタンをクリック
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.queryByText("FirstNameは必須入力です。")).toBeNull();
      expect(screen.queryByText("LastNameは必須入力です。")).toBeNull();
      expect(mockUpdateAction.mock.calls.length).toBe(1);
      expect(moveToForm2.mock.calls.length).toBe(1);
    });
  });
});
