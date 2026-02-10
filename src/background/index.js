// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

//     /* ===== GOOGLE LOGIN ===== */
//     if (message.action === "googleLogin") {
//         chrome.identity.getAuthToken({ interactive: true }, (token) => {
//             if (chrome.runtime.lastError) {
//                 console.error(chrome.runtime.lastError.message);
//                 return;
//             }

//             chrome.storage.local.set(
//                 { loggedIn: true, token },
//                 () => {
//                     chrome.tabs.create({
//                         url: chrome.runtime.getURL("dashboard.html")
//                     });
//                 }
//             );
//         });
//     }

//     /* ===== LOGOUT ===== */
//     if (message.action === "logout") {
//         chrome.storage.local.get("token", (data) => {
//             if (!data.token) return;

//             fetch(`https://oauth2.googleapis.com/revoke?token=${data.token}`)
//                 .then(() => {
//                     chrome.identity.removeCachedAuthToken({ token: data.token }, () => {
//                         chrome.storage.local.clear(() => {
//                             chrome.tabs.create({
//                                 url: chrome.runtime.getURL("login.html")
//                             });
//                         });
//                     });
//                 });
//         });
//     }
// });
