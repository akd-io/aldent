export const aldent = (
  strings: string | TemplateStringsArray,
  ...values: string[]
): string => {
  // Combine the strings and values into a single string with each value's
  // lines indented according to the indentation before the value
  let completeString = "";
  if (typeof strings === "string") {
    completeString = strings;
  } else {
    for (let i = 0; i < values.length; i++) {
      const indentSpaces = strings[i]?.match(/ +$/)?.[0].length || 0;
      completeString +=
        strings[i] +
        (values[i] || "").split("\n").join("\n" + " ".repeat(indentSpaces));
    }
    completeString += strings[strings.length - 1];
  }

  // Trim everything up to and including the last newline character before the first non-whitespace character
  const firstNonWhitespaceIndex = completeString.search(/\S/);
  const lastNewlineIndex = completeString.lastIndexOf(
    "\n",
    firstNonWhitespaceIndex
  );
  const trimmedString = completeString.slice(lastNewlineIndex + 1);
  const splitString = trimmedString.split("\n");

  // Find the minimum number of spaces at the beginning of each line
  let minLeadingSpaceCount = Infinity;
  for (const line of splitString.filter((l) => l.trim() != "")) {
    let leadingSpaceCount = line.match(/^ */)?.[0]?.length ?? 0;
    minLeadingSpaceCount = Math.min(minLeadingSpaceCount, leadingSpaceCount);
    if (minLeadingSpaceCount === 0) break;
  }

  // Remove minLeadingSpaceCount spaces from the beginning of each line and remove trailing newlines
  return splitString
    .map((line) => line.slice(minLeadingSpaceCount))
    .join("\n")
    .replace(/\n+$/, "");
};

export default aldent;
