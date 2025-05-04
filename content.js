// content.js
// import toast from 'react-hot-toast';
// Function to add the button to the page

let lastProblemSlug = null;
let button = null;

function getProblemSlug() {
  const match = window.location.pathname.match(/problems\/([^\/]+)\//);
  return match ? match[1] : null;
}

function resetButton() {
  const currentSlug = getProblemSlug();
  if (!currentSlug) return;

  if (currentSlug !== lastProblemSlug) {
    lastProblemSlug = currentSlug;
    addButton();  // reset and add fresh button
  }
}

function addButton() {
    // Create the button element
    if(button) button.remove();
    button = document.createElement('button');
    button.innerHTML = 'Add to LeetRepeat';
    // button.style.position = 'fixed';
    button.style.top = '15px';
    button.style.right = '15px';
    button.style.zIndex = '1000';
    button.style.padding = '2px 4px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '3px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '10px';

    // Append button to the body
    const container = document.getElementsByClassName('text-title-large')[0];
    const anchor = container.querySelector('a');

    anchor.parentNode.insertBefore(button, anchor.nextSibling);


    button.addEventListener('click', () => {

        const problemTitle = anchor.textContent.trim();
        const problemURL = anchor.href;  
      
        chrome.storage.local.get('userEmail', (result) => {
          const email = result.userEmail || null;
          if (!email) {
            alert('Email not found. Please reinstall the extension.');
            return;
          }
          console.log(problemTitle);
          console.log(problemURL);
          console.log(email);
          fetch('http://localhost:8080/api/v1/problem/add-problem', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: problemTitle,
              url: problemURL,
              email: email,
              time: new Date().toISOString(),
            }),
          })
          // .then(response => response.json())
          .then(data => {
            if (!data.success) {
              button.textContent = '✔ Added';
              // button.style.cursor = 'default';
              button.disabled = true;
              button.style.backgroundColor = '#4CAF50';
            } else {
              button.textContent = 'failed! try again';
              button.style.backgroundColor='red';
            }
          })
          .catch(error => {
            button.textContent = 'failed!';
            button.style.backgroundColor='red';
          });
        });
      });
      
}

// const observer = new MutationObserver(() => {
//   addButton();
// });

// // Wait until the page has fully loaded
// window.addEventListener('load', () => {
//   const target = document.body;
//   observer.observe(target, { childList: true, subtree: true });
// });

// reset btn when new prblm is loaded


// Wait for the page to load completely before adding the button
// window.onload = addButton;
setInterval(resetButton, 1000);

//initial loader
window.addEventListener('load', () => {
  lastProblemSlug = getProblemSlug();
  addButton();
});
