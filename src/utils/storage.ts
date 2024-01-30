export function setItemInLS(key: string, value: string) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItemFromLS(key: string) {
  const value = localStorage.getItem(key);
  if (!value) {
    return [];
  }

  return JSON.parse(value);
}

export function DeleteItemFromLS(key: string) {
  localStorage.removeItem(key);
  return;
}
