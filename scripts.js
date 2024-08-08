document.getElementById('calcular').addEventListener('click', function() {
    let total = 0;
    document.querySelectorAll('.quantidade').forEach(function(input) {
        const quantidade = parseFloat(input.value) || 0;
        const preco = parseFloat(input.getAttribute('data-preco'));
        const itemTotal = quantidade * preco;
        total += itemTotal;

        input.parentElement.nextElementSibling.textContent = itemTotal.toFixed(2);
    });
    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
});

document.getElementById('fazer-pedido').addEventListener('click', function() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    if (!nome || !email || !telefone) {
        alert('Por favor, preencha todas as informações.');
        return;
    }

    const resumoItens = document.getElementById('resumo-itens');

    let total = 0;
    let itensPedido = '';
    document.querySelectorAll('.quantidade').forEach(function(input) {
        const quantidade = parseFloat(input.value) || 0;
        const preco = parseFloat(input.getAttribute('data-preco'));
        const itemTotal = quantidade * preco;

        if (quantidade > 0) {
            const produto = input.parentElement.previousElementSibling.previousElementSibling.textContent;
            itensPedido += `
                <tr>
                    <td>${produto}</td>
                    <td>${quantidade}</td>
                    <td>${preco.toFixed(2)}</td>
                    <td>${itemTotal.toFixed(2)}</td>
                </tr>
            `;
            total += itemTotal;
        }
    });

    if (itensPedido) {
        const nomeClienteLinha = `
            <tr>
                <td colspan="4"><strong>Cliente:</strong> ${nome}</td>
            </tr>
        `;

        resumoItens.innerHTML += nomeClienteLinha + itensPedido;

        document.getElementById('resumo-total').textContent = `Total: R$ ${total.toFixed(2)}`;

        const clientesItens = document.getElementById('clientes-itens');
        const novaLinhaCliente = document.createElement('tr');
        novaLinhaCliente.innerHTML = `
            <td>${nome}</td>
            <td>${email}</td>
            <td>${telefone}</td>
        `;
        clientesItens.appendChild(novaLinhaCliente);

        document.querySelectorAll('.quantidade').forEach(function(input) {
            input.value = 0;
            input.parentElement.nextElementSibling.textContent = '0';
        });

        document.getElementById('total').textContent = 'Total: R$ 0';

        document.getElementById('resumo-pedido').scrollIntoView({ behavior: 'smooth' });
    } else {
        alert('Nenhum produto selecionado.');
    }
});
