async function Recommendations(low) {
  // Ordena os produtos pelo número de vendas (do menor para o maior)
  const products = low.sort(
    (a, b) => a.vendas_no_período - b.vendas_no_período
  );

  // Limpa o conteúdo atual
  document.getElementById("recommendations").innerHTML = "";

  // Gera texto de Marketing com IA
  for (const i of products) {
    let status = "";

    // Define o status de acordo com o volume de vendas do produto
    if (i.vendas_no_período <= 20) {
      status = "baixa saída";
    } else if (i.vendas_no_período <= 40) {
      status = "vendas moderadas";
    }

    const prompt = `
      Crie uma recomendação de marketing breve (máx. 5 linhas) para o produto "${i.nome_produto}", que teve ${status} no período.
      O texto deve ser direto, sem título, e sugerir ações promocionais criativas que façam sentido para esse cenário.
    `;

    // OpenRouter
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Dashboard IA Marketing",
        },
        body: JSON.stringify({
          model: "google/gemini-flash-1.5",
          messages: [
            {
              role: "system",
              content: "Você é um especialista em marketing digital.",
            },
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    const data = await response.json();
    const action = data.choices[0].message.content;

    // Adiciona o HTML do card
    document.getElementById("recommendations").innerHTML += `
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-purple shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs text-purple text-uppercase mb-1">
                              <span class='font-weight-bold'>${i.nome_produto}</span> apresenta ${status}
                            </div>
                            <div class="mb-0 text-gray-800">
                              ${marked.parse(action)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}