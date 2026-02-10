import React, { useEffect, useState } from 'react';
import './App.css'
import Logging from "./components/Logging/Logging"
import Dashboard from "./components/Dashboard/Dashboard"

function App() {
  const [currentPage, setCurrentPage] = useState('loading'); // 'loading', 'login', 'dashboard'
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');


  //  Check if user is logged in when app opens

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    // Look in Chrome storage for saved token and email
    chrome.storage.local.get(['token', 'email', 'name', 'expiresAt'], (result) => {
      console.log(' Checking storage:', result);

      const now = Date.now();

      // Check if we have a token AND it hasn't expired
      if (result.token && result.expiresAt && now < result.expiresAt) {
        // User is logged in!
        console.log('User is logged in!');
        setUserEmail(result.email);
        setUserName(result.name || result.email);
        setCurrentPage('dashboard');
      } else {
        //  No token or token expired
        console.log('User is NOT logged in');
        setCurrentPage('login');
      }
    });
  };
  // STEP 2: Handle Google Login
  // ============================================
  const handleGoogleLogin = () => {
    console.log('🔐 Google login button clicked!');

    // ⚠️ REPLACE THIS WITH YOUR ACTUAL CLIENT ID!
    const YOUR_CLIENT_ID = '999017704603-vffg1d8gnf994o4hmq3muoaac1b9t0h8.apps.googleusercontent.com';

    // Get the Chrome extension redirect URL
    const redirectUri = chrome.identity.getRedirectURL('oauth2');
    console.log('📍 Redirect URI:', redirectUri);

    // What permissions we want
    const scope = 'email profile';

    // Build the Google OAuth URL
    const authUrl =
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      'client_id=' + YOUR_CLIENT_ID +
      '&response_type=token' +
      '&redirect_uri=' + encodeURIComponent(redirectUri) +
      '&scope=' + encodeURIComponent(scope);

    console.log('🌐 Opening Google login popup...');

    // Open Google login popup
    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true  // Show the login window to user
      },
      (redirectUrl) => {
        // Check for errors
        if (chrome.runtime.lastError) {
          console.error('❌ Error:', chrome.runtime.lastError);
          alert('Login failed: ' + chrome.runtime.lastError.message);
          return;
        }

        if (!redirectUrl) {
          console.error('❌ No redirect URL');
          alert('Login failed: No response from Google');
          return;
        }

        console.log('✅ Google login successful!');
        console.log('🔗 Redirect URL:', redirectUrl);

        // Extract the token from the URL
        // URL looks like: https://...#access_token=abc123&expires_in=3600
        const urlParts = redirectUrl.split('#')[1];  // Get part after #
        const params = new URLSearchParams(urlParts);

        const token = params.get('access_token');
        const expiresIn = parseInt(params.get('expires_in'));

        if (!token) {
          console.error('❌ No token in URL');
          alert('Login failed: No token received');
          return;
        }

        console.log('🎫 Token received:', token.substring(0, 20) + '...');
        console.log('⏰ Expires in:', expiresIn, 'seconds');

        // Get user info from Google using the token
        getUserInfo(token, expiresIn);
      }
    );
  };

  // ============================================
  // STEP 3: Get user information from Google
  // ============================================
  const getUserInfo = (token, expiresIn) => {
    console.log('👤 Getting user info from Google...');

    fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to get user info');
        }
        return response.json();
      })
      .then(userInfo => {
        console.log('✅ User info received:', userInfo);

        // Calculate when token expires
        const expiresAt = Date.now() + (expiresIn * 1000);

        // Save everything to Chrome storage
        chrome.storage.local.set(
          {
            token: token,
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
            expiresAt: expiresAt
          },
          () => {
            if (chrome.runtime.lastError) {
              console.error('❌ Error saving:', chrome.runtime.lastError);
              alert('Error saving login');
              return;
            }

            console.log('💾 Everything saved to storage!');
            console.log('⏰ Token will expire at:', new Date(expiresAt));

            // Update React state
            setUserEmail(userInfo.email);
            setUserName(userInfo.name);
            setCurrentPage('dashboard');
          }
        );
      })
      .catch(error => {
        console.error('❌ Error getting user info:', error);
        alert('Error getting user info: ' + error.message);
      });
  };

  // ============================================
  // STEP 4: Handle Logout
  // ============================================
  const handleLogout = () => {
    console.log('👋 Logging out...');

    // Clear everything from Chrome storage
    chrome.storage.local.clear(() => {
      console.log('✅ Storage cleared!');
      setUserEmail('');
      setUserName('');
      setCurrentPage('login');
    });
  };

  return (
    <div className="App">
      {currentPage === 'loading' && <Logging />}

      {currentPage === 'login' && (
        <Logging onGoogleLogin={handleGoogleLogin} />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard
          userEmail={userEmail}
          userName={userName}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App
