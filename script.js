document.addEventListener('DOMContentLoaded', () => {
    const inviteOverlay = document.getElementById('invite-overlay');
    const inviteCodeInput = document.getElementById('inviteCodeInput');
    const userInput = document.getElementById('userInput');
    const commandSuggestions = document.querySelector('.command-suggestions');
    const settingsIcon = document.querySelector('.settings-icon');
    const settingsOverlay = document.querySelector('.settings-ui-overlay');
    const saveSettingsBtn = document.querySelector('.save-settings-btn');
    const settingsTabs = document.querySelectorAll('.settings-tab');
    const settingsPages = document.querySelectorAll('.settings-page');

    const inviteCode = "prysmisfromowner$";
    let commandActive = false;

    inviteCodeInput.focus();

    inviteCodeInput.addEventListener('input', () => {
        if (inviteCodeInput.value === inviteCode) {
            inviteOverlay.classList.remove('visible');
        }
    });


    userInput.addEventListener('input', () => {
        if (userInput.value === '/') {
            commandSuggestions.classList.add('visible');
        } else if (!userInput.value.startsWith('/')) {
            commandSuggestions.classList.remove('visible');
            commandActive = false;
            userInput.style.color = '#e0e0e0';
        }

        if (commandActive && !userInput.value.startsWith('/')) {
             commandActive = false;
             userInput.style.color = '#e0e0e0';
        }
    });

    document.querySelectorAll('.command').forEach(command => {
        command.addEventListener('click', () => {
            const commandText = command.getAttribute('data-command');
            userInput.value = commandText;
            userInput.style.color = '#a38cff';
            commandSuggestions.classList.remove('visible');
            commandActive = true;
            userInput.focus();
        });
    });

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && commandActive) {
            e.preventDefault();
            const command = userInput.value;

            if (command === '/clear') {
                document.querySelector('.chat-area').innerHTML = '';
            }
            userInput.value = '';
            userInput.style.color = '#e0e0e0';
            commandActive = false;
        }
    });

    settingsIcon.addEventListener('click', () => {
        settingsOverlay.classList.add('visible');
    });

    settingsOverlay.addEventListener('click', (e) => {
        if (e.target === settingsOverlay) {
            settingsOverlay.classList.remove('visible');
        }
    });

    settingsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            settingsTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetPageId = tab.getAttribute('data-tab');
            settingsPages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPageId) {
                    page.classList.add('active');
                }
            });
        });
    });

    const settingsElements = document.querySelectorAll('.settings-content input, .settings-content select');
    settingsElements.forEach(el => {
        el.addEventListener('change', () => {
            saveSettingsBtn.style.backgroundColor = '#4CAF50';
            saveSettingsBtn.style.color = 'white';
        });
    });

    saveSettingsBtn.addEventListener('click', () => {
        settingsOverlay.classList.remove('visible');
        setTimeout(() => {
            saveSettingsBtn.style.backgroundColor = '#ffffff';
            saveSettingsBtn.style.color = '#121212';
        }, 300);
    });

});
