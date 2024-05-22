export type ThemeColors = typeof light;

export const uikitColors = {
    text: '#161616',
};
export const light = {
    // primary: uikitColors.primary,
    // secondary: uikitColors.secondary,
};
export const colors = {...uikitColors, ...light};
export type Colors = typeof colors & ThemeColors;
