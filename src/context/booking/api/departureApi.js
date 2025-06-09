import { API_URL, fetchJson } from "../utils/apiUtil";

export const getDepartures = (from, to) => {
  return fetchJson(`${API_URL}/departures?from=${from}&to=${to}`);
};

export const getDepartureById = async (departureId) => {
  const departures = await fetchJson(`${API_URL}/departures?id=${departureId}`);
  return departures[0];
};
