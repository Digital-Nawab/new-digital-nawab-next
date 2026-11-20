// Cached cities helper to avoid redundant API requests across components
let citiesCachePromise = null;

export async function getActiveCities() {
  if (typeof window === "undefined") {
    return [];
  }

  if (!citiesCachePromise) {
    citiesCachePromise = fetch("/api/cities")
      .then((res) => res.json())
      .then((json) => {
        if (json.status && Array.isArray(json.data)) {
          return json.data.filter((city) => city.is_active);
        }
        return [];
      })
      .catch((err) => {
        console.error("Failed to fetch cities:", err);
        citiesCachePromise = null;
        return [];
      });
  }
  return citiesCachePromise;
}
