function ChartProgressBar(data) {
  // Ordena os produtos pelo número de vendas (do menor para o maior) e pega os 5 menos vendidos
  const bottoms = data
    .sort((a, b) => a.vendas_no_período - b.vendas_no_período)
    .slice(0, 5);

  // Calcula o total de vendas de todos os produtos
  const sales = data.reduce((sum, i) => sum + i.vendas_no_período, 0);

  // Limpa o conteúdo atual
  document.getElementById("bot-prod").innerHTML = "";

  // Cria a barra de progresso para cada produto menos vendido
  bottoms.forEach((i) => {
    // Calcula a porcentagem que o produto representa em relação ao total
    const perc = ((i.vendas_no_período / sales) * 100).toFixed(0);

    // Adiciona o HTML da barra de progresso
    document.getElementById("bot-prod").innerHTML += `
        <h4 class="small font-weight-bold"> 
          ${i.nome_produto} 
          <span class="float-right">${perc}%</span>
        </h4>
        <div class="progress mb-4">
          <div class="progress-bar bg-yellow" role="progressbar" style="width: ${perc}%" aria-valuenow="${perc}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      `;
  });
}