document.addEventListener("DOMContentLoaded", function() {
  // Classe responsável pelas respostas do Bot
  class ChatBot {
    constructor() {
      this.database = {
        "oi": "Oi! Como posso te ajudar?",
        "olá": "Olá! Tudo bem?",
        "tudo bem?": "Sim, e com você?",
        "qual seu nome?": "Sou um bot de conversa super complexo!",
        "que dia é hoje?": () => {
          const now = new Date();
          return `Hoje é ${now.toLocaleDateString()}.`;
        },
        "quantos anos você tem?": "Sou um bot, não tenho idade!",
        "quem te criou?": "Fui criado pelo ChatGPT, mas estou aqui para te ajudar!",
        "o que você pode fazer?": "Posso responder perguntas simples e conversar com você!",
      };

      this.fallbackResponses = [
        "Hmmm, não tenho certeza disso.",
        "Interessante... Pode explicar melhor?",
        "Ainda estou aprendendo! Pode perguntar de outro jeito?",
        "Não entendi muito bem, mas posso tentar ajudar!"
      ];
    }

    // Método que retorna a resposta do bot com base na mensagem do usuário
    getResponse(userMessage) {
      let message = userMessage.toLowerCase().trim();
      if (this.database[message]) {
        if (typeof this.database[message] === "function") {
          return this.database[message]();
        }
        return this.database[message];
      }
      // Busca por padrões usando regex para respostas mais dinâmicas
      if (/(como|estou)\b.*\b(você|vc)/.test(message)) {
        return "Estou ótimo, obrigado por perguntar!";
      }
      // Caso não haja correspondência, retorna uma resposta genérica
      return this.fallbackResponses[Math.floor(Math.random() * this.fallbackResponses.length)];
    }
  }

  // Classe que gerencia a interface do Chat
  class ChatUI {
    constructor() {
      this.chatContainer = document.getElementById("chatContainer");
      this.chatMessages = document.getElementById("chatMessages");
      this.toggleChat = document.getElementById("menuChat");
      this.sendBtn = document.getElementById("sendBtn");
      this.input = document.getElementById("messageInput");
      this.closeChatBtn = document.getElementById("closeChatBtn");
      this.chatHeader = document.getElementById("chatHeader");
      this.contacts = document.querySelectorAll(".contact");
      this.searchInput = document.getElementById("searchInputChat");
      this.chatHistory = []; // Armazena o histórico de mensagens
      this.bot = new ChatBot();
      this.initialize();
    }

    initialize() {
      this.setupEventListeners();
      this.setupContacts();
      this.setupSearch();
    }

    setupEventListeners() {
      // Exibe ou oculta o chat
      this.toggleChat.addEventListener("click", event => {
        event.preventDefault();
        this.chatContainer.classList.toggle("active");
      });

      // Fecha o chat
      this.closeChatBtn.addEventListener("click", () => {
        this.chatContainer.classList.remove("active");
      });

      // Envia mensagem ao clicar no botão
      this.sendBtn.addEventListener("click", () => this.handleSendMessage());

      // Envia mensagem ao pressionar Enter
      this.input.addEventListener("keypress", event => {
        if (event.key === "Enter") {
          this.handleSendMessage();
        }
      });
    }

    setupContacts() {
      this.contacts.forEach(contact => {
        contact.addEventListener("click", () => {
          this.contacts.forEach(c => c.classList.remove("active"));
          contact.classList.add("active");
          const contactName = contact.getAttribute("data-contact");
          this.chatHeader.textContent = contactName;
          this.clearMessages();
          this.addMessage(`Carregando mensagens de ${contactName}...`, "system");
        });
      });
    }

    setupSearch() {
      if (this.searchInput) {
        this.searchInput.addEventListener("input", () => {
          const searchValue = this.searchInput.value.toLowerCase();
          this.contacts.forEach(contact => {
            const name = contact.querySelector("span").textContent.toLowerCase();
            contact.style.display = name.includes(searchValue) ? "flex" : "none";
          });
        });
      }
    }

    handleSendMessage() {
      const text = this.input.value.trim();
      if (text !== "") {
        this.addMessage(text, "sent");
        this.chatHistory.push({ type: "sent", text: text, time: this.getCurrentTime() });
        this.input.value = "";
        this.scrollToBottom();

        // Exibe o indicador de "digitando..." para o bot
        this.addMessage("...", "typing");

        // Simula um delay para o bot "digitar" a resposta
        setTimeout(() => {
          this.removeTypingIndicator();
          const botReply = this.bot.getResponse(text);
          this.addMessage(botReply, "received");
          this.chatHistory.push({ type: "received", text: botReply, time: this.getCurrentTime() });
          this.scrollToBottom();
        }, 1500 + Math.random() * 1000);
      }
    }

    // Adiciona uma mensagem ao chat
    addMessage(text, type) {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message", type);
      if (type === "typing") {
        messageDiv.setAttribute("id", "typingIndicator");
      }
      messageDiv.innerHTML = `<span class="messageText">${text}</span> <span class="timestamp">${this.getCurrentTime()}</span>`;
      this.chatMessages.appendChild(messageDiv);
    }

    // Remove o indicador de "digitando..."
    removeTypingIndicator() {
      const typingIndicator = document.getElementById("typingIndicator");
      if (typingIndicator) {
        this.chatMessages.removeChild(typingIndicator);
      }
    }

    // Limpa todas as mensagens do chat
    clearMessages() {
      this.chatMessages.innerHTML = "";
    }

    // Rola a área de mensagens para o final
    scrollToBottom() {
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    // Retorna o horário atual formatado
    getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
  }

  // Inicializa a interface do chat
  const chatUI = new ChatUI();
});

