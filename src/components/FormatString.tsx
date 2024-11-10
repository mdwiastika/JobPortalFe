export default function FormatString(input: string) {
  return input
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char: string) => char.toUpperCase());
}
