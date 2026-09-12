import {permanentRedirect} from "next/navigation";

export default async function AboutRoute() {
  permanentRedirect("/process#studio");
}
