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
const cloakButton = document.getElementById('cloakButton');
const saveSettings = document.getElementById('saveSettings');
const chatArea = document.getElementById('chatArea');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

const correctInviteCode = 'prysmisfromowner$';
let currentSettingsPage = 'ai';
let userName = 'User';
let aiThinkingSpeed = true;
let geminiApiKey = '';

const commands = {
'/help': 'Show all available commands',
'/clear': 'Clear chat history',
'/theme': 'Toggle between dark/light mode',
'/name': 'Change your display name',
'/code': 'Get coding assistance',
'/math': 'Get math homework help',
'/research': 'Research assistance'
};

function validateInviteCode(code) {
return code === correctInviteCode;
}

function showError(message) {
errorMessage.textContent = message;
errorMessage.classList.add('show');
setTimeout(() => {
errorMessage.classList.remove('show');
}, 4000);
}

function showChatArea() {
authBox.style.opacity = '0';
authBox.style.transform = 'translateY(20px)';

setTimeout(() => {
authBox.style.display = 'none';
chatArea.style.display = 'block';
setTimeout(() => {
chatArea.classList.add('active');
addAIMessage("Hello! I'm Prysmis AI, your advanced assistant. Type `/help` to see available commands or ask me anything! 🚀");
}, 300);
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

function cloakWebsite() {
const currentUrl = window.location.href;
if (currentUrl === 'about:blank') return "Already in an invisible tab.";

const newWindow = window.open('about:blank', '_blank');
if (!newWindow) {
showNotification("Could not open new tab. Please disable your pop-up blocker.", "error");
return;
}

const customHTML = `<!DOCTYPE html><html><head><title>Google</title><link rel="icon" type="image/x-icon" href="https://www.google.com/favicon.ico"><style>body, html { margin: 0; padding: 0; overflow: hidden; height: 100%; width: 100%; background-color: #000; } iframe { width: 100%; height: 100%; border: none; }</style></head><body><iframe src="about:blank"></iframe></body></html>`;

newWindow.document.write(customHTML);
newWindow.document.close();
window.location.replace("about:blank");

showNotification("Website cloaked successfully! Current tab is now invisible.", "success");
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
geminiApiKey = apiKeyInput.value.trim();

showNotification('Settings saved successfully!', 'success');
toggleSettings();
}

function showNotification(message, type = 'success') {
const notification = document.createElement('div');
notification.className = `notification ${type}`;
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
}, 4000);
}

function addAIMessage(text) {
const messageDiv = document.createElement('div');
messageDiv.className = 'message ai-message';

const thinkingDiv = document.createElement('div');
thinkingDiv.className = 'thinking-animation';
thinkingDiv.innerHTML = `
<div class="thinking-glow"></div>
<div class="thinking-dots">
<div class="thinking-dot"></div>
<div class="thinking-dot"></div>
<div class="thinking-dot"></div>
<div class="thinking-dot"></div>
</div>
`;

messageDiv.appendChild(thinkingDiv);
chatMessages.appendChild(messageDiv);
chatMessages.scrollTop = chatMessages.scrollHeight;

const displayText = aiThinkingSpeed ?
setTimeout(() => showFinalMessage(text, messageDiv), 2000 + Math.random() * 1000) :
showFinalMessage(text, messageDiv);
}

function showFinalMessage(text, messageDiv) {
const messageContent = document.createElement('div');
messageContent.className = 'message-content';
messageContent.innerHTML = formatMessage(text);

const copyBtn = document.createElement('button');
copyBtn.className = 'copy-btn';
copyBtn.innerHTML = '📋';
copyBtn.title = 'Copy message';
copyBtn.onclick = () => copyToClipboard(text);

messageDiv.innerHTML = '';
messageDiv.appendChild(messageContent);
messageDiv.appendChild(copyBtn);

chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addUserMessage(text) {
const messageDiv = document.createElement('div');
messageDiv.className = 'message user-message';

const messageContent = document.createElement('div');
messageContent.className = 'message-content';
messageContent.innerHTML = formatMessage(text);

const copyBtn = document.createElement('button');
copyBtn.className = 'copy-btn';
copyBtn.innerHTML = '📋';
copyBtn.title = 'Copy message';
copyBtn.onclick = () => copyToClipboard(text);

messageDiv.appendChild(messageContent);
messageDiv.appendChild(copyBtn);
chatMessages.appendChild(messageDiv);
chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatMessage(text) {
return text
.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
.replace(/\*(.*?)\*/g, '<em>$1</em>')
.replace(/_(.*?)_/g, '<em>$1</em>')
.replace(/`(.*?)`/g, '<code>$1</code>')
.replace(/\n/g, '<br>')
.replace(/^- (.*?)(?=\n|$)/gm, '• $1<br>')
.replace(/^\+ (.*?)(?=\n|$)/gm, '• $1<br>');
}

function copyToClipboard(text) {
navigator.clipboard.writeText(text).then(() => {
showNotification('Message copied to clipboard!', 'success');
}).catch(() => {
showNotification('Failed to copy message', 'error');
});
}

function handleCommand(command) {
switch(command) {
case '/help':
showCommandHelp();
break;
case '/clear':
chatMessages.innerHTML = '';
addAIMessage("Chat history cleared! How can I help you?");
break;
case '/theme':
const currentTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
themeSelect.value = currentTheme;
saveUserSettings();
break;
case '/name':
addAIMessage("Use the settings (⚙️) to change your display name!");
break;
case '/code':
addAIMessage("I'd be happy to help with coding! Please specify:\n• Programming language\n• What you're trying to achieve\n• Any specific requirements or errors");
break;
case '/math':
addAIMessage("Ready for math assistance! Please provide:\n• The specific problem or equation\n• What you've tried so far\n• Any concepts you're struggling with");
break;
case '/research':
addAIMessage("I can help with research! Please specify:\n• Topic or subject\n• Specific questions\n• Required depth or sources");
break;
default:
addAIMessage(`Unknown command: ${command}. Type /help for available commands.`);
}
}

function showCommandHelp() {
let helpText = "**Available Commands:**\n\n";
Object.entries(commands).forEach(([cmd, desc]) => {
helpText += `**${cmd}** - ${desc}\n`;
});
helpText += "\n**Formatting:**\n• **bold** for bold text\n• *italic* or _italic_ for italic\n• `code` for inline code\n• - or + for lists";

addAIMessage(helpText);
}

function sendMessage() {
const message = messageInput.value.trim();
if (!message) return;

if (message.startsWith('/')) {
handleCommand(message.split(' ')[0]);
} else {
addUserMessage(message);

setTimeout(() => {
const enhancedResponse = generateAIResponse(message);
addAIMessage(enhancedResponse);
}, 1000);
}

messageInput.value = '';
messageInput.style.height = 'auto';
}

function generateAIResponse(userMessage) {
const lowerMessage = userMessage.toLowerCase();

if (lowerMessage.includes('homework') || lowerMessage.includes('math') || lowerMessage.includes('calculate')) {
return `**Math/Homework Assistance** 🧮\n\nI can help you with that! For accurate calculations and step-by-step solutions, please provide:\n\n• The specific problem or equation\n• What you've tried so far\n• Any formulas or methods you're using\n\n*Pro tip: Use exact numbers and specify if you need conceptual explanation or just the answer.*`;
}

if (lowerMessage.includes('code') || lowerMessage.includes('programming') || lowerMessage.includes('function')) {
return `**Coding Assistance** 💻\n\nI'd be happy to help with coding! To provide the best assistance:\n\n• Specify the programming language\n• Describe what you're trying to achieve\n• Include any error messages or requirements\n• Let me know if you need best practices or just a solution\n\n*Example: "How do I create a React component that fetches data from an API?"*`;
}

if (lowerMessage.includes('research') || lowerMessage.includes('study') || lowerMessage.includes('learn')) {
return `**Research Assistance** 📚\n\nI can help with research and learning! Please provide:\n\n• The specific topic or subject\n• Your current understanding level\n• What you need to achieve (essay, presentation, understanding)\n• Any specific sources or perspectives needed\n\n*I can provide detailed explanations, summaries, and learning resources.*`;
}

const responses = [
"I understand! Could you provide more details so I can give you the most accurate assistance?",
"That's interesting! Let me help you with that. What specific aspect would you like me to focus on?",
"Great question! I'd be happy to dive deeper into this topic with you.",
"I appreciate you sharing that! Here's my perspective on this matter...",
"Fascinating! Let me provide some insights that might help clarify this for you."
];

return responses[Math.floor(Math.random() * responses.length)];
}

inviteCodeInput.addEventListener('keypress', function(e) {
if (e.key === 'Enter') handleInviteSubmit();
});

submitButton.addEventListener('click', handleInviteSubmit);
settingsButton.addEventListener('click', toggleSettings);
closeSettings.addEventListener('click', toggleSettings);
userSettingsBtn.addEventListener('click', () => switchSettingsPage('user'));
aiSettingsBtn.addEventListener('click', () => switchSettingsPage('ai'));
generateApiKeyLink.addEventListener('click', (e) => {
e.preventDefault();
window.open('https://aistudio.google.com/app/apikey', '_blank');
});
cloakButton.addEventListener('click', cloakWebsite);
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
this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

inviteCodeInput.focus();

if (typeof module !== 'undefined' && module.exports) {
module.exports = { validateInviteCode, cloakWebsite };
}
});
