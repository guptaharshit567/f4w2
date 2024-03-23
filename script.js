document.getElementById('login').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Invalid username or password');
    }
    return response.json();
  })
  .then(data => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('profilePage').style.display = 'block';
    loadProfile();
  })
  .catch(error => {
    alert(error.message);
  });
});

function loadProfile() {
  const id = localStorage.getItem('id');
  
  fetch(https://dummyjson.com/users/${id})
  .then(response => response.json())
  .then(data => {
    const profileInfo = document.getElementById('profileInfo');
    profileInfo.innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Website:</strong> ${data.website}</p>
      <p><strong>Address:</strong> ${data.address.street}, ${data.address.suite}, ${data.address.city}, ${data.address.zipcode}</p>
      <p><strong>Company:</strong> ${data.company.name}</p>
    `;
  })
  .catch(error => {
    console.error('Error fetching profile:', error);
  });
}

// Check if user is already logged in when the page loads
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (token) {
    // If token exists, clear it and reload the page to display the login form
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location.reload();
    }
  });
