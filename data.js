const paths = {
    intro: [
        {
            question: "O que mais te motiva a buscar renda extra neste Natal?",
            answers: ["Transformar criatividade em lucro", "Realizar sonhos com renda extra", "Ter independência financeira"]
        },
        {
            question: "Você já pensou em transformar criatividade em lucro com produtos simples e práticos?",
            answers: ["SIM, quero aprender!", "Talvez, se for prático", "Estou curioso(a) para saber mais"]
        }
    ],
    contextualizacao: [
        {
            question: "Sabia que velas natalinas estão entre os produtos mais lucrativos do Natal?",
            answers: ["Sim, já ouvi falar", "Não sabia, interessante", "Como isso é possível?"]
        },
        {
            question: "Você acha que teria tempo para produzir algo criativo e lucrativo neste Natal?",
            answers: ["Sim, com certeza", "Talvez, dependendo do método", "Preciso de algo bem prático"]
        }
    ],
    planejamento: [
        {
            question: "Você gostaria de aprender a vender produtos criativos sem precisar investir muito?",
            answers: ["Sim, parece ótimo", "Quero saber mais", "Tenho algumas dúvidas"]
        },
        {
            question: "Velas natalinas podem gerar até 500% de lucro. Isso te inspira a começar?",
            answers: ["Com certeza!", "Sim, mas preciso de mais detalhes", "Interessante, quero explorar"]
        }
    ],
    depoimentos: [
        {
            testimonials: [
                "⭐ 'Consegui vender todas as velas em uma semana! Foi incrível.' - Ana, 34 anos",
                "⭐ 'O lucro que tive pagou as minhas férias. Recomendo muito!' - Carlos, 28 anos",
                "⭐ 'Eu nunca tinha feito algo assim, mas foi fácil e muito lucrativo!' - Júlia, 40 anos"
            ]
        }
    ],
    final: [
        {
            question: "Pronto para transformar sua criatividade em lucro real?",
            answers: ["Sim, estou pronto(a)!", "Quero começar agora!", "Vamos lucrar neste Natal!"]
        }
    ]
};

let currentSection = 'intro';  // Começa com a seção 'intro'
let currentQuestionIndex = 0; // Começa com a primeira pergunta

// Função para iniciar o quiz
function startQuiz() {
    showQuestion();
}

// Função para mostrar a pergunta atual
function showQuestion() {
    const section = paths[currentSection];  // Obtém a seção atual
    const questionData = section[currentQuestionIndex];  // Obtém a pergunta atual
    const questionArea = document.getElementById('question-area');
    
    // Atualiza a pergunta
    questionArea.innerHTML = `
        <h2>${questionData.question}</h2>
        ${questionData.answers.map(answer => `
            <button class="quiz-button" onclick="nextQuestion()">${answer}</button>
        `).join('')}
    `;
    
    // Atualiza a barra de progresso
    updateProgress();
}

// Função para avançar para a próxima pergunta
function nextQuestion() {
    currentQuestionIndex++;

    // Verifica se ainda há mais perguntas na seção
    if (currentQuestionIndex < paths[currentSection].length) {
        showQuestion();
    } else {
        // Se não houver mais perguntas, avança para a próxima seção
        if (currentSection === 'intro') {
            currentSection = 'contextualizacao';
        } else if (currentSection === 'contextualizacao') {
            currentSection = 'planejamento';
        } else if (currentSection === 'planejamento') {
            currentSection = 'depoimentos';
        } else if (currentSection === 'depoimentos') {
            currentSection = 'final';
        }
        currentQuestionIndex = 0;  // Reseta o índice das perguntas na nova seção
        showSection();
    }
}

// Função para exibir a seção (depoimentos ou final)
function showSection() {
    if (currentSection === 'depoimentos') {
        showTestimonials();
    } else if (currentSection === 'final') {
        showFinalSection();
    }
}

// Função para mostrar os depoimentos
function showTestimonials() {
    const testimonialsData = paths.depoimentos[0].testimonials;
    const testimonialsArea = document.getElementById('testimonials');
    
    testimonialsArea.innerHTML = `
        <h3>Veja o que outras pessoas estão conquistando:</h3>
        ${testimonialsData.map(testimonial => `<p>${testimonial}</p>`).join('')}
    `;
    
    showFinalSection();
}

// Função para mostrar a seção final
function showFinalSection() {
    const finalData = paths.final[0];
    const finalSection = document.getElementById('final-section');
    
    finalSection.style.display = 'block'; // Torna a seção final visível
    document.getElementById('question-area').innerHTML = `
        <h2>${finalData.question}</h2>
        ${finalData.answers.map(answer => `
            <button class="quiz-button" onclick="redirectToCheckout()">${answer}</button>
        `).join('')}
    `;
}

// Função para redirecionar para o checkout
function redirectToCheckout() {
    window.location.href = 'checkout.html';  // Substitua pelo link do seu checkout
}

// Função para atualizar a barra de progresso
function updateProgress() {
    const progress = document.getElementById('progress');
    const progressBar = (currentQuestionIndex / paths[currentSection].length) * 100;
    progress.style.width = `${progressBar}%`;
}

// Inicializa o quiz ao carregar a página
window.onload = startQuiz;
