let carrinho = [];

function adicionarAoCarrinho(servico, preco) {
    carrinho.push({ servico, preco });
    atualizarCarrinho();
    
    // Animação de feedback
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = 'Serviço adicionado ao carrinho!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.servico} - R$ ${item.preco.toFixed(2)}</span>
            <button onclick="removerDoCarrinho(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        listaCarrinho.appendChild(li);
        total += item.preco;
    });

    totalCarrinho.textContent = total.toFixed(2);
    
    // Atualiza a visibilidade do carrinho
    const carrinhoElement = document.getElementById('carrinho');
    if (carrinho.length > 0) {
        carrinhoElement.style.display = 'block';
    } else {
        carrinhoElement.style.display = 'none';
    }
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    const mensagem = `Compra finalizada!\n\nItens:\n${carrinho.map(item => `- ${item.servico}: R$ ${item.preco.toFixed(2)}`).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}\n\nEntraremos em contato para agendar os serviços.`;
    
    alert(mensagem);
    carrinho = [];
    atualizarCarrinho();
}

// Formulário de contato
document.getElementById('contato-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Aqui você pode adicionar a lógica para enviar o formulário
    alert(`Mensagem enviada com sucesso!\n\nNome: ${nome}\nE-mail: ${email}\nAssunto: ${assunto}\nMensagem: ${mensagem}`);
    
    this.reset();
});

// Menu mobile
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Fecha o menu mobile se estiver aberto
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Animação de números
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 segundos
        const steps = 100;
        const timePerStep = duration / steps;
        
        const animation = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(animation);
            }
            stat.textContent = Math.floor(current).toString() + (stat.textContent.includes('+') ? '+' : '');
        }, timePerStep);
    });
}

// Observador de interseção para animação dos números
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    observer.observe(heroStats);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho();
});