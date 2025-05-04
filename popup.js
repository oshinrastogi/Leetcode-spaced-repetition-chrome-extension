document.getElementById('saveEmail').addEventListener('click', () => {
    const email = document.getElementById('emailInput').value.trim();
    if (email) {
      chrome.storage.local.set({ userEmail: email }, () => {
        alert('Email saved successfully!');
      });
    } else {
      alert('Please enter a valid email.');
    }
  });
  