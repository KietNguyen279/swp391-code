import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login"; // Adjust the path as necessary

test("renders login form", () => {
  render(<Login onLogin={() => {}} />);
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});

test("shows error when fields are empty", () => {
  render(<Login onLogin={() => {}} />);
  fireEvent.click(screen.getByRole("button", { name: /login/i }));
  expect(
    screen.getByText(/please enter both email and password/i)
  ).toBeInTheDocument();
});

test("calls onLogin with correct arguments", () => {
  const mockLogin = jest.fn();
  render(<Login onLogin={mockLogin} />);

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "password123" },
  });
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
});
