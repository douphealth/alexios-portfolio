import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { WebsiteCollection } from "@/components/site/WebsiteCollection";
import { mainSites } from "@/data/portfolio";

afterEach(cleanup);

describe("Website collection", () => {
  it("exposes a direct link and a working preview selection for every main domain", () => {
    render(<WebsiteCollection />);
    expect(new Set(mainSites.map((s) => s.url)).size).toBe(10);
    for (const site of mainSites) {
      expect(screen.getByRole("link", { name: `Open ${site.name}` })).toHaveAttribute(
        "href",
        site.url,
      );
      fireEvent.click(screen.getByRole("button", { name: `Preview ${site.name}` }));
      const preview = within(screen.getByRole("article", { name: `${site.name} preview` }));
      expect(preview.getByRole("heading")).toHaveTextContent(site.name);
      expect(preview.getByRole("link", { name: site.action.label })).toHaveAttribute(
        "href",
        site.action.url,
      );
    }
  });

  it("combines topic and text filters, switches to a matching preview and recovers from empty results", () => {
    render(<WebsiteCollection />);
    fireEvent.click(screen.getByRole("button", { name: "Creative tools" }));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "private image" } });
    expect(screen.getByRole("article")).toHaveAccessibleName("ImageAlchemy preview");
    expect(screen.getByRole("status")).toHaveTextContent("1 website");
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "no such project" } });
    expect(screen.queryByRole("article")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(screen.getByRole("status")).toHaveTextContent("10 websites");
  });
});
