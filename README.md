A privacy focused, client-side web application for generating scan-to-connect WiFi QR codes without exposing network credentials to third-party servers.

# WiFi QR Code Generator 📶📱
A highly responsive, single-file web application that generates MECARD-formatted WiFi connection QR codes. Built utilizing Vanilla JavaScript, Tailwind CSS, and the qr-code-styling API, it allows users to instantly create, download (PNG/SVG), and print beautifully formatted guest network cards. All generation happens locally in the browser, ensuring zero data transmission and maximum security.

---

## 📂 Project Structure
```
WiFi_QRCode/
├── index.html          # Core application (HTML template, Tailwind UI, & JS logic)
├── README.md           # Project documentation
└── .gitignore          # Git ignore rules for OS files, VS Code settings, and future-proofing (node_modules/.env)
```

---

## ⚙️ Features
* **100% Client-Side Processing:** Guarantees absolute privacy. Network credentials never leave the user's device and are never sent to a database.
* **Smart Live Preview:** Features a debounced input listener that updates the QR code canvas in real-time as the user types.
* **Advanced Print Layout:** Utilizes a dedicated `@media print` CSS stylesheet to dynamically strip away the UI and print a perfectly centered "Guest Card".
* **Multi-Format Exporting:** Users can download their codes as infinitely scalable SVGs or precisely padded PNGs.
* **Robust Validation:** Includes smart sanitization to escape special characters required by the MECARD protocol and warns users about invalid key lengths.

---

## 🚀 How to Run

### 1. Clone this repository
```
git clone https://github.com/SVerma2696/WiFi_QRCode.git
cd WiFi_QRCode
```

2. Run Locally in VS Code
Because this project has zero backend dependencies, there is no build step required. Simply open the file:
* **Option A:** Right-click `index.html` in your VS Code explorer and select **Open with Live Server** (if you have the extension installed).
* **Option B:** Run it directly from your VS Code terminal:
```
start index.html
```
---

## 🔌 System Integrations (Data Flow)

### Persistent Storage & Database
**None.** By design, this application is completely stateless. It operates entirely within the device's RAM and does not connect to any database, LocalStorage, or external API endpoints after the initial CDN load.

### State Flow
```
User Input (SSID/Password) -> JS Debouncer -> MECARD Formatter -> QR Canvas Renderer
```

---

## 📘 Concepts Demonstrated
* **Event Debouncing:** Preventing function execution spam during high-frequency user typing.
* **Advanced CSS Styling:** Utilizing Tailwind CSS for rapid prototyping and dedicated `@media print` queries for physical media formatting.
* **Protocol Formatting:** Programmatically constructing strings that trigger OS-level hardware reactions (iOS/Android Wi-Fi handlers).
* **Client-Side File Generation:** Leveraging the browser's Canvas APIs to create and download image files without a backend server.
* **Defensive Programming:** Preventing race conditions between UI interactions using synchronized pre-action flushes.

---

## 🔧 Requirements
* A modern web browser (Chrome, Firefox, Safari, Edge)
* An active internet connection (only required once on initial load to fetch the Tailwind and QR Code libraries via CDN)

---

## 🎓 Credits & Professional Attributions
This project was developed to demonstrate frontend DOM manipulation and client-side security practices.
* **Styling Engine:** [Tailwind CSS](https://tailwindcss.com/).
* **QR Generation Library:** [qr-code-styling by denocoeur](https://qr-code-styling.com/).
* **App Logo:** [Clipart Library](https://clipart-library.com/clipart/wifi-logo-clipart-18.htm)