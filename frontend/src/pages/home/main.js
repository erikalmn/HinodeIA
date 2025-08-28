let low = [];
let high = [];

fetch("data/data.json")
  .then((res) => res.json())
  .then(async (data) => {
    const body = document.getElementById("data-table");
    // Monta a tabela
    await Table(data, body, low, high);

    new DataTable("table", {
      paging: true,
      searching: true,
      ordering: true,
      responsive: true,
      language: {
        url: "https://cdn.datatables.net/plug-ins/2.3.3/i18n/pt-BR.json",
      }
    });

    // Atualiza os cards
    Cards(data, low, high);

    // Gera o gráfico de barras de progresso (produtos menos vendidos)
    ChartProgressBar(data);

    // Gera o gráfico de pizza
    ChartPie(low, high);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
