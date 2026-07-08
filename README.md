A privacy focused, client-side web application for generating scan-to-connect WiFi QR codes without exposing network credentials to third-party servers.

# WiFi QR Code Generator 📶📱
A highly responsive, single-file web application that generates MECARD-formatted WiFi connection QR codes. Built utilizing Vanilla JavaScript, Tailwind CSS, and the qr-code-styling API, it allows users to instantly create, download (PNG/SVG), and print beautifully formatted guest network cards. All generation happens locally in the browser, ensuring zero data transmission and maximum security.

---

## 📂 Project Structure
```
WiFi_QRCode/
├── index.html          # Core application (HTML template, Tailwind UI, & JS logic)
├── qr-logic.test.js    # Vitest unit tests for the validation/formatting logic
├── package.json        # Dev-only manifest; declares Vitest as a devDependency for testing
├── package-lock.json   # Locked dependency versions, for reproducible test installs
├── README.md           # Project documentation
└── .gitignore          # Ignores node_modules/, OS junk files, and editor settings
```

Note that `package.json` and its lockfile exist solely to support the test suite below -- the deployed app itself (`index.html`) has no dependencies and no build step.

---

## ⚙️ Features
* **100% Client-Side Processing:** Guarantees absolute privacy. Network credentials never leave the user's device and are never sent to a database.
* **Smart Live Preview:** Features a debounced input listener that updates the QR code canvas in real-time as the user types, without hammering the renderer on every keystroke.
* **Robust Validation:** Distinguishes between hard errors (a missing SSID, nothing to encode) and soft warnings (a WPA password too short to actually authenticate), so the code still previews live while guiding the user toward a working configuration.
* **Smart Memory Caching:** Implements browser `localStorage` to remember your last network's SSID, security protocol, and theme preference, removing the friction of re-typing data for repeat visits (while intentionally dropping passwords for security). URL parameters take priority over the cache when both are present -- see "URL Parameter Pre-filling" below.
* **Batch Print Queue:** Lets users add multiple network configurations to an in-memory queue (with automatic duplicate detection), review/trim the queue via "Remove Last" and "Clear All" controls, then print the entire batch as a clean grid of guest cards that flows across as many standard 8.5x11 pages as needed.
* **Embedded QR Logo:** Overlays a small WiFi icon at the center of the generated code, rendered from an inline SVG data URI (rather than an external image) specifically to avoid the "tainted canvas" CORS restrictions that browsers impose on cross-origin images inside a `<canvas>`. Error correction is set to Quartile (`'Q'`) as a deliberate middle ground -- dense enough to survive the logo overlay, but not so dense that older phone cameras struggle to autofocus on it.
* **URL Parameter Pre-filling:** Power users can generate template links by appending URL parameters -- `ssid`, `type`, `hidden`, and `password` are all supported (e.g., `?ssid=GuestNet&type=WPA`). Note that a password passed this way lands in the browser's URL and history, unlike typing it directly into the form, so it's best reserved for open or low-sensitivity networks.
* **Dynamic Theming:** Instantly swap between a high-contrast dark "schematic" UI and a clean light mode using CSS variable overrides, accessible via a persistent toggle button.
* **Mobile-First Input Handling:** Disables autocorrect, autocapitalize, and spellcheck on the SSID/password fields (mobile keyboards otherwise try to "fix" network names), and explicitly prevents the on-screen keyboard's Return/Go key from triggering an accidental page reload.
* **Multi-Format Exporting:** Users can download their codes as infinitely scalable SVGs or precisely padded PNGs.

---

## 🚀 How to Run

### 1. Clone this repository
```
git clone https://github.com/SVerma2696/WiFi_QRCode.git
cd WiFi_QRCode
```

### 2. Run Locally in VS Code
Because this project has zero backend dependencies, there is no build step required to use the app itself. Simply open the file:
* **Option A:** Right-click `index.html` in your VS Code explorer and select **Open with Live Server** (if you have the extension installed).
* **Option B:** Run it directly from your VS Code terminal:
```
start index.html
```

The app also includes meta tags (`apple-mobile-web-app-capable`, etc.) that let it be added to a mobile home screen with a fullscreen appearance. This is a lightweight, presentation-only enhancement -- there's no manifest file or service worker behind it, so it isn't a true installable/offline PWA.

---

## 🧪 Testing

The core validation and formatting logic (SSID/password checks, MECARD string escaping) is covered by a small [Vitest](https://vitest.dev/) suite in `qr-logic.test.js`. This requires Node.js and npm, but only for running tests locally -- it has no bearing on how the deployed site works for end users.

```
npm install
npm test
```

This installs Vitest as a dev dependency (see `package.json`) and runs all test suites. A passing run currently reports 9/9 tests passing across MECARD escaping, SSID validation, and password validation.

**Known limitation:** `qr-logic.test.js` currently re-declares its own copies of `escapeMecardString`, `getHardError`, and `getSoftWarning` rather than importing them from `index.html`, since a plain `<script>` tag isn't an ES module. This means the two copies can drift out of sync if the logic in `index.html` changes without a matching update here -- worth keeping in mind when editing either file.

---

## 🔌 System Integrations (Data Flow)

### Persistent Storage
The application utilizes sandboxed browser LocalStorage to enhance user experience without compromising security.
* `wifi_qr_prefs` -> Caches SSID, Encryption Type, and Hidden Status. *(Passwords are strictly excluded).*
* `theme` -> Caches the user's Dark/Light mode preference.

On load, explicit URL parameters take priority, falling back to the LocalStorage cache, and finally to sensible defaults (e.g., `WPA` for security type) if neither is present.

### Protocol Compilation
The application engine constructs strings targeting mobile OS network managers using the [MECARD format](https://en.wikipedia.org/wiki/MeCard_(QR_code)):
```
WIFI:S:<SSID>;T:<WPA|WEP|nopass>;P:<Password>;H:<true|false>;;
```
*(Special characters like `;`, `:`, and `\` are actively escaped using regex during compilation to prevent premature string termination).*

---

## 📘 Concepts Demonstrated
* **Event Debouncing:** Preventing function execution spam and canvas repainting during high-frequency user typing.
* **Advanced CSS Styling:** Utilizing Tailwind CSS for rapid prototyping alongside dynamic CSS root variables for instant theming.
* **DOM Manipulation & Batch Queuing:** Managing an in-memory queue (with deduplication) to dynamically construct and render a multi-component print layout.
* **CORS-Safe Asset Embedding:** Using inline SVG data URIs instead of external image references to avoid canvas security restrictions.
* **Defensive Programming:** Preventing race conditions between UI interactions using synchronized pre-action flushes.
* **Mobile UX Hardening:** Disabling unwanted mobile keyboard behaviors (autocorrect/autocapitalize) and guarding against accidental form submission on virtual "Go" keys.
* **Non-Blocking UI Feedback:** A lightweight, reusable pattern for confirming user actions (copy/download/queue) without a toast-notification library.
* **Automated Testing:** Validating pure logic functions with Vitest, independent of the DOM or browser environment.

---

## 🔧 Requirements
* **To use the app:** A modern web browser (Chrome, Firefox, Safari, Edge) and an active internet connection (only required once on initial load to fetch the Tailwind and QR Code libraries via CDN).
* **To run the test suite:** Node.js and npm installed locally.

---

## 🎓 Credits & Professional Attributions
This project was developed to demonstrate frontend DOM manipulation and client-side security practices.
* **Styling Engine:** [Tailwind CSS](https://tailwindcss.com/).
* **QR Generation Library:** [qr-code-styling by denocoeur](https://qr-code-styling.com/).
* **Header/Favicon Logo:** [Clipart Library](https://clipart-library.com/clipart/wifi-logo-clipart-18.htm). *(Note: the small WiFi icon embedded inside each generated QR code is a separate, hand-drawn inline SVG, not this asset -- see "Embedded QR Logo" above.)*
* **Testing Framework:** [Vitest](https://vitest.dev/).