function Cards(data, low, high) {
  // Quantidade nos cards
  document.getElementById("low-rot").textContent = low.length;
  document.getElementById("high-rot").textContent = high.length;

  // Top produto do período
  const top = data.reduce((leader, i) => {
    return i.vendas_no_período > leader.vendas_no_período ? i : leader;
  });
  document.getElementById("top-prod").textContent = top.nome_produto;
}