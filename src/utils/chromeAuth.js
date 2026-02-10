export const googleLogin = () => {
  chrome.runtime.sendMessage({ action: "googleLogin" });
};

export const logout = () => {
  chrome.runtime.sendMessage({ action: "logout" });
};
