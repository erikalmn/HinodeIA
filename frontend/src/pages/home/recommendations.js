function Recommendations(low) {
  // Ordena os produtos pelo número de vendas (do menor para o maior)
  const products = low.sort(
    (a, b) => a.vendas_no_período - b.vendas_no_período
  );

  // Limpa o conteúdo atual
  document.getElementById("recommendations").innerHTML = "";

  // Gera uma recomendação personalizada de marketing para os produtos
  products.forEach((i) => {
    let product = "";
    let action = "";

    // Define a recomendação de acordo com o volume de vendas do produto
    if (i.vendas_no_período <= 20) {
      product = `<span class='font-weight-bold'>${i.nome_produto}</span> apresenta baixa saída`;
      action = "Sugerimos uma <span class='font-weight-bold'>promoção agressiva</span> com descontos maiores para aumentar a visibilidade e atrair clientes.";
    } else if (i.vendas_no_período <= 40) {
      product = `<span class='font-weight-bold'>${i.nome_produto}</span> tem vendas moderadas`;
      action = "Recomendamos uma <span class='font-weight-bold'>campanha digital com desconto leve</span>, destacando os diferenciais do produto.";
    }

    // Adiciona o HTML do card
    document.getElementById("recommendations").innerHTML += `
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-purple shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs text-purple text-uppercase mb-1">
                                ${product}
                            </div>
                            <div class="mb-0 text-gray-800">
                                ${action}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  });
}