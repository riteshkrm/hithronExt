const handleLogout = () => {
  chrome.runtime.sendMessage({ action: "logout" });
};

export default handleLogout;