
//var t= config.API_URL;
//const API_URL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
async function getUser(username) {
    const resp = await fetch(config.API_URL + username);
    const respData = await resp.json();
    createUserCard(respData,username);
    
}
function createUserCard(user,username) {
    const cardHTML = `
        <div class="card" id="header">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2><b>${user.name}</b></h2>
                <h4>${user.bio}</h4>
                <ul class="repoinfo">
                    <li><b>${user.followers}</b> followers </li>
                    <li><b>${user.following}</b> following </li>
                    <li><b>${user.public_repos}</b> repository</li>
                </ul>
                <a href="${user.html_url}"><i class="fa fa-github fa-2x"></i></a>
                <div id="repo-container"></div>
            </div>
        </div>
    `;
  
    main.innerHTML = cardHTML;
    const repoContainer = document.getElementById('repo-container');
    getRepo(username,repoContainer);
}
  

async function getRepo(username,repoContainer) {
    const resp = await fetch(config.API_URL + username + '/repos');
    const respData = await resp.json();

    if (Array.isArray(respData)) {
        // Take only the top 5 repositories
        
        const top5Repos = respData
            // .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .filter(repo => !repo.fork)
            .slice(0, 10);

        console.log(top5Repos);

        top5Repos.forEach(repo => {
            const repoButton = createRepoButton(repo);
            repoContainer.appendChild(repoButton);
        });
    } else {
        console.error('Invalid response format:', respData);
    }
}

function createRepoButton(repo) {
    console.log('function creater')
    const button = document.createElement('button');
  button.textContent = repo.name;
  button.classList.add('repo-pill');
  button.addEventListener('click', () => {
    // Handle button click, e.g., open the repo
    window.open(repo.html_url, '_blank');
  });
  return button;
}

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }




form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
      getUser(user);
      search.value = "";
  }
});