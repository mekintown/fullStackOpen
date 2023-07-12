import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("test blog", () => {
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

    test("renders content", () => {
        render(<Blog blog={blog} user={mockUser} />);
        const title = screen.getByText("TestTitle", { exact: false });
        expect(title).toBeDefined();

        const author = screen.getByText("TestAuthor", { exact: false });
        expect(author).toBeDefined();
    });

    test("after clicking the button, children are displayed", async () => {
        const { container } = render(<Blog blog={blog} user={mockUser} />);

        const user = userEvent.setup();
        const button = screen.getByText("Hide");
        await user.click(button);

        const div = container.querySelector(".togglableContent");
        expect(div).not.toHaveStyle("display: none");
    });
});
