import { ConversionHelpers } from "../../src/helpers/ConversionHelpers";

describe("ConversionHelpers", () => {
  describe("convertMarkdownLinksToHtmlLiks", () => {
    it("should convert single link to an HTML a tag", () => {
      const string = "[hello](www.hello.com)";

      const conversionHelpers = new ConversionHelpers();

      const result = conversionHelpers.convertMarkdownLinksToHtmlLiks(string);

      expect(result).toBe('<a href="www.hello.com">hello</a>');
    });

    it("should convert multiple links to HTML a tags", () => {
      const string =
        "[hello](www.hello.com) and then another [hello](www.hello.com)";

      const conversionHelpers = new ConversionHelpers();

      const result = conversionHelpers.convertMarkdownLinksToHtmlLiks(string);

      expect(result).toBe(
        '<a href="www.hello.com">hello</a> and then another <a href="www.hello.com">hello</a>'
      );
    });

    it("should not convert malformed links to an HTML a tag", () => {
      const string = "[hello(www.hello.com)";

      const conversionHelpers = new ConversionHelpers();

      const result = conversionHelpers.convertMarkdownLinksToHtmlLiks(string);

      expect(result).toBe("[hello(www.hello.com)");
    });
  });

  describe("convertMarkdownHeadersToHeaderTags", () => {
    it.each([
      ["should convert", "#", "<h1>"],
      ["should convert", "##", "<h2>"],
      ["should convert", "######", "<h6>"],
      ["should not convert", "###", undefined],
      ["should not convert", "", undefined],
    ])("%s %s to html tag: %s", (expectation, input, expected) => {
      const conversionHelpers = new ConversionHelpers();

      const result =
        conversionHelpers.convertMarkdownHeadersToHeaderTags(input);

      expect(result).toBe(expected);
    });
  });

  describe("generateClosingTag", () => {
    it.each([
      ["should convert", "<p>", "</p>"],
      ["should convert", "<h2>", "</h2>"],
      ["should convert", "h2>", undefined],
      ["should convert", "h2>", undefined],
      ["should convert", "<>", undefined],
    ])("%s %s to %s", (expectation, input, expected) => {
      const conversionHelpers = new ConversionHelpers();

      const result = conversionHelpers.generateClosingTag(input);

      expect(result).toBe(expected);
    });
  });

  describe("convertCornerBracketsToHtmlElement", () => {
    it("should convert < to &lt; and > &gt;", () => {
      const conversionHelpers = new ConversionHelpers();
      const input = "This is an HTML tag: <div>";

      const result =
        conversionHelpers.convertCornerBracketsToHtmlElement(input);

      const expectedResult = "This is an HTML tag: &lt;div&gt;";

      expect(result).toBe(expectedResult);
    });
  });
});
