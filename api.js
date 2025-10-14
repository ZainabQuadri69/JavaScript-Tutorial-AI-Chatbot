// scripts/api.js - SIMPLIFIED WORKING VERSION
class ChatAPI {
    constructor() {
        console.log('✅ ChatAPI loaded');
    }

    async sendMessage(message, conversationHistory = []) {
        console.log('📨 Received message:', message);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return this.generateJavaScriptResponse(message);
    }

    generateJavaScriptResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Greeting
        if (this.isGreeting(lowerMessage)) {
            return "👋 Hello! I'm your JavaScript Tutor. I can help you learn variables, functions, arrays, objects, promises, and much more! What would you like to learn about?";
        }

        // Variables
        if (lowerMessage.includes('variable') || lowerMessage.includes('let') || lowerMessage.includes('const')) {
            return `# JavaScript Variables\n\n**Three ways to declare variables:**\n\n\`\`\`javascript\n// const - cannot be reassigned\nconst name = "John";\n\n// let - can be reassigned  \nlet age = 25;\nage = 26; // This works!\n\n// var - avoid in modern code (function scoped)\nvar old = "don't use this";\n\`\`\`\n\n💡 **Best Practice**: Use \`const\` by default, \`let\` when you need to reassign.`;
        }

        // Functions
        if (lowerMessage.includes('function')) {
            return `# JavaScript Functions\n\n**Different ways to write functions:**\n\n\`\`\`javascript\n// Function declaration\nfunction greet(name) {\n    return "Hello " + name;\n}\n\n// Function expression\nconst greet = function(name) {\n    return "Hello " + name;\n};\n\n// Arrow function (ES6+)\nconst greet = (name) => "Hello " + name;\n\n// Calling functions\nconsole.log(greet("John")); // "Hello John"\n\`\`\``;
        }

        // Arrays
        if (lowerMessage.includes('array')) {
            return `# JavaScript Arrays\n\n**Common array methods:**\n\n\`\`\`javascript\nconst numbers = [1, 2, 3, 4, 5];\n\n// Transform each element\nconst doubled = numbers.map(x => x * 2); // [2, 4, 6, 8, 10]\n\n// Filter elements\nconst evens = numbers.filter(x => x % 2 === 0); // [2, 4]\n\n// Calculate sum\nconst sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15\n\n// Find element\nconst firstEven = numbers.find(x => x % 2 === 0); // 2\n\`\`\``;
        }

        // Help
        if (lowerMessage.includes('help')) {
            return `# How I Can Help You Learn JavaScript\n\nI can explain:\n\n📚 **Basics**: variables, functions, loops, conditionals\n🎯 **Core Concepts**: arrays, objects, ES6 features\n⏳ **Advanced**: promises, async/await, closures\n🌐 **Web**: DOM manipulation, events, APIs\n\n**Try asking:**\n• "Explain variables"\n• "How do functions work?"\n• "Show me array examples"\n• "What are promises?"\n• "JavaScript quiz"`;
        }

        // Quiz
        if (lowerMessage.includes('quiz')) {
            return `🎯 **JavaScript Quiz**\n\n**What will this code output?**\n\n\`\`\`javascript\nconsole.log(typeof []);\n\`\`\`\n\nA) array\nB) object  \nC) undefined\nD) null\n\n💡 Think about it, then ask me for the answer!`;
        }

        // Default response
        return `I'm your JavaScript Tutor! I can help you learn:\n\n• **Variables** (let, const, var)\n• **Functions** (declarations, expressions, arrow)\n• **Arrays** and array methods\n• **Objects** and object manipulation\n• **Promises** and async/await\n• **DOM** manipulation\n• And much more!\n\nTry asking: "explain variables" or "show me array examples"`;
    }

    isGreeting(message) {
        return message.includes('hello') ||
            message.includes('hi') ||
            message.includes('hey') ||
            message.includes('start');
    }
}