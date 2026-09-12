import type {OfferPageData} from "@/components/offer/OfferPage";

import {fetchSanity} from "./fetchPage";
import {offerDirectoryQuery, offerPageQuery} from "./queries";

export function getOffer(slug: string) {
  return fetchSanity<OfferPageData>(offerPageQuery, {slug});
}

export function getOffers() {
  return fetchSanity<OfferPageData[]>(offerDirectoryQuery);
}
