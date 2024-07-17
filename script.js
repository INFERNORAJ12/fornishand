document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const message = inputField.value.trim();
    
    if (message === "") return;

    addMessageToChat(message, 'user');
    inputField.value = "";

    const apiKey = 'asst_SEJu4yk56BawBAFN3B0CaeHk'; // Replace with your actual OpenAI API key
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: message,
                max_tokens: 150,
                stop: ['\n', '<|endoftext|>']
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response from ChatGPT API');
        }

        const responseData = await response.json();
        const aiMessage = responseData.choices[0].text.trim();
        addMessageToChat(aiMessage, 'ai');

    } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
        addMessageToChat('Sorry, something went wrong. Please try again later.', 'ai');
    }
}

function addMessageToChat(message, sender) {
    const chatWindow = document.getElementById('chat-window');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
