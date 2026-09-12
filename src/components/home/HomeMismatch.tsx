import {HomeMismatchDesktop} from "./HomeMismatchDesktop";
import {HomeMismatchMobile} from "./HomeMismatchMobile";
import type {HomeMismatchData} from "./homeMismatchData";

export function HomeMismatch({section}: {section?: HomeMismatchData | null}) {
  return (
    <>
      <HomeMismatchDesktop section={section} />
      <HomeMismatchMobile section={section} />
    </>
  );
}
