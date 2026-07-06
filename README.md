# Educação Interativa Angola

Plataforma educativa angolana dedicada à divulgação de conteúdo sobre economia e história de Angola. Artigos, vídeos, podcasts, quizzes e fóruns de discussão.

- `frontend` - interface web principal
- `backend` - API e regras de negócio
- `mobile` - aplicação mobile
- `database` - ficheiros e recursos relacionados com a base de dados

---

## Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| **Artigos** | Publicação, comentários aninhados, destaques, busca por categoria |
| **Conteúdo Multimédia** | Vídeos, podcasts, textos Jindungo (acesso controlado), reações, playlists |
| **Fórum** | Tópicos públicos e privados, respostas aninhadas, votos, enquetes, denúncias |
| **Quiz** | Questionários educativos com ranking e resultados |
| **Salas de Discussão** | Chat em tempo real com gestão de membros e convites |
| **Moderação** | Aprovações de acesso, gestão de denúncias, controlo de autores |

---

## Tecnologias

- **Backend:** PHP + MySQL (InnoDB)
- **Frontend:** HTML/CSS/JavaScript
- **Design:** Figma
- **Base de dados:** 39 tabelas, 71 relações de chave estrangeira

---

## Estrutura

```text
economia-com-historia/
├─ backend/
│  ├─ api/
│  │  ├─ auth/              # Login, registo, recuperação de senha
│  │  ├─ artigos/           # CRUD de artigos e comentários
│  │  ├─ conteudo/          # Vídeos, podcasts, textos Jindungo
│  │  ├─ forum/             # Tópicos, respostas, enquetes, votos
│  │  ├─ quiz/              # Quizzes, perguntas, respostas
│  │  ├─ salas/             # Salas de discussão e mensagens
│  │  └─ admin/             # Gestão de utilizadores, denúncias, aprovações
│  ├─ config/
│  │  └─ database.php       # Configuração da base de dados
│  ├─ middleware/
│  │  └─ auth.php           # Autenticação e autorização
│  └─ utils/
│     └─ helpers.php        # Funções auxiliares
│
├─ frontend/
│  ├─ public/
│  │  ├─ css/
│  │  ├─ js/
│  │  ├─ img/
│  │  └─ uploads/           # Ficheiros enviados pelos utilizadores
│  ├─ pages/
│  │  ├─ home.php
│  │  ├─ artigo.php
│  │  ├─ conteudo.php
│  │  ├─ forum.php
│  │  ├─ quiz.php
│  │  ├─ sala.php
│  │  └─ perfil.php
│  ├─ components/
│  │  ├─ header.php
│  │  ├─ footer.php
│  │  ├─ sidebar.php
│  │  └─ navbar.php
│  └─ admin/
│     ├─ dashboard.php
│     ├─ utilizadores.php
│     ├─ denuncias.php
│     └─ estatisticas.php
│
├─ mobile/
│  └─ (futuro)
│
├─ database/
│  ├─ schema/
│  │  └─ schema_completo.sql    # Script completo da base de dados
│  ├─ migrations/
│  │  └─ (futuro)
│  └─ seeds/
│     └─ (futuro)
│
├─ docs/
│  ├─ DER.png                     # Diagrama Entidade-Relacionamento
│  ├─ Diagrama_Casos_de_Uso.png   # Diagrama de Casos de Uso
│  └─ figma/
│     └─ (ficheiros de design)
│
├─ .gitignore
├─ LICENSE
└─ README.md
---

## Tipos de Utilizador

| Tipo | Permissões |
|------|-----------|
| **Visitante** | Ler conteúdo público, registar-se |
| **Subscrito** | Comentar, responder quiz, salvar conteúdo, participar em fóruns e salas |
| **Professor** | Publicar artigos, criar enquetes, marcar respostas aceites |
| **Admin** | Gerir utilizadores, moderar denúncias, aprovar acessos|
| **SuperAdmin** | Todas as permissões de admin + gestão de admins |

---

## Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-user/economia-com-historia.git
cd economia-com-historia

# 2. Importar a base de dados
mysql -u root -p < schema_completo.sql

# 3. Configurar credenciais 
Backend/.env.desenvolvimento

# Instalar as dependências
npm install 

# 4. Iniciar o servidor local
npm run dev

Licença
MIT License — ver LICENSE para detalhes.





