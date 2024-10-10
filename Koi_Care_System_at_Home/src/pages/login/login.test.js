import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage"; // Adjust the path to your LoginPage component
import axios from "axios";
import { toast } from "react-toastify";

// Mock dependencies
jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Utility to wrap component in BrowserRouter for routing context
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("LoginPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Login form with phone and password fields", () => {
    renderWithRouter(<LoginPage />);

    // Check if all form elements are present
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  test("displays error message when required fields are not filled", async () => {
    renderWithRouter(<LoginPage />);

    // Click on the Login button without filling in fields
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Expect validation messages to be displayed
    expect(await screen.findByText(/please input phone/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/please input password/i)
    ).toBeInTheDocument();
  });

  test("makes an API call and handles successful login", async () => {
    renderWithRouter(<LoginPage />);

    // Mock API response
    axios.post.mockResolvedValue({
      data: {
        role: "USER",
        token: "sample-token",
      },
    });

    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "123456789" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Click on Login button
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for the mock API call to be made and assertions to be fulfilled
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith("login", {
        phone: "123456789",
        password: "password123",
      })
    );

    // Check for success toast and navigation logic
    expect(toast.success).toHaveBeenCalledWith("Login successfully!");
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "sample-token");
  });

  test("shows error toast on failed login", async () => {
    renderWithRouter(<LoginPage />);

    // Mock API error response
    axios.post.mockRejectedValue({
      response: { data: "Invalid phone or password" },
    });

    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "123456789" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    // Click on Login button
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for the mock API call to be made and assertions to be fulfilled
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith("login", {
        phone: "123456789",
        password: "wrongpassword",
      })
    );

    // Check for error toast
    expect(toast.error).toHaveBeenCalledWith("Invalid phone or password");
  });

  test("navigates to Register page on clicking Register button", () => {
    renderWithRouter(<LoginPage />);

    // Click on Register button
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    // Verify if the URL changes to /register (using react-router mock)
    expect(window.location.pathname).toBe("/register");
  });
});
