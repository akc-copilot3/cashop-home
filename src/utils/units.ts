/**
 * Convert pixels to rem based on 16px base font size
 * At 1440px viewport, 1rem = 16px
 */
export function px2rem(px: number): string {
  return `${px / 16}rem`;
}

/**
 * Helper function for inline styles with px values
 * Converts numeric px values to rem
 */
export function pxToRem(px: number | string): string {
  if (typeof px === 'string') {
    // If it's already a string with units, return as is
    if (px.includes('rem') || px.includes('%') || px.includes('vh') || px.includes('vw')) {
      return px;
    }
    // Extract numeric value from px string
    const numericValue = parseFloat(px);
    if (!isNaN(numericValue)) {
      return `${numericValue / 16}rem`;
    }
    return px;
  }
  return `${px / 16}rem`;
}