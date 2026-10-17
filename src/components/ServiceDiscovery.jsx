import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X, SlidersHorizontal, ArrowDown } from "lucide-react";
import { categories } from "../data/studio";
import { searchTreatments } from "../data/discovery";
import { ServiceCard } from "./StudioUI";
function CatalogueResults({ items }) {
  const [limit, setLimit] = useState(12);
  return (
    <>
      <div className="treatments-grid">
        {items.slice(0, limit).map((t) => (
          <ServiceCard key={t.id} item={t} />
        ))}
      </div>
      {items.length > limit && (
        <div className="load-more">
          <p>
            Showing {Math.min(limit, items.length)} of {items.length} rituals
          </p>
          <button
            type="button"
            className="button button-glass"
            onClick={() => setLimit(limit + 12)}
          >
            Discover more rituals <ArrowDown size={18} />
          </button>
        </div>
      )}
    </>
  );
}
export default function ServiceDiscovery() {
  const [params, setParams] = useSearchParams();
  const legacy = params.get("category");
  const category = categories.includes(legacy)
    ? legacy
    : legacy === "Skin"
      ? "Facials"
      : legacy === "Rituals"
        ? "Wellness"
        : "All";
  const query = params.get("q") || "";
  const duration = ["30", "60", "90"].includes(params.get("duration"))
    ? params.get("duration")
    : "";
  const couples = params.get("couples") === "true";
  function update(key, value) {
    setParams(
      (p) => {
        const next = new URLSearchParams(p);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );
  }
  const items = searchTreatments({ query, category, duration, couples });
  return (
    <div className="discovery" id="discover-services">
      <h2 className="sr-only">Explore the service catalogue</h2>
      <div className="discovery-toolbar">
        <div className="search-field">
          <Search aria-hidden="true" size={22} />
          <label className="sr-only" htmlFor="catalogue-search">
            Search services
          </label>
          <input
            id="catalogue-search"
            type="search"
            value={query}
            onChange={(e) => update("q", e.target.value)}
            placeholder="Search a service, a feeling, a little escape…"
          />
          {query && (
            <button
              type="button"
              className="icon-button"
              aria-label="Clear service search"
              onClick={() => update("q", "")}
            >
              <X size={18} />
            </button>
          )}
        </div>
        <label className="duration-filter">
          <SlidersHorizontal aria-hidden="true" size={18} />
          <span>Time for you</span>
          <select
            aria-label="Maximum duration"
            value={duration}
            onChange={(e) => update("duration", e.target.value)}
          >
            <option value="">Any duration</option>
            <option value="30">Up to 30 min</option>
            <option value="60">Up to 60 min</option>
            <option value="90">Up to 90 min</option>
          </select>
        </label>
      </div>
      <div className="discovery-filters">
        <div className="filter-row" role="group" aria-label="Filter services">
          {["All", ...categories].map((c) => (
            <button
              type="button"
              key={c}
              aria-pressed={category === c}
              onClick={() => update("category", c === "All" ? "" : c)}
            >
              {c === "All" ? "All services" : c}
            </button>
          ))}
        </div>
        <label className="couples-filter">
          <input
            type="checkbox"
            checked={couples}
            onChange={(e) => update("couples", e.target.checked ? "true" : "")}
          />
          For two
        </label>
      </div>
      <div className="results-heading">
        <p role="status">
          {items.length} {items.length === 1 ? "ritual" : "rituals"} to discover{" "}
          <span>· Illustrative CAD prices</span>
        </p>
        {(query || category !== "All" || duration || couples) && (
          <button
            type="button"
            className="text-link"
            onClick={() => setParams({}, { replace: true })}
          >
            Reset filters <X size={15} />
          </button>
        )}
      </div>
      {items.length ? (
        <CatalogueResults
          key={`${query}-${category}-${duration}-${couples}`}
          items={items}
        />
      ) : (
        <div className="empty-state">
          <Search size={30} />
          <h2>Let’s find your kind of calm.</h2>
          <p>
            No rituals match those choices. Try another word or clear your
            filters.
          </p>
          <button
            type="button"
            className="button"
            onClick={() => setParams({}, { replace: true })}
          >
            Show all services
          </button>
          <Link to="/booking">Or choose together in the demo request</Link>
        </div>
      )}
    </div>
  );
}
