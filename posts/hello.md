---
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
author: 'Alex222222222222'
category: 'default,default1'
tag: 'tag,tag1'
hidden: 'false'
ogImage: '/posts/1.png'
excerpt: 'is the pre-rendering method that generates the HTML at is the pre-rendering method that generates the HTML on'
---

# This is H1

## This is H2

### This is H3

#### This is H4

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js let's you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

---

```
code block
```

quote 
> quote

![test](/posts/1.png)

<div> dangerous HTML </div>

$$
\theta(a) =1
$$

