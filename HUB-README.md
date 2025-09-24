# Sustainability Hub SUPSI 2026

**La casa della sostenibilità** - Piattaforma web completa per gestire eventi sostenibilità tutto l'anno.

## 🌱 Panoramica Progetto

Sustainability Hub è una piattaforma moderna e completa che sostituisce il semplice sito evento con un vero **hub della sostenibilità** SUPSI, operativo tutto l'anno con eventi, community e team organizzativo.

## 📁 Struttura File

```
settimana-sostenibilita-ticino/
├── hub-index.html          # Homepage principale
├── hub-reweek.html         # Pagina RE-Week 2026
├── hub-team.html           # Pagina Team con organigramma
├── hub-contacts.html       # Contatti e FAQ
├── hub-styles.css          # Design system completo
├── hub-script.js           # Funzionalità interattive
└── HUB-README.md           # Documentazione (questo file)
```

## 🎨 Design System

### Colori Principali
- **Primary**: `#00D4AA` (Verde moderno)
- **Secondary**: `#6C5CE7` (Blu viola)
- **Accent**: `#FF6B6B` (Rosso/Rosa)
- **Gradienti**: Verde → Blu → Azzurro

### Typography
- **Font**: Inter (Google Fonts)
- **Pesi**: 300, 400, 500, 600, 700, 800, 900

### Grid System
- **Max-width**: 1280px
- **Breakpoints**: 768px (tablet), 1024px (desktop)
- **Spacing**: Sistema 8px

## 🚀 Funzionalità Implementate

### Homepage (`hub-index.html`)
✅ Hero section full-screen con gradiente dinamico
✅ Stats counter animati (eventi, studenti, partner)
✅ Timeline eventi 2026 con cards moderne
✅ Countdown animato per RE-Week 2026
✅ Community section (WhatsApp, Newsletter, Social)
✅ Sezione partner con benefits

### RE-Week 2026 (`hub-reweek.html`)
✅ Eventi in pianificazione (6 placeholder cards)
✅ Carousel eventi 2024 (ispirazione dal passato)
✅ Form proposta eventi completo
✅ Character counter per textarea

### Team (`hub-team.html`)
✅ **Organigramma a matrice interattivo** (30 celle)
  - 5 dipartimenti × 6 ruoli
  - Stati: Libero/Occupato/Urgente
  - Click su cella → Modal con dettagli ruolo
✅ Form candidatura in modal
✅ Sezione testimonials
✅ Benefits grid (ECTS, formazione, network, etc.)

### Contatti & FAQ (`hub-contacts.html`)
✅ FAQ accordion funzionante
✅ Form contatto generale
✅ Informazioni campus SUPSI
✅ Privacy policy e note legali

## 💡 JavaScript - Funzionalità

### Interazioni Implementate
1. **Hamburger menu** mobile funzionante
2. **Counter animati** per statistiche
3. **Countdown RE-Week 2026** in tempo reale
4. **Carousel automatico** eventi 2024 (5 secondi)
5. **Organigramma interattivo** con modal dettagli
6. **FAQ accordion** click per espandere
7. **Form validation** e submit handlers
8. **Smooth scroll** per anchor links
9. **Header hide on scroll down** show on scroll up
10. **Intersection Observer** per animazioni on scroll
11. **Language toggle** IT/EN (preparato)

## 🎯 SEO & Accessibilità

### Meta Tags
- Description, keywords, Open Graph implementati
- Title ottimizzati per ogni pagina

### Accessibility
- Alt text per SVG icons
- ARIA labels per social links
- Semantic HTML5
- Focus states visibili
- Contrast ratio adeguato

## 📱 Responsive Design

### Mobile First
- Hamburger menu su mobile
- Cards stack verticale
- Stats counter verticale
- Griglia → singola colonna

### Breakpoints
- `< 768px`: Mobile
- `768px - 1024px`: Tablet
- `> 1024px`: Desktop

## 🔄 Integrazioni Future

### Da Implementare
- [ ] **Mailchimp/ConvertKit** per newsletter
- [ ] **WhatsApp Business API** per community link
- [ ] **Instagram API** per feed embedded
- [ ] **Google Calendar** sync eventi
- [ ] **Form backend** (Formspree/EmailJS)
- [ ] **Analytics** (Google Analytics 4)
- [ ] **CMS headless** per gestione contenuti

## 🌐 Multi-Language Support

Struttura preparata per:
- **IT** (Italiano - default)
- **EN** (English)
- **DE** (Deutsch)

Variabili già nel JavaScript, necessita traduzione contenuti.

## 🎮 Gamification Elements

### Preparati per Future
- Badge digitali per team members
- Sustainability Score personale
- Leaderboard contributori
- Easter eggs nascosti

## 📊 Performance

### Ottimizzazioni
- CSS/JS minificabili
- Lazy loading preparato
- Smooth animations (60fps)
- Core Web Vitals ready

## 🔧 Come Usare

1. **Aprire `hub-index.html`** nel browser
2. **Navigare** tra le pagine
3. **Testare** le interazioni:
   - Click su organigramma
   - Submit form
   - FAQ accordion
   - Mobile menu

## 📝 Prossimi Step

### Immediate
1. Sostituire placeholder loghi partner con reali
2. Aggiungere foto team reali
3. Collegare form a backend email
4. Creare QR code WhatsApp reale

### Future Features
1. Admin panel per gestione contenuti
2. Sistema prenotazione eventi
3. Dashboard analytics team
4. Badge system gamificato
5. Multi-language completo

## 🎨 Personalizzazione Colori

Per cambiare il tema, modifica le CSS variables in `:root`:

```css
:root {
    --primary: #00D4AA;     /* Verde principale */
    --secondary: #6C5CE7;   /* Viola */
    --accent: #FF6B6B;      /* Rosso accento */
}
```

## 📞 Supporto

**Email**: info@sustainabilityhub.supsi.ch
**WhatsApp Community**: [Link da aggiungere]
**Instagram**: [@supsi_sustainablity_hub](https://www.instagram.com/supsi_sustainablity_hub/)

---

## 🏆 Crediti

**Progettato e sviluppato per**: SUPSI - Università della Svizzera Italiana
**Evento principale**: RE-Week 2026 (9-13 Marzo)
**Mission**: Costruire un futuro sostenibile insieme

---

**© 2026 Sustainability Hub - SUPSI. Tutti i diritti riservati.**