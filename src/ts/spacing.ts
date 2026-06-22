/**
 * Shared spacing utilities used by pulumi-box, pulumi-expansion-panel,
 * and any other component that needs CSS-style shorthand parsing or
 * axis overrides for spacing props.
 */

/** Resolved per-side spacing values after parsing shorthand + axis overrides. */
export interface SpacingSides<T extends string = string> {
    top?: T;
    right?: T;
    bottom?: T;
    left?: T;
}

/**
 * Create a shorthand parser + axis-override helper bound to a specific
 * set of valid spacing tokens.
 *
 * @param validValues - The set of strings that count as valid spacing tokens.
 *
 * @example
 * ```ts
 * // pulumi-box scale
 * const boxSpacing = createSpacingUtils(new Set(["none","xs","s","m","l","xl","2x","3x","4x"]));
 * const sides = boxSpacing.parseShorthand("xl s");
 * // { top: "xl", right: "s", bottom: "xl", left: "s" }
 * ```
 */
export function createSpacingUtils<T extends string>(validValues: ReadonlySet<T>) {
    /** Type-guard: is `value` one of the valid tokens? */
    function isValid(value: string): value is T {
        return validValues.has(value as T);
    }

    /**
     * Parse a CSS-style shorthand string (1–4 tokens) into per-side values.
     *
     * - 1 value  → all sides
     * - 2 values → vertical, horizontal
     * - 3 values → top, horizontal, bottom
     * - 4 values → top, right, bottom, left
     */
    function parseShorthand(input?: string): SpacingSides<T> {
        if (!input) return {};
        const tokens = input
            .trim()
            .split(/\s+/)
            .filter((t) => t.length > 0);
        if (tokens.length < 1 || tokens.length > 4 || !tokens.every(isValid)) {
            return {};
        }
        const [a, b, c, d] = tokens as T[];
        if (tokens.length === 1) return { top: a, right: a, bottom: a, left: a };
        if (tokens.length === 2) return { top: a, right: b, bottom: a, left: b };
        if (tokens.length === 3) return { top: a, right: b, bottom: c, left: b };
        return { top: a, right: b, bottom: c, left: d };
    }

    /** Apply axis overrides (X → left+right, Y → top+bottom) on top of resolved sides. */
    function applyAxisOverrides(sides: SpacingSides<T>, x?: T, y?: T): SpacingSides<T> {
        return {
            top: y ?? sides.top,
            right: x ?? sides.right,
            bottom: y ?? sides.bottom,
            left: x ?? sides.left,
        };
    }

    return { isValid, parseShorthand, applyAxisOverrides };
}

/**
 * Spacing scale shared across components that accept padding/margin/gap props
 * (pulumi-box, pulumi-text, etc.). Matches the design-system spacing tokens
 * (`$spacing-{xs,s,m,l,xl,2x,3x,4x}`) plus an explicit `none`.
 */
export type SpacingSize = "none" | "xs" | "s" | "m" | "l" | "xl" | "2x" | "3x" | "4x";

/** The valid `SpacingSize` token set, for runtime validation. */
export const SPACING_SIZE_VALUES: ReadonlySet<SpacingSize> = new Set<SpacingSize>([
    "none",
    "xs",
    "s",
    "m",
    "l",
    "xl",
    "2x",
    "3x",
    "4x",
]);

/** Shared spacing utilities bound to the `SpacingSize` token set. */
export const spacing = createSpacingUtils<SpacingSize>(SPACING_SIZE_VALUES);
