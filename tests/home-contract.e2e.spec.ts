import { expect, test } from '@playwright/test'

const ids = [
  { id: 'topo', titleId: 'hero-title' },
  { id: 'servicos', titleId: 'servicos-title' },
  { id: 'beneficios', titleId: 'beneficios-title' },
  { id: 'processo', titleId: 'processo-title' },
  { id: 'portfolio', titleId: 'portfolio-title' },
  { id: 'planos', titleId: 'planos-title' },
  { id: 'faq', titleId: 'faq-title' },
  { id: 'contato', titleId: 'contato-title' },
]

async function gotoHome(page: any) {
  await page.goto('/')
  await page.waitForSelector('main#conteudo')
}

async function waitForLuxuryInit(page: any) {
  await page.waitForFunction(() => {
    const hasSweep = document.querySelectorAll('[data-underline-sweep] .sweep-line').length > 0
    const hasPullBar = document.querySelectorAll('[data-pull-quote] .pull-quote__bar').length > 0
    return hasSweep && hasPullBar
  })
}

test.describe('Home — DOM & motion contracts', () => {
  test('1) sections IDs + aria-labelledby references exist', async ({ page }) => {
    await gotoHome(page)

    for (const { id, titleId } of ids) {
      const section = page.locator(`section#${id}`)
      await expect(section).toHaveCount(1)

      const aria = await section.getAttribute('aria-labelledby')
      expect(aria, `section#${id} aria-labelledby must exist`).toBeTruthy()

      const firstRef = (aria ?? '').split(/\s+/)[0]
      expect(firstRef, `section#${id} aria-labelledby must reference #${titleId}`).toBe(titleId)

      await expect(page.locator(`#${titleId}`)).toHaveCount(1)
    }
  })

  test('2) underline sweep creates .sweep-line', async ({ page }) => {
    await gotoHome(page)
    await waitForLuxuryInit(page)

    const sweepLines = page.locator('.sweep-line')
    const count = await sweepLines.count()
    expect(count).toBeGreaterThan(0)

    // Contract: every [data-underline-sweep] must have a child .sweep-line.
    const ok = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('[data-underline-sweep]')).every((link) => {
        return link.querySelectorAll('.sweep-line').length >= 1
      })
    })
    expect(ok).toBe(true)
  })

  test('3) pull quote injection creates .pull-quote__bar', async ({ page }) => {
    await gotoHome(page)
    await waitForLuxuryInit(page)

    const pullBars = page.locator('.pull-quote__bar')
    const count = await pullBars.count()
    expect(count).toBeGreaterThan(0)

    const barsInContracts = await page.locator('[data-pull-quote] .pull-quote__bar').count()
    expect(barsInContracts).toBeGreaterThan(0)

    const ok = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('[data-pull-quote]')).every((el) => {
        return !!el.querySelector('.pull-quote__bar')
      })
    })
    expect(ok).toBe(true)
  })

  test('4) count-up changes textContent after scroll to Metrics', async ({ page }) => {
    await gotoHome(page)
    await waitForLuxuryInit(page)

    const countEl = page.locator('[data-count]').first()
    await expect(countEl).toHaveCount(1)

    const countHandle = await countEl.elementHandle()
    expect(countHandle).toBeTruthy()

    const beforeText = (await countEl.textContent())?.trim() ?? ''
    expect(beforeText.length).toBeGreaterThan(0)

    await page.evaluate((el: HTMLElement) => el.scrollIntoView({ block: 'center' }), countHandle)

    await page.waitForFunction(
      (el: any) => {
        const next = (el.textContent ?? '').trim()
        const raw = (el.getAttribute('data-count') ?? '').trim()
        return next.length > 0 && next !== raw
      },
      countHandle,
    )

    const afterText = (await countEl.textContent())?.trim() ?? ''
    expect(afterText).not.toBe(beforeText)
  })

  test('5) image reveal sets dataset.revealed=1 after scroll', async ({ page }) => {
    await gotoHome(page)
    await waitForLuxuryInit(page)

    const frame = page.locator('[data-image-reveal]').first()
    await expect(frame).toHaveCount(1)

    const frameHandle = await frame.elementHandle()
    expect(frameHandle).toBeTruthy()

    await page.evaluate((el: HTMLElement) => el.scrollIntoView({ block: 'center' }), frameHandle)

    await page.waitForFunction((el) => el.dataset.revealed === '1', frameHandle)

    const revealed = await frame.evaluate((el: HTMLElement) => el.dataset.revealed)
    expect(revealed).toBe('1')
  })

  test('6) spotlight creates .spotlight-layer and responds to pointermove', async ({ page }) => {
    await gotoHome(page)
    await waitForLuxuryInit(page)

    const spotlight = page.locator('[data-spotlight]').first()
    await expect(spotlight).toHaveCount(1)

    await spotlight.scrollIntoViewIfNeeded()

    const layer = spotlight.locator('.spotlight-layer').first()
    await expect(layer).toHaveCount(1)

    const layerHandle = await layer.elementHandle()
    expect(layerHandle).toBeTruthy()

    const before = await layer.evaluate((el: HTMLElement) => ({
      x: el.style.getPropertyValue('--spot-x'),
      y: el.style.getPropertyValue('--spot-y'),
      on: el.classList.contains('is-on'),
    }))

    const box = await spotlight.boundingBox()
    expect(box).toBeTruthy()

    const spotlightHandle = await spotlight.elementHandle()
    expect(spotlightHandle).toBeTruthy()

    // Headless pointermove can be flaky; dispatch directly.
    await page.evaluate(
      (el: any) => {
        const r = el.getBoundingClientRect()
        const x = r.left + r.width * 0.5
        const y = r.top + r.height * 0.35
        el.dispatchEvent(
          new PointerEvent('pointermove', {
            clientX: x,
            clientY: y,
            bubbles: true,
            pointerType: 'mouse',
          }),
        )
      },
      spotlightHandle,
    )

    await page.waitForFunction((el: any) => el.classList.contains('is-on'), layerHandle)

    const after = await layer.evaluate((el: HTMLElement) => ({
      x: el.style.getPropertyValue('--spot-x'),
      y: el.style.getPropertyValue('--spot-y'),
      on: el.classList.contains('is-on'),
    }))

    expect(after.on).toBe(true)
    expect(after.x.length).toBeGreaterThan(0)
    expect(after.y.length).toBeGreaterThan(0)
    expect(after.x !== before.x || after.y !== before.y).toBe(true)
  })

  test('7) prancha de figuras: 12 figures with fig. NN · + data-image-reveal; flight retired', async ({ page }) => {
    await gotoHome(page)
    await waitForLuxuryInit(page)

    // Flight aposentado (FS-010.8, plano §1.3): nenhum nó do contrato antigo
    // permanece no DOM (setupFlightScene também foi removido de motion.ts).
    expect(await page.locator('[data-flight-section]').count()).toBe(0)
    expect(
      await page
        .locator('[data-flight-track], [data-flight-lean], [data-flight-scene], [data-flight-card]')
        .count(),
    ).toBe(0)

    // Prancha (contrato §3.5): 12 figure catalogadas, cada frame com
    // data-image-reveal e figcaption "fig. NN · <legenda>".
    const frames = page.locator('#pixel-world figure[data-image-reveal]')
    await expect(frames).toHaveCount(12)

    const captions = await frames.locator('figcaption').allTextContents()
    expect(captions).toHaveLength(12)
    captions.forEach((text, index) => {
      const nn = String(index + 1).padStart(2, '0')
      expect(text.trim().startsWith(`fig. ${nn} · `)).toBe(true)
    })
  })

  test('8) reduced motion emulation does not crash', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))

    // Causa raiz do pageerror pré-existente ("Cannot read properties of null
    // (reading dataset)"): o init script lia `document.documentElement.dataset`
    // antes de <html> existir (documentElement === null em addInitScript).
    // Correção: guard null + aplicação assim que o elemento for inserido.
    // (motion.ts também ganhou null-guard em prefersReducedMotion.)
    await page.addInitScript(() => {
      const apply = () => {
        const el = document.documentElement
        if (el) el.dataset.motion = 'reduced'
      }
      apply()
      if (!document.documentElement) {
        new MutationObserver((_, obs) => {
          if (document.documentElement) {
            apply()
            obs.disconnect()
          }
        }).observe(document, { childList: true })
      }
    })

    await gotoHome(page)

    await page.waitForSelector('[data-hero-intro] [data-hero-part]')

    if (errors.length) {
      console.log('[reduced motion] pageerror(s):', errors)
    }
    expect(errors).toEqual([])
  })
})

// ---------------------------------------------------------------------------
// FS-011.5 — reforço do contrato: interação (abas/stepper/FAQ/tema), H2
// bicolor e guarda de CLS. Padrão dos testes 2–8: dispatch direto de eventos
// (headless flaka com mouse/teclado reais em elementos animados/ocultos).
// ---------------------------------------------------------------------------

type TabState = {
  index: number
  selected: boolean
  isActive: boolean
  tabIndex: string | null
  panelHidden: boolean
}

/**
 * O dev server do Vite injeta o CSS como <style> inline e a CSP estrita do
 * index.html (style-src 'self', sem 'unsafe-inline') bloqueia estilos inline —
 * em produção o CSS sai como <link rel="stylesheet"> ('self' → permitido).
 * Para asserções de estilo computado, habilitar via CDP o bypass de CSP
 * reproduz a condição de produção (regras reais aplicadas). Só os testes que
 * leem getComputedStyle usam este helper.
 */
async function enableComputedStyles(page: any): Promise<void> {
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('Page.setBypassCSP', { enabled: true })
}

function readTabState(page: any): Promise<TabState[]> {
  return page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('#portfolio [role="tablist"] [role="tab"]'))
    return tabs.map((tab, index) => ({
      index,
      selected: tab.getAttribute('aria-selected') === 'true',
      isActive: tab.classList.contains('is-active'),
      tabIndex: tab.getAttribute('tabindex'),
      panelHidden: !document.getElementById(`pf-panel-${index}`) || document.getElementById(`pf-panel-${index}`)!.hasAttribute('hidden'),
    }))
  })
}

test.describe('Home — contratos de interação & guarda de CLS (FS-011.5)', () => {
  test('9) portfolio tabs: setas/Home/End por teclado + aria-selected consistente', async ({ page }) => {
    await gotoHome(page)
    await waitForLuxuryInit(page)

    await expect(page.locator('#portfolio [role="tablist"]')).toHaveCount(1)
    const tabCount = await page.locator('#portfolio [role="tablist"] [role="tab"]').count()
    expect(tabCount).toBeGreaterThan(1)

    // dispatch direto do KeyboardEvent (o handler React onKeyDown lê event.key)
    const pressTabKey = async (index: number, key: string) => {
      await page.evaluate(
        ({ index, key }) => {
          const tab = document.querySelectorAll('#portfolio [role="tablist"] [role="tab"]')[index] as HTMLElement
          tab.focus()
          tab.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
        },
        { index, key },
      )
    }

    const expectSelected = async (expected: number) => {
      await expect
        .poll(async () => {
          const state = await readTabState(page)
          const selected = state.filter((s: TabState) => s.selected)
          return selected.length === 1 ? selected[0].index : -1
        })
        .toBe(expected)

      for (const s of await readTabState(page)) {
        // aria-selected espelha .is-active, tabindex roving e painel visível
        expect(s.selected, `aba ${s.index} aria-selected`).toBe(s.index === expected)
        expect(s.isActive, `aba ${s.index} .is-active`).toBe(s.index === expected)
        expect(s.tabIndex, `aba ${s.index} tabindex roving`).toBe(s.index === expected ? '0' : '-1')
        expect(s.panelHidden, `painel ${s.index} hidden`).toBe(s.index !== expected)
      }
    }

    await expectSelected(0)

    await pressTabKey(0, 'ArrowRight')
    await expectSelected(1)

    await pressTabKey(1, 'End')
    await expectSelected(tabCount - 1)

    // ArrowRight no fim faz wrap para a primeira
    await pressTabKey(tabCount - 1, 'ArrowRight')
    await expectSelected(0)

    // ArrowLeft no início faz wrap para a última
    await pressTabKey(0, 'ArrowLeft')
    await expectSelected(tabCount - 1)

    await pressTabKey(tabCount - 1, 'Home')
    await expectSelected(0)
  })

  test('10) processo stepper: radios trocam o painel (clique + setas do radio group)', async ({ page }) => {
    await enableComputedStyles(page)
    await gotoHome(page)
    await waitForLuxuryInit(page)

    await expect(page.locator('#processo .proc-radio')).toHaveCount(4)

    const readStepper = () =>
      page.evaluate(() => {
        const radios = Array.from(document.querySelectorAll<HTMLInputElement>('#processo .proc-radio'))
        const panels = Array.from(document.querySelectorAll<HTMLElement>('#processo .proc-panel'))
        return {
          checked: radios.map((r) => (r.checked ? 1 : 0)),
          displays: panels.map((p) => getComputedStyle(p).display),
        }
      })

    /*
      FS-017 (fase-17-processo-reformulacao.md): a seção passou do padrão E
      (4/8) para o padrão F "palco horizontal" — o painel da etapa ativa agora
      é `display:grid` (meta em linha cheia + numeral/título + descrição na
      coluna vizinha) em vez de `block`, e os demais continuam `none`.
      `visible()` normaliza qualquer display ≠ none para 'block', preservando a
      forma e a cobertura do assert original (exatamente UM painel visível,
      sempre o da etapa marcada); o assert explícito logo abaixo documenta o
      novo markup do palco.
    */
    const visible = (displays: string[]) =>
      displays.map((d) => (d === 'none' ? 'none' : 'block'))

    // estado inicial: etapa 01 marcada, só o painel 1 visível (CSS :checked)
    const initial = await readStepper()
    expect(initial.checked).toEqual([1, 0, 0, 0])
    expect(visible(initial.displays)).toEqual(['block', 'none', 'none', 'none'])
    // FS-017: painel ativo renderiza como grid (faixas do palco), não block
    expect(initial.displays[0]).toBe('grid')

    // teclado: radio group nativo move a seleção com setas (radio focado)
    await page.evaluate(() => document.getElementById('proc-1')?.focus())
    await page.keyboard.press('ArrowRight')
    await expect.poll(async () => (await readStepper()).checked).toEqual([0, 1, 0, 0])
    expect(visible((await readStepper()).displays)).toEqual(['none', 'block', 'none', 'none'])

    // dispatch direto de clique no radio 4 → só o painel 4 aparece
    await page.evaluate(() => (document.getElementById('proc-4') as HTMLInputElement).click())
    await expect.poll(async () => (await readStepper()).checked).toEqual([0, 0, 0, 1])
    expect(visible((await readStepper()).displays)).toEqual(['none', 'none', 'none', 'block'])
  })

  test('11) FAQ: acordeão 1-aberto — abrir fecha os demais', async ({ page }) => {
    await gotoHome(page)
    await waitForLuxuryInit(page)

    const faqState = () =>
      page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('#faq .faq-q'))
        return buttons.map((_, i) => {
          const btn = document.querySelectorAll('#faq .faq-q')[i]
          const panel = document.getElementById(`faq-a-${i + 1}`)
          return {
            expanded: btn.getAttribute('aria-expanded') === 'true',
            panelHidden: !panel || panel.hasAttribute('hidden'),
          }
        })
      })

    // 6 FAQS exatos (FS-011.4); o primeiro nasce aberto (contrato do protótipo)
    const initial = await faqState()
    expect(initial).toHaveLength(6)
    expect(initial.filter((s) => s.expanded)).toHaveLength(1)
    expect(initial[0].expanded).toBe(true)
    initial.forEach((s, i) => expect(s.panelHidden, `painel ${i + 1}`).toBe(i !== 0))

    const clickFaq = (index: number) =>
      page.evaluate((i) => (document.querySelectorAll('#faq .faq-q')[i] as HTMLElement).click(), index)

    // abrir o item 3 fecha o item 1 (1-aberto = mutualmente exclusivo)
    await clickFaq(2)
    await expect.poll(async () => (await faqState()).filter((s) => s.expanded)).toHaveLength(1)
    const afterThird = await faqState()
    expect(afterThird[2].expanded).toBe(true)
    afterThird.forEach((s, i) => expect(s.panelHidden, `painel ${i + 1}`).toBe(i !== 2))

    // clicar no item aberto fecha tudo (comportamento do protótipo)
    await clickFaq(2)
    await expect.poll(async () => (await faqState()).filter((s) => s.expanded)).toHaveLength(0)
    const afterClose = await faqState()
    afterClose.forEach((s, i) => expect(s.panelHidden, `painel ${i + 1}`).toBe(true))
  })

  test('12) tema: toggle html.dark ↔ html.light persiste no localStorage', async ({ page }) => {
    await gotoHome(page)

    const themeState = () =>
      page.evaluate(() => ({
        dark: document.documentElement.classList.contains('dark'),
        colorScheme: document.documentElement.style.colorScheme,
        stored: window.localStorage.getItem('filipestudio-theme'),
      }))

    const clickToggle = () =>
      page.evaluate(() => {
        const btn = document.querySelector<HTMLButtonElement>('button[aria-label^="Ativar modo"]')
        btn?.click()
      })

    // padrão: dark (index.html + getInitialTheme do useTheme)
    await expect.poll(themeState).toEqual({ dark: true, colorScheme: 'dark', stored: 'dark' })

    // toggle → light
    await clickToggle()
    await expect.poll(themeState).toEqual({ dark: false, colorScheme: 'light', stored: 'light' })

    // persistência: reload mantém light (localStorage → getInitialTheme)
    await page.reload()
    await page.waitForSelector('main#conteudo')
    await expect.poll(themeState).toEqual({ dark: false, colorScheme: 'light', stored: 'light' })

    // volta para dark
    await clickToggle()
    await expect.poll(themeState).toEqual({ dark: true, colorScheme: 'dark', stored: 'dark' })
  })

  test('13) H2 bicolor: gradiente (fill) aplicado em .luxury-line:nth-of-type(2)', async ({ page }) => {
    await enableComputedStyles(page)
    await gotoHome(page)
    await waitForLuxuryInit(page)

    // A intro (BrandIntro) trava o scroll (`html.brand-intro-lock` → overflow
    // hidden) até o splash terminar (≤1.2s + fail-safe 3s). Rolar durante a
    // trava é engolido e o ScrollTrigger do título nunca dispara (flakiness sob
    // carga em headless) — aguardar a liberação torna o scroll determinístico.
    await page.waitForFunction(() => !document.documentElement.classList.contains('brand-intro-lock'))

    const titleHandle = await page.locator('#portfolio-title').elementHandle()
    expect(titleHandle).toBeTruthy()
    await page.evaluate((el: HTMLElement) => {
      el.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior })
      // dispatch direto (padrão dos testes 2–8): atualiza o ScrollTrigger mesmo
      // se o scroll nativo for atrasado pelo compositor em headless sob carga
      window.dispatchEvent(new Event('scroll'))
    }, titleHandle)

    // split do setupTitleMasks: .luxury-title > .luxury-line > .luxury-line__in
    // (expect.poll = polling por intervalo no Node, independente de rAF)
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const t = document.getElementById('portfolio-title')
            return !!t && t.dataset.split === '1' && t.querySelectorAll('.luxury-line').length >= 2
          }),
        { timeout: 15_000 },
      )
      .toBe(true)

    // ScrollTrigger onEnter (top 88%) adiciona .is-visible → fill 0→100%
    await expect
      .poll(
        () =>
          page.evaluate(
            () => document.getElementById('portfolio-title')?.classList.contains('is-visible') === true,
          ),
        { timeout: 15_000 },
      )
      .toBe(true)

    const line2 = await page.evaluate(() => {
      const el = document.querySelector<HTMLElement>(
        '#portfolio-title .luxury-line:nth-of-type(2) .luxury-line__in',
      )
      if (!el) return null
      const cs = getComputedStyle(el)
      return {
        backgroundImage: cs.backgroundImage,
        backgroundClip: cs.backgroundClip,
        color: cs.color,
      }
    })
    if (!line2) throw new Error('linha 2 (.luxury-line:nth-of-type(2)) não encontrada no H2')
    expect(line2.backgroundImage).not.toBe('none')
    expect(line2.backgroundImage).toContain('gradient')
    expect(line2.backgroundClip).toBe('text')
    expect(line2.color).toBe('rgba(0, 0, 0, 0)')

    // fill completo após a transição 0.7s (background-size 0% → 100%)
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const el = document.querySelector(
              '#portfolio-title .luxury-line:nth-of-type(2) .luxury-line__in',
            )
            return !!el && getComputedStyle(el).backgroundSize === '100% 100%'
          }),
        { timeout: 15_000 },
      )
      .toBe(true)
  })

  test('14) CLS guard: toda <img> da home declara width/height', async ({ page }) => {
    await gotoHome(page)

    const report = await page.evaluate(() => {
      const imgs = Array.from(document.images)
      return {
        total: imgs.length,
        missing: imgs
          .filter((img) => {
            const w = img.getAttribute('width')
            const h = img.getAttribute('height')
            return !(w && h && Number(w) > 0 && Number(h) > 0)
          })
          .map((img) => img.getAttribute('src') ?? '(sem src)'),
      }
    })
    expect(report.total).toBeGreaterThan(0)
    expect(report.missing).toEqual([])
  })
  // FS-019 — regressão do acordeão "sumindo" ao clicar: o React reescreve o
  // atributo `class` do `.faq-item` a cada re-render (o prop é
  // `faq-item${open ? ' open' : ''} reveal`), e a string do prop não contém
  // `is-visible` — injetado por fora pelo IntersectionObserver do
  // useScrollReveal. Resultado do bug: o item perdia o reveal, ficava com
  // opacity:0 e seguia ocupando layout (título + resposta viravam área vazia).
  // Este caso cobre a VISIBILIDADE (o teste 11 cobre só o estado aria/hidden).
  test(
    '15) FAQ accordion: expandir mantém tópico visível + resposta aparece + sem espaço vazio + 1-aberto + cliques rápidos',
    async ({ page }) => {
      // getComputedStyle precisa do CSS real: em dev a CSP (style-src 'self')
      // bloqueia os <style> inline do Vite — mesmo bypass do teste 13.
      await enableComputedStyles(page)
      await gotoHome(page)
      await waitForLuxuryInit(page)

      // a intro trava o scroll até o splash terminar (guarda do teste 13)
      await page.waitForFunction(() => !document.documentElement.classList.contains('brand-intro-lock'))

      // revela os 6 itens (scroll reveal) antes de asserir visibilidade:
      // varre a lista em passos de 120px cedendo um frame por passo, para que
      // cada item cruze o viewport e o IntersectionObserver dispara.
      const revealFaqItems = async () => {
        for (let pass = 0; pass < 5; pass++) {
          const revealed = await page.evaluate(
            () => document.querySelectorAll('#faq .faq-item.is-visible').length,
          )
          if (revealed === 6) break
          await page.evaluate(async () => {
            const list = document.querySelector('.faq-list') as HTMLElement
            const rect = list.getBoundingClientRect()
            const top = rect.top + window.scrollY - 150
            const bottom = top + rect.height + 150
            for (let y = top; y <= bottom; y += 120) {
              window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior })
              await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
            }
          })
          await page.waitForTimeout(400)
        }
        // volta o topo da lista para a viewport (teclado/click nos itens)
        await page.evaluate(() => {
          const list = document.querySelector('.faq-list') as HTMLElement
          list?.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior })
        })
      }
      await revealFaqItems()
      await expect
        .poll(() => page.evaluate(() => document.querySelectorAll('#faq .faq-item.is-visible').length), {
          timeout: 20_000,
        })
        .toBe(6)

      const readFaq = () =>
        page.evaluate(() => {
          const st = Array.from(document.querySelectorAll('#faq .faq-item')).map((it, i) => {
            const cs = getComputedStyle(it)
            const r = it.getBoundingClientRect()
            const btn = it.querySelector('.faq-q') as HTMLButtonElement
            const h3 = it.querySelector('h3')
            const hcs = h3 ? getComputedStyle(h3) : null
            const hr = h3 ? h3.getBoundingClientRect() : null
            const panel = it.querySelector('.faq-a') as HTMLElement | null
            const pcs = panel ? getComputedStyle(panel) : null
            const pr = panel ? panel.getBoundingClientRect() : null
            return {
              i,
              cls: it.className,
              itemOpacity: cs.opacity,
              h3Opacity: hcs ? hcs.opacity : '0',
              h3Box: hr ? Math.round(hr.height) : 0,
              open: btn.getAttribute('aria-expanded') === 'true',
              panelOpen: !!panel && !panel.hasAttribute('hidden'),
              panelOpacity: pcs ? pcs.opacity : '0',
              panelH: pr ? Math.round(pr.height) : 0,
              // "espaço vazio": ocupa layout sem pintar nada
              ghost: cs.opacity === '0' && r.height > 0,
            }
          })
          return {
            st,
            openIdx: st.findIndex((s) => s.open),
            openCount: st.filter((s) => s.open).length,
            panelCount: st.filter((s) => s.panelOpen).length,
            ghosts: st.filter((s) => s.ghost).map((s) => s.i),
            notVisible: st.filter((s) => s.itemOpacity !== '1').map((s) => s.i),
            h3Hidden: st.filter((s) => s.h3Opacity !== '1' || s.h3Box === 0).map((s) => s.i),
          }
        })

      const clickFaq = (index: number) =>
        page.evaluate((i) => (document.querySelectorAll('#faq .faq-q')[i] as HTMLElement).click(), index)

      /** espera o item `idx` aberto, 1-aberto global e o painel com opacity 1 */
      const waitForOpen = (idx: number) =>
        expect
          .poll(
            async () => {
              const s = await readFaq()
              return JSON.stringify({ openIdx: s.openIdx, panelCount: s.panelCount, panelOpacity: s.st[idx].panelOpacity })
            },
            { timeout: 20_000 },
          )
          .toBe(JSON.stringify({ openIdx: idx, panelCount: 1, panelOpacity: '1' }))

      const expectNoGhost = (label: string, s: Awaited<ReturnType<typeof readFaq>>) => {
        expect(s.ghosts, `${label}: item ocupando espaço sem pintar`).toEqual([])
        expect(s.notVisible, `${label}: tópico invisível`).toEqual([])
        expect(s.h3Hidden, `${label}: pergunta (h3) invisível`).toEqual([])
      }

      // ── abrir cada uma das 6 perguntas individualmente ──────────────────
      for (let i = 0; i < 6; i++) {
        let s = await readFaq()
        if (s.st[i].open) {
          await clickFaq(i)
          await expect.poll(async () => (await readFaq()).openCount, { timeout: 20_000 }).toBe(0)
        }
        await clickFaq(i)
        await waitForOpen(i)
        s = await readFaq()
        expectNoGhost(`abrir pergunta ${i + 1}`, s)
        expect(s.st[i].panelH, `abrir pergunta ${i + 1}: resposta com altura`).toBeGreaterThan(0)
        // o reveal do item aberto e do que perdeu o `open` sobrevive ao re-render
        expect(s.st[i].cls, `item ${i + 1} perdeu .is-visible`).toContain('is-visible')
        const prev = (i + 5) % 6
        expect(s.st[prev].cls, `item ${prev + 1} perdeu .is-visible ao fechar`).toContain('is-visible')
      }

      // ── 10 cliques rápidos e consecutivos ───────────────────────────────
      const seq = [0, 3, 1, 5, 2, 4, 0, 3, 5, 1]
      for (const i of seq) await clickFaq(i)
      await waitForOpen(seq[seq.length - 1])
      let s = await readFaq()
      expectNoGhost('10 cliques rápidos', s)
      expect(s.openCount).toBe(1)

      // ── fechar (clicar no item aberto) → nenhum painel ocupando espaço ──
      await clickFaq(seq[seq.length - 1])
      await expect.poll(async () => (await readFaq()).openCount, { timeout: 20_000 }).toBe(0)
      s = await readFaq()
      expect(s.panelCount).toBe(0)
      expectNoGhost('fechar', s)
      expect(s.st.every((x) => x.panelH === 0), 'painel fechado ainda ocupando altura').toBe(true)

      // ── teclado nativo do <button>: Enter e Espaço (a11y FS-011.4) ─────
      await page.evaluate(() => (document.querySelectorAll('#faq .faq-q')[2] as HTMLElement).focus())
      await page.keyboard.press('Enter')
      await waitForOpen(2)
      await page.evaluate(() => (document.querySelectorAll('#faq .faq-q')[4] as HTMLElement).focus())
      await page.keyboard.press('Space')
      await waitForOpen(4)
      await expect.poll(() => page.evaluate(() => document.activeElement?.id), { timeout: 5_000 }).toBe('faq-q-5')
      s = await readFaq()
      expectNoGhost('teclado', s)
    },
    { timeout: 180_000 },
  )
})
