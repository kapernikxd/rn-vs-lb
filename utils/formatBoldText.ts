export interface BoldTextPart {
  text: string;
  bold: boolean;
}

const BOLD_MARKER = /\*\*(.+?)\*\*/g;

export const formatBoldText = (text: string): BoldTextPart[] => {
  if (!text) {
    return [];
  }

  const parts: BoldTextPart[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = BOLD_MARKER.exec(text))) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), bold: false });
    }

    parts.push({ text: match[1], bold: true });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), bold: false });
  }

  return parts.length ? parts : [{ text, bold: false }];
};
