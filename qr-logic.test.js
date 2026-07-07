/**
 * @fileoverview Unit tests for the core logic and validation of the WiFi QR Generator.
 * Note: These tests target the pure functions embedded in index.html.
 * To run: `npm install -D vitest` then `npx vitest qr-logic.test.js`
 */

import { describe, it, expect } from 'vitest';

// --- Pure Functions Extracted for Testing ---
const escapeMecardString = (str) => str.replace(/([\\;:,])/g, "\\$1");

function getHardError(ssid) {
    if (!ssid) return "Network Name (SSID) is required.";
    if (ssid.length > 32) return "Network name is too long (32 characters max).";
    return null;
}

function getSoftWarning(password, encryption) {
    if (encryption === 'WPA' && password) {
        if (password.length < 8) return "WPA passwords must be at least 8 characters.";
        if (password.length > 63) return "WPA passwords must be 63 characters or fewer.";
    }
    if (encryption === 'WEP' && password && ![5, 10, 13, 26].includes(password.length)) {
        return "WEP keys are usually 5 or 13 characters (or 10/26 hex digits).";
    }
    return null;
}

// --- Test Suites ---
describe('MECARD Data Escaping', () => {
    it('escapes semicolons and colons properly', () => {
        expect(escapeMecardString('My:WiFi;Network')).toBe('My\\:WiFi\\;Network');
    });

    it('escapes backslashes properly', () => {
        expect(escapeMecardString('P@ss\\word')).toBe('P@ss\\\\word');
    });

    it('ignores alphanumeric characters', () => {
        expect(escapeMecardString('StandardPass123')).toBe('StandardPass123');
    });
});

describe('SSID Validation (Hard Errors)', () => {
    it('rejects empty SSIDs', () => {
        expect(getHardError('')).toBe("Network Name (SSID) is required.");
    });

    it('rejects SSIDs exceeding 32 bytes (WiFi spec limit)', () => {
        const longSSID = 'A'.repeat(33);
        expect(getHardError(longSSID)).toBe("Network name is too long (32 characters max).");
    });

    it('returns null for valid SSIDs', () => {
        expect(getHardError('Starbucks_Guest')).toBeNull();
    });
});

describe('Password Validation (Soft Warnings)', () => {
    it('catches WPA passwords that are too short', () => {
        expect(getSoftWarning('short', 'WPA')).toBe("WPA passwords must be at least 8 characters.");
    });

    it('allows valid WPA passwords', () => {
        expect(getSoftWarning('StrongPassword123!', 'WPA')).toBeNull();
    });

    it('ignores password validation if no encryption is required', () => {
        // Technically invalid, but the app drops the password entirely during MECARD compilation if type=nopass
        expect(getSoftWarning('short', 'nopass')).toBeNull();
    });
});