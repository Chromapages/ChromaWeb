import type {HomepageData} from "@/components/home/Homepage";

import {fetchSanity} from "./fetchPage";
import {homePageQuery} from "./queries";

export function getHomepage() {
  return fetchSanity<HomepageData>(homePageQuery);
}
