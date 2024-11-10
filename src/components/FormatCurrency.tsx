export default function FormatCurrency(input: number) {
  const cleanNumber = input.toString().replace(/\D/g, "");
  const formattedNumber = new Intl.NumberFormat("id-ID").format(
    parseInt(cleanNumber)
  );
  return formattedNumber;
}
