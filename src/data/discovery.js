import { treatments } from "./studio.js";
export function searchTreatments({
  query = "",
  category = "All",
  duration = "",
  couples = false,
} = {}) {
  const words = query
    .toLocaleLowerCase("en-CA")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return treatments.filter(
    (t) =>
      (category === "All" || t.category === category) &&
      (!duration || t.duration <= Number(duration)) &&
      (!couples || t.couples) &&
      words.every((word) =>
        `${t.title} ${t.category} ${t.description}`
          .toLocaleLowerCase("en-CA")
          .includes(word),
      ),
  );
}
