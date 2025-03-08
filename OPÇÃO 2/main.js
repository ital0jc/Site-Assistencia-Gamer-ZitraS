let carrinho = [];

function adicionarAoCarrinho(servico, preco) {
    carrinho.push({ servico, preco });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.servico} - R$ ${item.preco.toFixed(2)}
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        listaCarrinho.appendChild(li);
        total += item.preco;
    });

    totalCarrinho.textContent = total.toFixed(2);
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
    alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}\nEntraremos em contato para agendar os serviços.`);
    carrinho = [];
    atualizarCarrinho();
}

// Smooth scroll para as seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});