export function randomTailwindColor() {
    const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuschia', 'pink', 'rose'];
    const intensity = ['200', '300', '400', '500', '600', '700'];

    const colorIndex = Math.floor(Math.random() * colors.length);
    const intensityIndex = Math.floor(Math.random() * intensity.length);

    return `${colors[colorIndex]}-${intensity[intensityIndex]}`;
}