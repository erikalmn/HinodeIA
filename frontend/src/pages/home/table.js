async function Table(data, body, low, high) {
  for (const i of data) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${i.id_produto}</td>
        <td>${i.nome_produto}</td>
        <td>${i.quantidade_em_estoque}</td>
        <td>${i.vendas_no_período}</td>
        <td>${i.estoque_no_início_do_período}</td>
        <td>${i.estoque_no_fim_do_período}</td>
        <td>${i.estoque_médio}</td>
        <td class="rotatividade">Calculando...</td>
      `;
    body.appendChild(row);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(i)
      });

      const result = await response.json();
      const rot = result.predictions?.[0];

      document.getElementById("updated-at").textContent = result.updated_at;

      if (rot) {
        row.querySelector(".rotatividade").textContent = rot;

        if (rot === "baixa") {
          low.push(i);
        } else if (rot === "alta") {
          high.push(i);
        }
      } else {
        row.querySelector(".rotatividade").textContent = "N/A";
      }
    } catch (error) {
      console.error("Error:", error);
      row.querySelector(".rotatividade").textContent = "Erro";
    }
  }
}