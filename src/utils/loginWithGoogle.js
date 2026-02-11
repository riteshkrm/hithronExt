const loginWithGoogle = () => {
    chrome.runtime.sendMessage({ action: "googleLogin" });
};

export default loginWithGoogle;

