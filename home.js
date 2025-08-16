function addButton() {
    // Create the button element
    // if(button) button.remove();
    button = document.createElement('button');
    button.innerHTML = 'Let\'s revise';
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

    setTimeout(()=>{
        const nav = document.getElementsByClassName('relative m-0 flex h-full grow items-center gap-6 self-end p-0 ')[0];
        nav.appendChild(button);
    },3000)

    button.addEventListener('click', () => {

        
        if (!chrome || !chrome.storage || !chrome.runtime?.id) {
        alert('Extension context expired. Please refresh the page and try again .');
        button.textContent = 'Add to LeetRepeat';
        return;
        }

        chrome.storage.local.get('userEmail', (result) => {
          const email = result.userEmail || null;
          if (!email) {
            alert('Email not found. Please click on the extension and enter your mail-id.');
            return;
          }
          console.log(email);

          button.textContent = 'Fetching...';

          fetch('https://leetrepeat-api.onrender.com/api/v1/email/send-email', { 
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          // .then(response => response.json())
          .then(data => {
            if (!data.success) {
              button.textContent = '✔ Done';
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


window.addEventListener('load', () => {
  addButton();
});