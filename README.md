# Controle de Estoque

Sistema simples de controle de estoque desenvolvido com Django, MySQL e React.

A aplicação permite cadastrar ingredientes e gerar uma lista de compras com base na meta de estoque, estoque atual, validade e consumo do período.

## Tecnologias

- Django
- Django REST Framework
- MySQL
- React
- TypeScript
- Vite

## Pré-requisitos

- Python
- MySQL
- Node.js
- npm

## Instalação

Clone o repositório:

```bash
git clone https://github.com/ErickMatias/controle-estoque.git
cd controle-estoque
```

### Backend

Entre na pasta do backend:

```powershell
cd backend
```

Crie o ambiente virtual:

```powershell
python -m venv .venv
```

Ative o ambiente virtual:

```powershell
.\.venv\Scripts\Activate.ps1
```

Instale as dependências:

```powershell
pip install -r requirements.txt
```

Crie o banco de dados no MySQL:

```sql
CREATE DATABASE controle_estoque_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Crie um arquivo `.env` dentro da pasta `backend` com o seguinte conteúdo:

```env
DB_NAME=controle_estoque_db
DB_USER=root
DB_PASSWORD=sua_senha
DB_HOST=127.0.0.1
DB_PORT=3306
```

Substitua `sua_senha` pela senha do seu MySQL.

Depois execute as migrations:

```powershell
python manage.py migrate
```

### Frontend

Abra outro terminal, entre na pasta `frontend`:

```powershell
cd frontend
```

Instale as dependências:

```powershell
npm install
```

## Como rodar o projeto

O backend e o frontend precisam estar rodando ao mesmo tempo.

### Backend

Na pasta `backend`:

```powershell
.\.venv\Scripts\Activate.ps1
python manage.py runserver
```

O backend ficará disponível em:

```text
http://127.0.0.1:8000/
```

### Frontend

Na pasta `frontend`:

```powershell
npm run dev
```

O frontend normalmente ficará disponível em:

```text
http://localhost:5173/
```

Acesse no navegador:

```text
http://localhost:5173/
```