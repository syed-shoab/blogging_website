const API = "http://localhost:5000";

document.getElementById("register-btn").addEventListener("click", register);
document.getElementById("login-btn").addEventListener("click", login);
document.getElementById("search").addEventListener("input", searchPosts);

async function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  alert(data.message);

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("app-container").style.display = "block";
    document.getElementById("logged-in-user").innerText = username;
  
    loadPosts();
  } else {
    alert(data.message);
  }

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}


function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");

  document.getElementById("auth-section").style.display = "flex";
  document.getElementById("app-container").style.display = "none";
  document.getElementById("posts").innerHTML = "";
}

async function createPost() {
  const content = document.getElementById("new-post").value;
  const token = localStorage.getItem("token");

  await fetch(`${API}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ content }),
  });

  document.getElementById("new-post").value = "";
  loadPosts();
}

async function loadPosts() {
  const res = await fetch(`${API}/posts`);
  const posts = await res.json();

  const container = document.getElementById("posts");
  container.innerHTML = "";
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <p><strong>${post.author}</strong>: ${post.content}</p>
      ${post.comments?.map(c => `<p style="margin-left:20px;"><em>${c.user}</em>: ${c.text}</p>`).join("") || ""}
      <input type="text" placeholder="Add comment..." id="comment-${post._id}">
      <button onclick="addComment('${post._id}')">Comment</button>
    `;
    container.appendChild(div);
  });
}

async function addComment(postId) {
  const commentInput = document.getElementById(`comment-${postId}`);
  const text = commentInput.value;
  const token = localStorage.getItem("token");

  await fetch(`${API}/posts/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ text }),
  });

  commentInput.value = "";
  loadPosts();
}

async function searchPosts() {
  const query = document.getElementById("search").value;
  const res = await fetch(`${API}/posts?q=${query}`);
  const posts = await res.json();

  const container = document.getElementById("posts");
  container.innerHTML = "";
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <p><strong>${post.author}</strong>: ${post.content}</p>
      ${post.comments?.map(c => `<p style="margin-left:20px;"><em>${c.user}</em>: ${c.text}</p>`).join("") || ""}
      <input type="text" placeholder="Add comment..." id="comment-${post._id}">
      <button onclick="addComment('${post._id}')">Comment</button>
    `;
    container.appendChild(div);
  });
}
