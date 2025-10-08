document.addEventListener('DOMContentLoaded', function() {
const chatContainer = document.querySelector('.chat-container');
const authBox = document.querySelector('.auth-box');
const inviteCodeInput = document.getElementById('inviteCode');
const submitButton = document.getElementById('submitCode');
const errorMessage = document.getElementById('errorMessage');
const settingsButton = document.getElementById('settingsButton');
const settingsUI = document.getElementById('settingsUI');
const closeSettings = document.getElementById('closeSettings');
const userSettingsBtn = document.getElementById('userSettingsBtn');
const aiSettingsBtn = document.getElementById('aiSettingsBtn');
const userSettingsPage = document.getElementById('userSettingsPage');
const aiSettingsPage = document.getElementById('aiSettingsPage');
const apiKeyInput = document.getElementById('apiKeyInput');
const generateApiKeyLink = document.getElementById('generateApiKeyLink');
const speedToggle = document.getElementById('speedToggle');
const userNameInput = document.getElementById('userNameInput');
const themeSelect = document.getElementById('themeSelect');
const saveSettings = document.getElementById('saveSettings');
const chatArea = document.getElementById('chatArea');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

const correctInviteCode = 'prysmisfromowner$';
let currentSettingsPage = 'ai';
let userName = 'User';
let aiThinkingSpeed = true;

function validateInviteCode(code) {
return code === correctInviteCode;
}

function showError(message) {
errorMessage.textContent = message;
errorMessage.classList.add('show');
setTimeout(() => {
errorMessage.classList.remove('show');
}, 3000);
}

function showChatArea() {
authBox.style.opacity = '0';
authBox.style.transform = 'translateY(20px)';

setTimeout(() => {
authBox.style.display = 'none';
chatArea.style.display = 'block';
setTimeout(() => {
chatArea.style.opacity = '1';
chatArea.style.transform = 'translateY(0)';
addAIMessage("hello user! Press the '⚙️' and enter your Gemini api key to get started.");
}, 50);
}, 500);
}

function handleInviteSubmit() {
const enteredCode = inviteCodeInput.value.trim();

if (!enteredCode) {
showError('Please enter an invite code');
return;
}

if (validateInviteCode(enteredCode)) {
errorMessage.textContent = '';
errorMessage.classList.remove('show');
showChatArea();
} else {
showError('Invalid invite code. Please try again.');
}
}

function toggleSettings() {
if (settingsUI.classList.contains('active')) {
settingsUI.classList.remove('active');
} else {
settingsUI.classList.add('active');
}
}

function switchSettingsPage(page) {
if (page === 'user') {
userSettingsBtn.classList.add('active');
aiSettingsBtn.classList.remove('active');
userSettingsPage.classList.add('active');
aiSettingsPage.classList.remove('active');
currentSettingsPage = 'user';
} else {
aiSettingsBtn.classList.add('active');
userSettingsBtn.classList.remove('active');
aiSettingsPage.classList.add('active');
userSettingsPage.classList.remove('active');
currentSettingsPage = 'ai';
}
}

function saveUserSettings() {
userName = userNameInput.value.trim() || 'User';
const theme = themeSelect.value;

if (theme === 'light') {
document.body.classList.add('light-mode');
} else {
document.body.classList.remove('light-mode');
}

aiThinkingSpeed = speedToggle.checked;

showNotification('Settings saved successfully!');
toggleSettings();
}

function showNotification(message) {
const notification = document.createElement('div');
notification.className = 'notification';
notification.textContent = message;
document.body.appendChild(notification);

setTimeout(() => {
notification.classList.add('show');
}, 100);

setTimeout(() => {
notification.classList.remove('show');
setTimeout(() => {
document.body.removeChild(notification);
}, 300);
}, 3000);
}

function addAIMessage(text) {
const messageDiv = document.createElement('div');
messageDiv.className = 'message ai-message';

const thinkingDiv = document.createElement('div');
thinkingDiv.className = 'thinking-animation';
thinkingDiv.innerHTML = `
<div class="thinking-dot"></div>
<div class="thinking-dot"></div>
<div class="thinking-dot"></div>
<div class="thinking-pulse"></div>
`;

messageDiv.appendChild(thinkingDiv);
chatMessages.appendChild(messageDiv);
chatMessages.scrollTop = chatMessages.scrollHeight;

if (aiThinkingSpeed) {
setTimeout(() => {
thinkingDiv.remove();
messageDiv.innerHTML = formatMessage(text);
chatMessages.scrollTop = chatMessages.scrollHeight;
}, 2000);
} else {
thinkingDiv.remove();
messageDiv.innerHTML = formatMessage(text);
chatMessages.scrollTop = chatMessages.scrollHeight;
}
}

function addUserMessage(text) {
const messageDiv = document.createElement('div');
messageDiv.className = 'message user-message';
messageDiv.innerHTML = formatMessage(text);
chatMessages.appendChild(messageDiv);
chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatMessage(text) {
return text
.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
.replace(/\*(.*?)\*/g, '<em>$1</em>')
.replace(/\n/g, '<br>')
.replace(/^- (.*?)(?=\n|$)/gm, '• $1<br>')
.replace(/^\+ (.*?)(?=\n|$)/gm, '• $1<br>');
}

function sendMessage() {
const message = messageInput.value.trim();
if (message) {
addUserMessage(message);
messageInput.value = '';

setTimeout(() => {
const responses = [
"I'm Prysmis AI! How can I assist you today?",
"Hello! What would you like to know?",
"Ready to help! What's on your mind?",
"Hey there! How can I make your day better?"
];
const randomResponse = responses[Math.floor(Math.random() * responses.length)];
addAIMessage(randomResponse);
}, 1000);
}
}

inviteCodeInput.addEventListener('keypress', function(e) {
if (e.key === 'Enter') handleInviteSubmit();
});

submitButton.addEventListener('click', handleInviteSubmit);
settingsButton.addEventListener('click', toggleSettings);
closeSettings.addEventListener('click', toggleSettings);
userSettingsBtn.addEventListener('click', () => switchSettingsPage('user'));
aiSettingsBtn.addEventListener('click', () => switchSettingsPage('ai'));
generateApiKeyLink.addEventListener('click', () => {
window.open('https://aistudio.google.com/app/apikey', '_blank');
});
saveSettings.addEventListener('click', saveUserSettings);
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', function(e) {
if (e.key === 'Enter' && !e.shiftKey) {
e.preventDefault();
sendMessage();
}
});

messageInput.addEventListener('input', function() {
this.style.height = 'auto';
this.style.height = (this.scrollHeight) + 'px';
});

inviteCodeInput.focus();
});
