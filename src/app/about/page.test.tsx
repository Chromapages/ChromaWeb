import {describe, expect, it, vi} from "vitest";

const {permanentRedirectMock} = vi.hoisted(() => ({
  permanentRedirectMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  permanentRedirect: permanentRedirectMock,
}));

import AboutRoute from "./page";

describe("AboutRoute", () => {
  it("permanently redirects to the studio section of the combined page", async () => {
    await AboutRoute();

    expect(permanentRedirectMock).toHaveBeenCalledWith("/process#studio");
  });
});
