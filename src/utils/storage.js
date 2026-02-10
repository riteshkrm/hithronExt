export const saveToken = (token) =>
  chrome.storage.local.set({ authToken: token });

export const getToken = () =>
  chrome.storage.local.get("authToken");
