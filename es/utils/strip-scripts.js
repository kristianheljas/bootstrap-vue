/**
 * Strip <script> tags from string
 *
 * Given an string, removes all occurences of HTML <script> tags
 *
 * @param {string} stringToStrip
 * @return {string}
 */
export default function stripScripts() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return String(str).replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}