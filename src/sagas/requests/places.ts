const autocompleteService = new window.google.maps.places.AutocompleteService();

export const requestSearchPlace = (value: string) => {
  autocompleteService.getPlacePredictions({ input: value });
};
