# 📖 Leitor Zen

Uma interface de leitura adaptativa desenvolvida para oferecer uma experiência confortável, acessível e personalizável.

O **Leitor Zen** permite que o usuário adapte a apresentação do conteúdo às suas preferências, alterando tema, tamanho e tipo da fonte, espaçamento entre linhas e largura da área de leitura.

As configurações são armazenadas no navegador, mantendo a experiência escolhida mesmo após recarregar a página.

---

## ✨ Funcionalidades

- ☀️ Tema claro
- 🌙 Tema escuro
- 📖 Tema sépia
- 🔠 Controle de tamanho do texto
- ✒️ Alternância entre fontes serifadas e sans-serif
- ↕️ Controle de espaçamento entre linhas
- ↔️ Controle da largura da área de leitura
- 🎯 Modo foco para reduzir distrações
- 📊 Barra dinâmica de progresso da leitura
- ⏱️ Cálculo automático do tempo estimado de leitura
- ⬆️ Botão para retornar ao início da página
- 💾 Preferências salvas com `localStorage`
- ⌨️ Interações por teclado, incluindo tecla `Esc`
- 📱 Interface responsiva para desktop, tablet e celular

---

## 🎨 Experiência de leitura

O projeto oferece três ambientes visuais:

### ☀️ Claro

Interface limpa e neutra para leitura em ambientes iluminados.

### 📖 Sépia

Paleta inspirada em páginas de livros, com tons mais quentes e contraste suave.

### 🌙 Escuro

Interface desenvolvida para proporcionar uma experiência visual mais confortável em ambientes com pouca iluminação.

As preferências escolhidas pelo usuário permanecem armazenadas localmente no navegador.

---

## 🎯 Modo Foco

O **Modo Foco** reduz elementos secundários da interface para priorizar o conteúdo durante a leitura.

Ao ativá-lo, a interface diminui distrações e mantém o artigo como elemento principal da experiência.

---

## 💾 Preferências persistentes

O projeto utiliza a API `localStorage` do navegador para armazenar configurações como:

- Tema selecionado
- Tamanho do texto
- Tipo de fonte
- Espaçamento entre linhas
- Largura da área de leitura

Dessa forma, as preferências são restauradas automaticamente quando o usuário retorna à página.

---

## 📊 Progresso e tempo de leitura

A barra localizada no topo acompanha dinamicamente a posição do usuário no documento.

O tempo estimado de leitura também é calculado automaticamente pelo JavaScript com base na quantidade de palavras presentes no artigo.

---

## ♿ Acessibilidade

O Leitor Zen foi desenvolvido considerando recursos que ajudam a tornar a navegação mais acessível:

- Controles com `aria-label`
- Estados com `aria-pressed`
- Painel utilizando `aria-expanded`
- Alteração de tamanho do texto
- Controle de espaçamento
- Diferentes opções de contraste
- Navegação utilizando teclado
- Layout responsivo

---

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage API
- DOM API
- Font Awesome
- Google Fonts

---

## 🧠 Conceitos aplicados

Durante o desenvolvimento foram utilizados conceitos como:

- Manipulação do DOM
- Event listeners
- Estado da interface
- Persistência de dados no navegador
- CSS Custom Properties
- Design responsivo
- Media Queries
- Acessibilidade
- Experiência do usuário (UX)
- Interface adaptativa
- Cálculo dinâmico de conteúdo

---

## 📁 Estrutura do projeto

```text
leitor-zen/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🚀 Projeto online

O projeto pode ser publicado através do **GitHub Pages**.

> O link da versão online será adicionado aqui após a publicação.

---

## 🎯 Objetivo do projeto

O objetivo do **Leitor Zen** é explorar como pequenas decisões de interface podem melhorar a experiência de leitura digital.

Mais do que oferecer diferentes temas, o projeto demonstra como JavaScript e CSS podem ser utilizados para criar uma interface que responde às preferências do usuário e mantém essas escolhas entre diferentes sessões.

---

## 👨‍💻 Autor

**Thiago Araujo**

Bacharel em Ciência da Computação pela Universidade Cidade de São Paulo (UNICID).

- LinkedIn: https://www.linkedin.com/in/thaigoaoliveira/
- GitHub: https://github.com/t-h-i-a-g-o-a-r-a-u-j-o

---

> **Leitor Zen — tecnologia que se adapta ao seu ritmo.** 🌿
