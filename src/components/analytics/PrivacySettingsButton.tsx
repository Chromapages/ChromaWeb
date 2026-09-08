"use client";

import {privacySettingsEvent} from "@/lib/analytics";

export function PrivacySettingsButton() {
  return (
    <button className="hover:text-canvas/80 focus-visible:outline-2 focus-visible:outline-teal" onClick={() => window.dispatchEvent(new Event(privacySettingsEvent))} type="button">
      Privacy settings
    </button>
  );
}
