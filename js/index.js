
//var t= config.API_URL;
//const API_URL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
    const resp = await fetch(config.API_URL + username);
    const respData = await resp.json();
    createUserCard(respData);
    //getRepos(username);
}

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }

function createUserCard(user) {
  const cardHTML = `
      <div class="card" id="header">
          <div>
              <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
          </div>
          <div class="user-info">
            
              <h2>Name: ${user.name}</h2>
              <a href="${user.html_url}"><i class="fa fa-github"></i></a>
              <p>Bio: ${user.bio}</p>
              <ul class="info">
                  <li><strong>Followers :</strong>${user.followers}</li>
                  <li><strong>Following :</strong>${user.following}</li>
                  <li><strong>Repos :</strong>${user.public_repos}</li>
                  <li><strong>Twitter :</strong> ${user.twitter_username}</li>
                  <li><strong>Location :</strong>${user.location}</li>
              </ul>
              <!--<div id="repos"></div>-->
          </div>
      </div>
  `;

  main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
      getUser(user);
      search.value = "";
  }
});