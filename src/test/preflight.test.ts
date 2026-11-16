import { describe, expect, it } from "vitest";
import { preflight } from "@/lib/preflight";

describe("preflight", () => {
  it("adds https and passes a clean URL", () => {
    const r = preflight("example.com/blog/my-post");
    expect(r.url?.protocol).toBe("https:");
    expect(r.checks.every((c) => c.ok)).toBe(true);
  });
  it("flags tracking params and http", () => {
    const r = preflight("http://example.com/Post?utm_source=x");
    const fails = r.checks.filter((c) => !c.ok).map((c) => c.label);
    expect(fails).toEqual(expect.arrayContaining(["Served over HTTPS", "No tracking parameters", "Lowercase path"]));
  });
  it("rejects invalid input", () => {
    expect(preflight("").error).toBeTruthy();
    expect(preflight("localhost").error).toBeTruthy();
  });
});
