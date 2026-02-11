chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    // LOGIN
    if (request.action === "googleLogin") {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }

            chrome.storage.local.set({ loggedIn: true, token });

            chrome.storage.local.get(["token"], (result) => {
                console.log(result.token);
            });

            // Open Dashboard in new tab
            chrome.tabs.create({
                url: chrome.runtime.getURL("index.html#/dashboard")
            });
        });
    }



    // LOGOUT
    if (request.action === "logout") {
        chrome.storage.local.get("token", (data) => {
            if (data.token) {
                // Revoke token
                fetch(`https://accounts.google.com/o/oauth2/revoke?token=${data.token}`)
                    .then(() => {
                        chrome.identity.removeCachedAuthToken({ token: data.token }, () => {
                            chrome.storage.local.clear(() => {
                                chrome.tabs.create({
                                    url: chrome.runtime.getURL("login.html")
                                });
                            });
                        });
                    });
            }
        });
    }

});


chrome.runtime.sendMessage({ type: "LOGIN_SUCCESS" });