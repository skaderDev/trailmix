const FAVORITES_KEY = "trailmix:favorites";

export function getSavedActivityIds() {
  const savedIds = localStorage.getItem(FAVORITES_KEY);

  if (!savedIds) {
    return [];
  }

  return JSON.parse(savedIds) as number[];
}

export function saveActivityId(activityId: number) {
  const savedIds = getSavedActivityIds();

  if (savedIds.includes(activityId)) {
    return savedIds;
  }

  const nextSavedIds = [...savedIds, activityId];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextSavedIds));

  return nextSavedIds;
}

export function removeActivityId(activityId: number) {
  const nextSavedIds = getSavedActivityIds().filter((id) => id !== activityId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextSavedIds));

  return nextSavedIds;
}
