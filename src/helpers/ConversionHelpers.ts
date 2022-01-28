import HeadingEnum from "../enums/HeadingEnum";

export class ConversionHelpers {
  /**
   * Converts all well-formed Markdown links to HTML a tags.
   *
   * @param {string} string
   * @returns {string}
   */
  public convertMarkdownLinksToHtmlLiks(string: string): string {
    // eslint-disable-next-line
    const linkRegex = /!?\[([^\]]*)\]\(([^\)]+)\)/;
    let adjustedString = string;

    while (linkRegex.test(adjustedString)) {
      adjustedString = adjustedString.replace(linkRegex, '<a href="$2">$1</a>');
    }

    return adjustedString;
  }

  /**
   * Checks if the incoming string matches a Markdown header enum value, and returns
   * the corresponding HTML tag, undefined if there is no match.
   *
   * @param {string} string
   * @returns {string | undefined}
   */
  public convertMarkdownHeadersToHeaderTags(string: string): string | undefined {
    return Object.values(HeadingEnum).find((value: any) => {
      return value.markdown === string;
    })?.html;
  }

  /**
   * Takes a string and converts it to a proper HTML closing tag, if it is a well-formed tag.
   * If it is not well formed, returns undefined.
   *
   * @param {string} tag
   * @returns {string | undefined}
   */
  public generateClosingTag(tag: string): string | undefined {
    const regex = /^<[a-z]+[0-9]?>$/;

    return regex.test(tag) ? tag.slice(0, 1) + "/" + tag.slice(1) : undefined;
  }

  public convertCornerBracketsToHtmlElement(string: string): string {
    let convertedString = string;

    convertedString = convertedString.replace(/</g, "&lt;");
    convertedString = convertedString.replace(/>/g, "&gt;");

    return convertedString;
  }
}
