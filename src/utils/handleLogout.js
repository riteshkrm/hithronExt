const handleLogout = () => {
  chrome.storage.local.remove(["token"], () => {
    setLoggedIn(false);
    window.close();
  });
};

export default handleLogout;