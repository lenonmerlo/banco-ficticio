# 💼 Banco Fictício — Desafio Banestes 2025

Sistema web desenvolvido como parte do processo seletivo para o estágio no Banestes.  
Simula uma interface bancária com listagem de clientes, dashboard financeiro e login fictício.

---

## 🔗 Acesso rápido

- Página inicial: `/`
- Dashboard: `/dashboard`
- Página de login: `/login`

---

## 🧰 Tecnologias utilizadas

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- TypeScript
- Bootstrap 5
- React Router DOM
- LocalStorage (simulação de sessão)
- Exportação CSV

---

## ✨ Funcionalidades

- ✅ **Login fictício** com e-mail e senha pré-definidos
- ✅ **Redirecionamento automático** para `/login` se não estiver logado
- ✅ **Proteção de rotas** com `PrivateRoute`
- ✅ **Dashboard de Renda** com gráfico
- ✅ **Listagem de clientes** com busca e exportação CSV
- ✅ **Tema claro/escuro**
- ✅ **Botão de logout** funcional
- ✅ **Saudação personalizada** no header
- ✅ **Página 404 personalizada**

---

## 🧪 Login de demonstração

| Campo   | Valor                    |
|---------|--------------------------|
| E-mail  | demo@banestes.com.br     |
| Senha   | 123456                   |

---

## 🚀 Como rodar o projeto

```bash
# Instale as dependências
npm install

# Rode o projeto em modo dev
npm run dev
```

> ⚠️ Certifique-se de ter o Node.js e o Vite instalados corretamente.

---

## 📁 Estrutura de pastas (parcial)

```
src/
├── pages/
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Cliente.tsx
│   └── PaginaNaoEncontrada.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── PrivateRoute.tsx
```

---

## 🧑‍💻 Desenvolvido por

Lenon Merlo  
[linkedin.com/in/lenonmerlo](https://linkedin.com/in/lenonmerlo)

---
