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
