// Init do Google Analytics fora do index.html para que a CSP possa ser
// estrita em script-src (sem 'unsafe-inline').
window.dataLayer = window.dataLayer || []
function gtag() {
  dataLayer.push(arguments)
}
gtag('js', new Date())
gtag('config', 'G-3FSGBG9RPX')
