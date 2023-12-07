// Returns method returns a new string with one, some, or all matches of a pattern replaced by a replacement.
import { HelperOptions, SafeString } from 'handlebars';

const replace = function (
  data: string | SafeString | HelperOptions,
  pattern: string | SafeString | HelperOptions,
  replacement: string | SafeString | HelperOptions | undefined
) {
  data =
    (typeof data === 'object' || typeof data == 'undefined') &&
    !(data instanceof SafeString)
      ? ''
      : data.toString();
  pattern =
    (typeof pattern === 'object' || typeof pattern == 'undefined') &&
    !(pattern instanceof SafeString)
      ? ''
      : pattern.toString();

  replacement =
    (typeof replacement === 'object' || typeof replacement == 'undefined') &&
    !(replacement instanceof SafeString)
      ? ''
      : replacement.toString();

  return data.replace(pattern, replacement);
};

export default replace;
