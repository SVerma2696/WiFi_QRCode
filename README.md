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
* **Smart Memory Caching:** Implements browser `localStorage` to remember your last network's SSID, security protocol, and theme preference, removing the friction of re-typing data for repeat visits (while intentionally dropping passwords for security).
* **Grid Batch Printing:** Engineers a `@media print` layout that lets users queue multiple network configurations into memory and print them as a clean grid of guest cards, flowing across as many standard 8.5x11 pages as the queue requires.
* **Embedded QR Logos:** Automatically overlays a central Wi-Fi logo on the generated code, utilizing a dynamically elevated Error Correction Level ('H') to maintain perfect scannability.
* **URL Parameter Pre-filling:** Power users can generate template links by appending URL parameters -- `ssid`, `type`, `hidden`, and `password` are all supported (e.g., `?ssid=GuestNet&type=WPA`). Note that a password passed this way lands in the browser's URL and history, unlike typing it directly into the form, so it's best reserved for open or low-sensitivity networks.
* **Dynamic Theming:** Instantly swap between a high-contrast dark "schematic" UI and a clean light mode using CSS variable overrides.
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
* **DOM Manipulation & Batch Queuing:** Managing an in-memory queue to dynamically construct and render a multi-component print layout.
* **Defensive Programming:** Preventing race conditions between UI interactions using synchronized pre-action flushes.
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
* **App Logo:** [Clipart Library](https://clipart-library.com/clipart/wifi-logo-clipart-18.htm)
* **Testing Framework:** [Vitest](https://vitest.dev/).