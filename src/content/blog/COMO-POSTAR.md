# Como publicar um post no blog

Este guia fica no repositório para consulta rápida. Ele **não aparece** no site.

## 1. Criar o post

Crie um arquivo Markdown em:

```
src/content/blog/meu-post.md
```

Use este formato:

```md
---
title: Título do post
date: 2026-10-14
excerpt: Uma frase curta que aparece no card da lista.
cover: /blog/meu-post/cover.jpg
tags: [atleta, vida]
---

Texto do post em Markdown.

## Subtítulos

**Negrito**, *itálico*, listas, links e imagens funcionam normalmente.

![Legenda da foto](/blog/meu-post/foto.jpg)
```

### Campos do topo (frontmatter)

| Campo | Obrigatório | Descrição |
| --- | --- | --- |
| `title` | sim | Título do post |
| `date` | sim | Data `AAAA-MM-DD` (ordena a lista) |
| `excerpt` | recomendado | Resumo no card |
| `cover` | opcional | Imagem de capa |
| `tags` | opcional | Lista entre colchetes |
| `slug` | opcional | Se não passar, usa o nome do arquivo |

## 2. Adicionar imagens

1. Crie a pasta `public/blog/meu-post/`
2. Coloque as imagens lá (`cover.jpg`, `foto.jpg`, etc.)
3. No Markdown, referencie com caminho absoluto a partir de `public/`:

```md
![Treino de hoje](/blog/meu-post/foto.jpg)
```

> O site ajusta o caminho automaticamente para funcionar no GitHub Pages.

**Dicas de imagem**
- Prefira `.jpg` ou `.webp` para fotos (menor que PNG)
- Ideal: largura entre 1200px e 1600px
- Evite arquivos acima de ~400KB

## 3. Publicar

```bash
git add .
git commit -m "blog: novo post meu-post"
git push
```

Em alguns minutos o post aparece em `#/blog` do site.

## 4. Atalho pelo celular

Use o app do GitHub → repositório `filipestudio-site` → `src/content/blog/` → **Add file** → **Create new file**.

Cole o Markdown, anexe imagens em `public/blog/...`, e faça o commit direto em `main`.

---

## Jeito mais fácil: publicar por Issue do GitHub

1. Vá em: [Issues do repositório](https://github.com/FilipePRodrigues/filipestudio-site/issues/new?template=blog.yml)
2. Preencha o formulário (título, conteúdo, tags, resumo)
3. Anexe fotos direto no editor (arraste ou cole)
4. Clique em **Submit new issue**

A Action converte automaticamente em post e publica.
Em ~2 minutos o post aparece em `#/blog` do site.

> A Issue recebe um comentário de confirmação quando o post é publicado.
