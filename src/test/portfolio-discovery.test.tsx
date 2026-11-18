import type { ReactNode } from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LatestWork, PortfolioIntro } from "@/components/site/PortfolioShowcase";
import { projects, recentProjects } from "@/data/portfolio";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
}));

afterEach(cleanup);

describe("Portfolio discovery", () => {
  it("keeps each featured image, caption and destination together as visitors cycle in either direction", () => {
    render(<PortfolioIntro />);
    const features = recentProjects.filter((p) => p.cover);
    const card = within(screen.getByRole("region", { name: "Featured projects" }));
    function expectFeature(index: number) {
      const p = features[index]!;
      const link = card.getByRole("link", { name: `Visit ${p.name}` });
      expect(link).toHaveAttribute("href", p.url);
      expect(within(link).getByRole("img", { name: p.cover!.alt })).toHaveAttribute("src", p.cover!.src);
      expect(card.getByText(p.blurb)).toBeInTheDocument();
    }
    expectFeature(0);
    fireEvent.click(card.getByRole("button", { name: "Previous featured project" }));
    expectFeature(features.length - 1);
    fireEvent.click(card.getByRole("button", { name: "Next featured project" }));
    expectFeature(0);
  });

  it("expands recent releases and filters them without mixing website and source links", () => {
    render(<LatestWork />);
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
    fireEvent.click(screen.getByRole("button", { name: `Show all ${recentProjects.length}` }));
    expect(screen.getAllByRole("listitem")).toHaveLength(recentProjects.length);
    for (const p of recentProjects) {
      expect(screen.getByRole("link", { name: `Visit ${p.name}` })).toHaveAttribute("href", p.url);
      expect(screen.getByRole("link", { name: `View ${p.name} source on GitHub` })).toHaveAttribute("href", p.repo);
      expect(projects).toContain(p);
    }
    fireEvent.click(screen.getByRole("button", { name: "Web design" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Archontiko Tsikari" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
  });
});
