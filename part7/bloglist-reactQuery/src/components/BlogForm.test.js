import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("form calls the event handler it received as props with the right details when a new blog is created.", async () => {
    const mockHandler = jest.fn();
    const user = userEvent.setup();
    render(<BlogForm createBlog={mockHandler} />);

    const inputTitle = screen.getByLabelText("Title");
    const inputAuthor = screen.getByLabelText("Author");
    const inputUrl = screen.getByLabelText("Url");

    await user.type(inputTitle, "Test Title");
    await user.type(inputAuthor, "Test Author");
    await user.type(inputUrl, "Test Url");

    const button = screen.getByText("create");
    await userEvent.click(button);

    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith({
        title: "Test Title",
        author: "Test Author",
        url: "Test Url",
    });
});
