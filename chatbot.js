// scripts/chatbot.js
class Chatbot {
    constructor() {
        console.log('✅ Chatbot loaded');
        this.api = new ChatAPI();
        this.conversationHistory = [];
        this.isProcessing = false;
    }

    async sendMessage(userMessage) {
        console.log('🤖 Sending message to chatbot:', userMessage);

        if (this.isProcessing) {
            throw new Error('Already processing a message');
        }

        this.isProcessing = true;

        try {
            // Add user message to history
            this.addToHistory('user', userMessage);

            // Get AI response
            const botResponse = await this.api.sendMessage(userMessage, this.conversationHistory);
            console.log('🤖 Bot response:', botResponse);

            // Add bot response to history
            this.addToHistory('assistant', botResponse);

            return botResponse;
        } catch (error) {
            console.error('❌ Chatbot error:', error);
            return "Sorry, I encountered an error. Please try again.";
        } finally {
            this.isProcessing = false;
        }
    }

    addToHistory(role, content) {
        this.conversationHistory.push({
            role,
            content,
            timestamp: new Date()
        });

        // Keep only last 10 messages
        if (this.conversationHistory.length > 10) {
            this.conversationHistory = this.conversationHistory.slice(-10);
        }
    }

    clearHistory() {
        this.conversationHistory = [];
    }

    getHistory() {
        return this.conversationHistory;
    }
}