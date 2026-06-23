// Copyright 2026, Pulumi Corporation. All rights reserved.

/**
 * Convert a hex color string to an RGB triple.
 * @param {string} hexString
 * @returns {[number, number, number]}
 */
function hexToRGB(hexString) {
    const color = hexString.replace(/#/g, "");
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    return [r, g, b];
}

/**
 * Convert a Tailwind-style color object to comma-separated RGB strings for SCSS theme().
 * @param {Record<string, string>} tailwindColorObject
 * @returns {Record<string, string>}
 */
function colorFamilyToRGB(tailwindColorObject) {
    return Object.keys(tailwindColorObject).reduce((output, key) => {
        output[key] = hexToRGB(tailwindColorObject[key]).join(",");
        return output;
    }, {});
}

module.exports = {
    hexToRGB,
    colorFamilyToRGB,
};
