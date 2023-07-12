import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
    const mockUser = {
        name: "John Doe",
        username: "johndoe",
    };

    const blog = {
        title: "TestTitle",
        author: "TestAuthor",
        likes: "likeTest",
        url: "urlTest",
        user: mockUser,
    };
    render(<Blog blog={blog} user={mockUser} />);
    const title = screen.getByText("TestTitle", { exact: false });
    expect(title).toBeDefined();

    const author = screen.getByText("TestAuthor", { exact: false });
    expect(author).toBeDefined();
});
