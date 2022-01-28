/* istanbul ignore file */

export const headingIds = ["Heading1", "Heading2", "Heading6"] as const;

type HeadingId = typeof headingIds[number];

class RelativeTag {
  html!: string;
  markdown!: string;
}

const markdownHeaderTag = "#";

const generateHtmlHeader = (number: number): string => {
  return `<h${number.toString()}>`;
};

const HeadingVariables: Record<HeadingId, RelativeTag> = {
  Heading1: {
    markdown: markdownHeaderTag,
    html: generateHtmlHeader(1),
  },
  Heading2: {
    markdown: markdownHeaderTag.repeat(2),
    html: generateHtmlHeader(2),
  },
  // Ignore headings 3-5 inclusive
  Heading6: {
    markdown: markdownHeaderTag.repeat(6),
    html: generateHtmlHeader(6),
  },
} as const;

export default HeadingVariables;
