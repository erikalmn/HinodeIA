# Hinode IA

Dividido em: **backend** e **frontend**.

---

## Backend

O **backend** contém:
- O desenvolvimento do modelo de IA para prever a **rotatividade dos produtos**.

  > O modelo foi treinado com dados simulados que estão no arquivo `dataset_train.csv`.

- A **API** com a rota `/predict`.

### Pré-requisitos
- **Python 3.11.9** (versão estável utilizada para garantir compatibilidade das dependências).
- Instalar as dependências necessárias:

  ```bash
  pip install -r requirements.txt

### Executando
- No diretório `backend`, execute:

  ```bash
  python api.py

## Frontend

O **frontend** contém o projeto do *Dashboard* para visualização e interação.

### Pré-requisitos
- **Node.js** (versão recomendada: LTS).
- Instalar as dependências necessárias:

  ```bash
  npm install

### Executando
- No diretório `frontend`, execute:

  ```bash
  npm run dev