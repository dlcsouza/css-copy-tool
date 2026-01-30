# 🚀 Guia: Publicar CSS Copy Tool na Chrome Web Store

## Passo 1 — Criar conta de desenvolvedor (se ainda não tem)

1. Acesse: https://chrome.google.com/webstore/devconsole/register
2. Faça login com sua conta Google
3. Pague a taxa única de **$5 USD**
4. Aceite os termos

## Passo 2 — Upload da Extensão

1. Acesse: https://chrome.google.com/webstore/devconsole
2. Clique em **"New Item"** (Novo Item)
3. Faça upload do arquivo: `css-copy-tool-v1.0.0.zip` (12KB, já está no workspace)
4. Preencha os campos:

### Informações do Listing

| Campo | Valor |
|-------|-------|
| **Name** | CSS Copy Tool - One-Click CSS Copying |
| **Short Description** | Instantly copy CSS from any element. Hover, click, copy. Supports CSS, Tailwind, and inline styles. Lightweight alternative to CSS Scan. |
| **Category** | Developer Tools |
| **Language** | English |

### Descrição Detalhada
Copie do arquivo `marketing/chrome-web-store.md` no repo, ou use:

```
🎨 CSS Copy Tool - The fastest way to copy CSS from any website.

How it works:
1. Click the extension icon (or press Alt+Shift+C)
2. Hover over any element
3. Click to copy its CSS

Features:
✅ One-click CSS copying
✅ Multiple formats: Raw CSS, Tailwind classes, Inline styles
✅ Smart element highlighting
✅ Keyboard shortcut (Alt+Shift+C)
✅ Beautiful dark theme UI
✅ Lightweight (under 50KB)
✅ Works on any website

Perfect for:
• Developers recreating designs
• Designers inspecting websites
• Anyone who needs CSS fast

Why CSS Copy Tool?
• Free and open source alternative to CSS Scan ($39+)
• More export formats (including Tailwind!)
• Privacy-first: no data collection

💡 Tip: Use Alt+Shift+C to quickly toggle the inspector on/off.
🔒 Privacy: Zero data collection. Works 100% offline.
```

### Assets Necessários
- **Icon 128x128** → já incluso no ZIP (`assets/icon-128.png`)
- **Screenshots** → Precisamos de pelo menos 1 screenshot (1280x800 ou 640x400)
  - Opção: abra a extensão no Chrome, use o inspector num site bonito, tire print
- **Promotional tile (opcional)** → 440x280 para destaque na store

### Pricing
- Escolha: **Free** (pra ganhar tração) ou **Paid** ($4.99)
- Recomendação: comece **free**, monetize com versão Pro depois

## Passo 3 — Submeter para Revisão

1. Preencha a **Privacy Policy** (pode ser um link pro GitHub: `https://github.com/dlcsouza/css-copy-tool/blob/main/LICENSE`)
2. Em "Single Purpose", descreva: "Inspect and copy CSS properties from web page elements"
3. Em "Permissions", justifique:
   - `activeTab`: "Needed to inspect CSS of elements on the current page"
   - `scripting`: "Needed to inject the CSS inspector into the page"
   - `clipboardWrite`: "Needed to copy CSS to clipboard"
4. Clique **Submit for Review**

⏱️ Review do Google leva **1-3 dias úteis**.

## O que eu preciso de você:

1. ✅ Criar a conta de dev no Chrome Web Store ($5)
2. ✅ Tirar **1-2 screenshots** da extensão funcionando (posso te ajudar com isso se quiser)
3. ✅ Fazer o upload do ZIP e preencher os campos acima
4. ✅ Submeter para review

O ZIP já está pronto em: `/home/ubuntu/clawd/css-copy-tool-v1.0.0.zip`
