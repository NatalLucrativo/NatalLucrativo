document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 0;
    const totalSteps = 7;  // Total de perguntas

    // Dados do Quiz
    const quizData = [
        { 
            question: "Como seria transformar seu Natal em um momento de conquistas, ao invés de só gastos?", 
            answers: [
                "Seria incrível, estou pronto para mudar.", 
                "Eu nunca pensei nisso, mas faz muito sentido.", 
                "Não tenho certeza, mas estou curioso."
            ] 
        },
        { 
            question: "O que está te segurando de finalmente ganhar o que merece neste Natal?", 
            answers: [
                "Não sei por onde começar.", 
                "Medo de falhar ou perder tempo.", 
                "Falta de uma estratégia clara."
            ] 
        },
        { 
            question: "Se você tivesse uma fórmula simples para ganhar até R$5.000 neste Natal, qual seria a primeira coisa que faria com o dinheiro?", 
            answers: [
                "Compraria algo que sempre quis.", 
                "Quitaria minhas dívidas.", 
                "Guardaria para realizar um sonho maior."
            ] 
        },
        { 
            question: "Você vai assistir as pessoas lucrarem enquanto fica parado ou está pronto para agir e ser um destaque?", 
            answers: [
                "Quero agir e ser um destaque.", 
                "Estou cansado(a) de ficar parado(a).", 
                "Ainda não sei, mas quero entender como."
            ] 
        },
        { 
            question: "E se eu te dissesse que, com criatividade e poucas horas, você poderia criar algo que as pessoas amariam comprar?", 
            answers: [
                "Parece perfeito, quero saber mais.", 
                "Acho interessante, mas quero detalhes.", 
                "Preciso entender como funciona na prática."
            ] 
        },
        { 
            question: "Imagine alguém elogiando suas velas enquanto você conta o dinheiro das vendas. Qual seria a sensação?", 
            answers: [
                "Orgulho e realização.", 
                "Satisfação de estar no controle.", 
                "Confiança para expandir ainda mais."
            ] 
        },
        { 
            question: "Você está pronto(a) para transformar sua criatividade em um negócio lucrativo e fazer deste Natal o mais memorável da sua vida?", 
            answers: [
                "Sim, estou pronto(a) para começar agora!", 
                "Quero saber mais antes de agir, mas estou animado(a).", 
                "Preciso de ajuda, mas quero transformar meu Natal."
            ] 
        }
    ];

    // Depoimentos com nomes - alterados para 3 depoimentos mais impactantes
    const testimonialsData = [
        { 
            name: "Ana, 34 anos", 
            text: "Nunca imaginei que poderia ganhar tanto dinheiro com algo simples como velas! Em apenas 3 dias, fiz mais de R$500. Esse ebook realmente transformou meu Natal. Agora, estou fazendo o que amo e gerando lucro!" 
        },
        { 
            name: "Carlos, 28 anos", 
            text: "Eu estava buscando uma forma de ganhar uma renda extra para o Natal. Com o ebook, aprendi a criar velas decorativas que venderam rápido e, em menos de uma semana, já fiz o suficiente para pagar minhas contas. Recomendo muito!" 
        },
        { 
            name: "Júlia, 40 anos", 
            text: "Eu não sabia o que esperar, mas em menos de 5 dias vendendo velas, fiz mais de R$800! Isso foi uma grande virada para o meu negócio. O ebook me ensinou tudo o que eu precisava saber." 
        }
    ];

    // Variáveis de controle
    let currentSection = 'quiz'; // Começa com a seção do quiz

    // Iniciar o Quiz
    const startQuiz = () => {
        document.getElementById('introduction').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
        loadQuestion();
    };

    // Carregar Pergunta
    const loadQuestion = () => {
        if (currentStep >= quizData.length) {
            showNextSection();
            return;
        }
        const questionData = quizData[currentStep];
        const questionArea = document.getElementById('question-area');
        questionArea.innerHTML = `
            <h2>${questionData.question}</h2>
            ${questionData.answers.map(answer => `<button class="quiz-button" onclick="nextStep()">${answer}</button>`).join('')}
        `;
        updateProgress();
    };

    // Avançar para a próxima pergunta
    const nextStep = () => {
        currentStep++;
        loadQuestion();  // Continua o quiz
    };

    // Atualizar Barra de Progresso
    const updateProgress = () => {
        const progress = document.getElementById('progress');
        progress.style.width = `${(currentStep / totalSteps) * 100}%`;
    };

    // Mostrar Tela Final
    const showNextSection = () => {
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('final-section').style.display = 'block';

        // Meta Pixel - Evento personalizado para rastrear finalização
        fbq('trackCustom', 'QuizCompleted');

        showTestimonials(); // Exibe os depoimentos
    };

    // Exibir depoimentos
    const showTestimonials = () => {
        const testimonialsArea = document.getElementById('testimonials');
        
        testimonialsArea.innerHTML = `
            <p><strong>Veja o que as pessoas estão falando!</strong></p>
        `;

        // Adicionar depoimentos dinamicamente
        testimonialsData.forEach(testimonial => {
            const testimonialDiv = document.createElement('div');
            testimonialDiv.classList.add('testimonial');
            testimonialDiv.innerHTML = `
                <p class="testimonial-name">${testimonial.name}</p>
                <p class="testimonial-text">${testimonial.text}</p>
            `;
            testimonialsArea.appendChild(testimonialDiv);
        });
    };

    // Redirecionar para o checkout
    const redirectToCheckout = () => {
        window.location.href = 'https://pay.kiwify.com.br/26ph1mf';
    };

    // Exportar funções
    window.startQuiz = startQuiz;
    window.nextStep = nextStep;
    window.redirectToCheckout = redirectToCheckout;
});
