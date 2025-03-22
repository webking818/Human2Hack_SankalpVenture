function login() {
    let userType = document.getElementById("userType").value;
    window.location.href = "dashboard.html";
}

function register() {
    alert("🎉 Registration Successful! Please login.");
    window.location.href = "index.html";
}

// ✅ Function to Fetch & Display Tech News
function fetchTechNews() {
    let newsSection = document.getElementById("newsSection");
    newsSection.innerHTML = "<h2>📰 Loading Latest Tech News...</h2>";

    fetch("https://newsapi.org/v2/top-headlines?category=technology&apiKey=YOUR_NEWS_API_KEY")
        .then(response => response.json())
        .then(data => {
            newsSection.innerHTML = "<h2>📰 Latest Tech News</h2>";
            data.articles.forEach(article => {
                newsSection.innerHTML += `<p>🔹 <a href="${article.url}" target="_blank">${article.title}</a></p>`;
            });
        })
        .catch(error => {
            newsSection.innerHTML = "<h2>⚠️ Failed to load news</h2>";
            console.error("Error fetching news:", error);
        });
}

// ✅ Navigate to Webinars Page
function goToWebinars() {
    window.location.href = "webinar.html";
}

// ✅ Filter Webinars Based on Interest
// Function to filter webinars based on user interest
function filterWebinars() {
    let interest = document.getElementById("interest").value;
    let webinarList = document.getElementById("webinarList");

    // Example webinars (You can replace with dynamic API data)
    let webinars = {
        ai: [
            { title: "AI in Healthcare", speaker: "Dr. Smith", id: "webinar1" },
            { title: "Future of Machine Learning", speaker: "Prof. Adams", id: "webinar2" }
        ],
        webdev: [
            { title: "Modern Web Development", speaker: "Jane Doe", id: "webinar3" },
            { title: "Full Stack Roadmap", speaker: "John Doe", id: "webinar4" }
        ],
        health: [
            { title: "Healthcare Innovations", speaker: "Dr. Brown", id: "webinar5" },
            { title: "Mental Health & AI", speaker: "Dr. Green", id: "webinar6" }
        ]
    };

    // Display selected webinars
    webinarList.innerHTML = `<h3>Available Webinars</h3>`;
    webinars[interest].forEach(webinar => {
        webinarList.innerHTML += `
            <div class="webinar-card">
                <h4>${webinar.title}</h4>
                <p>🎤 Speaker: ${webinar.speaker}</p>
                <button onclick="joinWebinar('${webinar.title}', '${webinar.speaker}')">Join Webinar</button>
            </div>
        `;
    });
}

// Navigate to Live Webinar page
function joinWebinar(title, speaker) {
    localStorage.setItem("webinarTitle", title);
    localStorage.setItem("webinarSpeaker", speaker);
    window.location.href = "webinar_live.html";
}


// ✅ Live Chat Functionality for Webinars
function sendMessage() {
    let chatBox = document.getElementById("chatBox");
    let chatMessage = document.getElementById("chatMessage").value;
    
    if (chatMessage.trim() !== "") {
        chatBox.innerHTML += `<p>👤 You: ${chatMessage}</p>`;
        document.getElementById("chatMessage").value = "";
    }
}

// ✅ Live Chat for Webinar Live Page
function sendChat() {
    let chatBox = document.getElementById("chatBox");
    let chatInput = document.getElementById("chatInput").value;
    
    if (chatInput.trim() !== "") {
        chatBox.innerHTML += `<p>👤 You: ${chatInput}</p>`;
        document.getElementById("chatInput").value = "";
    }
}

// ✅ Connection Request Function
// ✅ Function to Redirect to Profiles Page
function goToProfiles() {
    window.location.href = "profiles.html";
}

// ✅ Function to Handle Connection Request
function connectUser(userName) {
    alert("🔗 Connection Request Sent to " + userName);
    let connectedUsers = JSON.parse(localStorage.getItem("connectedUsers")) || [];
    if (!connectedUsers.includes(userName)) {
        connectedUsers.push(userName);
    }
    localStorage.setItem("connectedUsers", JSON.stringify(connectedUsers));
    window.location.href = "search_profile.html";
}

// ✅ Function to Display Connected Users on search_profile.html
function showConnectedUsers() {
    let connectedUsers = JSON.parse(localStorage.getItem("connectedUsers")) || [];
    let profilesList = document.getElementById("profilesList");
    
    if (connectedUsers.length > 0) {
        profilesList.innerHTML = "<h3>✅ Connection Requests Sent</h3>";
        connectedUsers.forEach(user => {
            profilesList.innerHTML += `<p>👤 ${user} has received your request.</p>`;
        });
    } else {
        profilesList.innerHTML = "<p>🔍 No connections made yet.</p>";
    }
}

// Run showConnectedUsers when search_profile.html loads
if (window.location.pathname.includes("search_profile.html")) {
    window.onload = showConnectedUsers;
}

