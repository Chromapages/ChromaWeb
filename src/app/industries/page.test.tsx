import {describe, expect, it, vi} from "vitest";

const {permanentRedirectMock} = vi.hoisted(() => ({
  permanentRedirectMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  permanentRedirect: permanentRedirectMock,
}));

import IndustriesHubPage from "./page";

describe("IndustriesHubPage", () => {
  it("permanently redirects the overview to the combined Solutions hub", async () => {
    await IndustriesHubPage();

    expect(permanentRedirectMock).toHaveBeenCalledWith("/services#industries");
  });
});
