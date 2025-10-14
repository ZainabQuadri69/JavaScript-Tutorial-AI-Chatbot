// scripts/app.js
class ChatApp {
    constructor() {
        console.log('🚀 Starting ChatApp...');
        this.initializeElements();
        this.setupEventListeners();
        this.addWelcomeMessage();
        console.log('✅ ChatApp started successfully');
    }

    initializeElements() {
        console.log('🔧 Initializing elements...');
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.clearChatButton = document.getElementById('clearChat');
        this.toggleThemeButton = document.getElementById('toggleTheme');

        console.log('✅ Elements initialized:', {
            chatMessages: !!this.chatMessages,
            userInput: !!this.userInput,
            sendButton: !!this.sendButton,
            clearChatButton: !!this.clearChatButton,
            toggleThemeButton: !!this.toggleThemeButton
        });
    }

    setupEventListeners() {
        console.log('🔧 Setting up event listeners...');

        // Send button click
        this.sendButton.addEventListener('click', () => {
            console.log('🖱️ Send button clicked');
            this.handleSendMessage();
        });

        // Enter key press
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                console.log('⌨️ Enter key pressed');
                this.handleSendMessage();
            }
        });

        // Textarea auto-resize
        this.userInput.addEventListener('input', () => this.autoResize());

        // Clear chat button
        this.clearChatButton.addEventListener('click', () => {
            console.log('🖱️ Clear chat button clicked');
            this.clearChat();
        });

        // Theme toggle button
        this.toggleThemeButton.addEventListener('click', () => {
            console.log('🖱️ Theme toggle button clicked');
            this.toggleTheme();
        });

        console.log('✅ Event listeners set up');
    }

    autoResize() {
        this.userInput.style.height = 'auto';
        this.userInput.style.height = Math.min(this.userInput.scrollHeight, 200) + 'px';
    }

    async handleSendMessage() {
        const message = this.userInput.value.trim();
        console.log('📤 Handling message:', message);

        if (!message) {
            console.log('⚠️ Empty message, ignoring');
            return;
        }

        // Disable send button during processing
        this.sendButton.disabled = true;
        this.userInput.value = '';
        this.userInput.style.height = 'auto';

        // Add user message to UI
        this.addMessageToUI('user', message);

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Initialize chatbot and get response
            const chatbot = new Chatbot();
            const response = await chatbot.sendMessage(message);

            // Remove typing indicator and add bot response
            this.removeTypingIndicator();
            this.addMessageToUI('assistant', response);

        } catch (error) {
            console.error('❌ Error in handleSendMessage:', error);
            this.removeTypingIndicator();
            this.addMessageToUI('assistant', 'Sorry, I encountered an error. Please try again.');
        } finally {
            // Re-enable send button
            this.sendButton.disabled = false;
            this.userInput.focus();
        }
    }

    addMessageToUI(sender, content) {
        console.log('💬 Adding message to UI:', { sender, content: content.substring(0, 50) + '...' });

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.innerHTML = `
            <div class="message-content">${this.formatMessage(content)}</div>
            <div class="message-time">${time}</div>
        `;

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatMessage(content) {
        // Convert code blocks
        let formatted = this.escapeHtml(content);
        formatted = formatted.replace(/```javascript\n?([\s\S]*?)```/g, '<pre><code class="javascript">$1</code></pre>');
        formatted = formatted.replace(/```js\n?([\s\S]*?)```/g, '<pre><code class="javascript">$1</code></pre>');
        formatted = formatted.replace(/```\n?([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

        // Handle inline code
        formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Handle bold text
        formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        // Handle line breaks
        formatted = formatted.replace(/\n/g, '<br>');

        return formatted;
    }

    showTypingIndicator() {
        console.log('⏳ Showing typing indicator');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        console.log('❌ Removing typing indicator');
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    addWelcomeMessage() {
        console.log('👋 Adding welcome message');
        const welcomeMessage = "👋 **Hello! I'm your JavaScript Tutor.**\n\nI can help you learn:\n• **Variables** (let, const, var)\n• **Functions** and arrow functions\n• **Arrays** and array methods\n• **Objects** and destructuring\n• **Promises** and async/await\n• And much more!\n\n**Try asking:**\n• \"Explain variables\"\n• \"How do functions work?\"\n• \"Show me array examples\"\n• \"JavaScript quiz\"";
        this.addMessageToUI('assistant', welcomeMessage);
    }

    clearChat() {
        console.log('🗑️ Clearing chat');
        if (confirm('Are you sure you want to clear the conversation?')) {
            this.chatMessages.innerHTML = '';
            this.addWelcomeMessage();
        }
    }

    toggleTheme() {
        console.log('🎨 Toggling theme');
        document.body.classList.toggle('dark-mode');
        this.toggleThemeButton.textContent =
            document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Add CSS for styling
const style = document.createElement('style');
style.textContent = `
    .typing-dots {
        display: flex;
        gap: 0.25rem;
        align-items: center;
    }
    
    .typing-dots span {
        width: 0.5rem;
        height: 0.5rem;
        background: #9ca3af;
        border-radius: 50%;
        animation: typing-bounce 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typing-bounce {
        0%, 80%, 100% { 
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% { 
            transform: scale(1);
            opacity: 1;
        }
    }
    
    pre {
        background: #f8f8f8;
        border: 1px solid #e1e1e1;
        border-radius: 6px;
        padding: 1rem;
        margin: 0.5rem 0;
        overflow-x: auto;
        font-family: monospace;
        font-size: 0.9rem;
    }
    
    .dark-mode pre {
        background: #2d3748;
        border-color: #4a5568;
    }
    
    code {
        background: #f1f3f4;
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
        font-family: monospace;
        font-size: 0.85rem;
    }
    
    .dark-mode code {
        background: #4a5568;
    }
`;
document.head.appendChild(style);

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded, initializing app...');
    window.chatApp = new ChatApp();
    console.log('🎉 App initialized and ready!');
});