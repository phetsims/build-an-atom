/* eslint-disable */
const img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
