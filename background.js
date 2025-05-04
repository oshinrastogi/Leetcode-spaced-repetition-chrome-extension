// background.js

// chrome.runtime.onInstalled.addListener(() => {
//     console.log('LeetCode Spaced Repetition Tracker extension installed');
    
// });

chrome.runtime.onInstalled.addListener(() => {
    console.log('LeetCode Spaced Repetition Tracker extension installed');
    // chrome.storage.local.get('userEmail', (result) => {
    //   if (!result.userEmail) {
    //     const email = prompt("Hey, Please enter your email to enable daily reminder notifications: ");
    //     if (email) {
    //       chrome.storage.local.set({ userEmail: email });
    //     }
    //   }
    // });
  });
  