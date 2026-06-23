// Copyright 2026, Pulumi Corporation. All rights reserved.

/**
 * Build Tailwind v2 theme color maps from pulumi.com (www) token JSON.
 * Preserves the existing docs/marketing palette exactly — no PDS cloud palette migration yet.
 */

const { colorFamilyToRGB } = require("./color-utils");

/**
 * @param {import("../tokens/www.json")["global"]} global
 * @param {typeof import("tailwindcss/defaultTheme")} defaultTheme
 */
function buildWwwColorMaps(global, defaultTheme) {
    const brand = {
        yellow: global.colors.brand.yellow.value,
        salmon: global.colors.brand.salmon.value,
        fuchsia: global.colors.brand.fuchsia.value,
        purple: global.colors.brand.purple.value,
        violet: global.colors.brand.violet.value,
        blue: global.colors.brand.blue.value,
    };

    const white = defaultTheme.colors.white;
    const black = defaultTheme.colors.black;
    const transparent = defaultTheme.colors.transparent;

    const readScale = (family) =>
        Object.keys(global.colors[family]).reduce((acc, shade) => {
            acc[shade] = global.colors[family][shade].value;
            return acc;
        }, {});

    const red = readScale("red");
    const gray = readScale("gray");
    const orange = readScale("orange");
    const green = readScale("green");

    const yellow = { ...readScale("yellow"), 600: brand.yellow };
    const salmon = { ...readScale("salmon"), 600: brand.salmon };
    const fuchsia = { ...readScale("fuchsia"), 600: brand.fuchsia };
    const purple = { ...readScale("purple"), 600: brand.purple };
    const violet = { ...readScale("violet"), 600: brand.violet };
    const blue = { ...readScale("blue"), 600: brand.blue };

    const colors = {
        white,
        black,
        gray,
        transparent,
        yellow,
        salmon,
        fuchsia,
        purple,
        blue,
        red,
        orange,
        green,
        violet,
    };

    return {
        colors,
        rgbColors: {
            gray: colorFamilyToRGB(gray),
            blue: colorFamilyToRGB(blue),
        },
    };
}

/**
 * @param {import("../tokens/www.json")["global"]} global
 * @param {typeof import("tailwindcss/defaultTheme")} defaultTheme
 */
function buildWwwTypographyExtend(global, defaultTheme) {
    const headingFontSizes = Object.keys(global.typography.headings).reduce((acc, key) => {
        if (key === "type") return acc;
        acc[`heading-${key}`] = global.typography.headings[key].fontSize;
        return acc;
    }, {});

    const bodyFontSizes = Object.keys(global.typography.body).reduce((acc, key) => {
        if (key === "type") return acc;
        acc[`body-${key}`] = global.typography.body[key].fontSize;
        return acc;
    }, {});

    return {
        fontFamily: {
            display: [global.typography.fontFamilies.display.value, ...defaultTheme.fontFamily.sans],
            body: [global.typography.fontFamilies.body.value, ...defaultTheme.fontFamily.sans],
            mono: [global.typography.fontFamilies.mono.value, ...defaultTheme.fontFamily.mono],
        },
        fontSize: {
            ...headingFontSizes,
            ...bodyFontSizes,
        },
    };
}

/**
 * @param {import("../tokens/www.json")["global"]} global
 * @param {typeof import("tailwindcss/defaultTheme")} defaultTheme
 */
function buildWwwTailwindTheme(global, defaultTheme) {
    const { colors, rgbColors } = buildWwwColorMaps(global, defaultTheme);

    return {
        colors,
        rgbColors,
        extend: buildWwwTypographyExtend(global, defaultTheme),
    };
}

module.exports = {
    buildWwwColorMaps,
    buildWwwTypographyExtend,
    buildWwwTailwindTheme,
};
