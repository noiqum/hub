"use client";

import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
    it("should render", () => {
        render(<Button>Test</Button>);
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should render with variant", () => {
        render(<Button variant="ghost">Test</Button>);
        expect(screen.getByText("Test")).toHaveClass("bg-transparent");
    });

    it("should render with size", () => {
        render(<Button size="sm">Test</Button>);
        expect(screen.getByText("Test")).toHaveClass("h-8");
    });

    it("should render with asChild", () => {
        render(<Button asChild>Test</Button>);
        expect(screen.getByText("Test")).toHaveClass("bg-transparent");
    });
});