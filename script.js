const userDataContainer = document.getElementById('userData');
const errorContainer = document.getElementById('error');
const reloadBtn = document.getElementById('reloadBtn');
const searchInput = document.getElementById('searchInput');
const loader = document.getElementById('loader');
const toggleThemeBtn = document.getElementById('toggleTheme');

let allUsers = [];

// Fetch user data
async function fetchUserData() {
  userDataContainer.innerHTML = '';
  errorContainer.textContent = '';
  loader.style.display = 'block';

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const users = await res.json();
    allUsers = users;
    displayUsers(users);
  } catch (err) {
    errorContainer.innerHTML = `
      <p>Failed to load user data. ${err.message}</p>
      <button onclick="fetchUserData()">Try Again</button>
    `;
  } finally {
    loader.style.display = 'none';
  }
}

// Display users
function displayUsers(users) {
  userDataContainer.innerHTML = '';

  if (users.length === 0) {
    userDataContainer.innerHTML = '<p>No users match your search.</p>';
    return;
  }

  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
      <p><strong>Address:</strong> ${user.address.suite}, ${user.address.street}, ${user.address.city} - ${user.address.zipcode}</p>
    `;
    userDataContainer.appendChild(card);
  });
}

// Filter users by name
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allUsers.filter(user => user.name.toLowerCase().includes(searchTerm));
  displayUsers(filtered);
});

// Reload data
reloadBtn.addEventListener('click', fetchUserData);

// Dark mode toggle
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Initial fetch
fetchUserData();
