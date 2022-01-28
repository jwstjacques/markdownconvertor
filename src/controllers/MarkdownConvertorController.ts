import { Request, Response } from "express";

import { HtmlTagEnum } from "../enums/HtmlTagEnum";
import { ConversionHelpers } from "../helpers/ConversionHelpers";

export class MarkdownConvertorController {
  private _convetor = new ConversionHelpers();

  /**
   * Convert a submitted Markdown body to HTML.
   *
   * @param {Request} req
   * @param {Response} res
   */
  public async convert(req: Request, res: Response) {
    try {
      // Validation
      const markdownText = req.body;

      if (!markdownText) {
        const message = "Request is missing a body.";

        res.status(400).send({ error: message });

        return;
      }

      /* istanbul ignore next */
      const header = req?.headers["content-type"];

      if (header !== "text/plain") {
        const message = "Invalid header: wrong content-type.";

        res.status(415).send({ error: message });

        return;
      }

      // Conversion

      const textAsArray = markdownText.split("\n");
      const htmlDocument: string[] = [];
      const startOfHeaderReqex = /^#{1,6} /;

      for (const line of textAsArray) {
        if (!line) {
          continue;
        }

        let newLine = line;

        // Get rid of brackets -- to prevent HTML injection
        newLine = this._convetor.convertCornerBracketsToHtmlElement(newLine);

        // Convert URLs
        newLine = this._convetor.convertMarkdownLinksToHtmlLiks(newLine);

        // Find headers
        if (startOfHeaderReqex.test(newLine)) {
          const [openingTag, ...rest] = newLine.split(" ");

          const htmlHeaderTag =
            this._convetor.convertMarkdownHeadersToHeaderTags(openingTag);

          if (htmlHeaderTag) {
            // Create a `<h#>TEXT</h#>` line
            newLine = `${htmlHeaderTag}${rest.join(
              " "
            )}${this._convetor.generateClosingTag(htmlHeaderTag)}`;

            htmlDocument.push(newLine);
            continue;
          }
        }

        // Create a `<p>TEXT</p>` line
        newLine = `${
          HtmlTagEnum.Ptag
        }${newLine}${this._convetor.generateClosingTag(HtmlTagEnum.Ptag)}`;

        htmlDocument.push(newLine);
      }

      res.type("html");
      res.status(201).send(htmlDocument.join("\n"));
    } catch (error) {
      // istanbul ignore next
      res.status(500).send({ error: error });
    }
  }
}
