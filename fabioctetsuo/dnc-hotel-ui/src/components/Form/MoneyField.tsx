import TextField from "./TextField";
import { NumericFormat } from "react-number-format";

const MoneyField = ({ label, error, ...props }: any) => {
  return (
    <NumericFormat
      customInput={TextField}
      label={label}
      error={error}
      prefix="R$ "
      decimalScale={2}
      decimalSeparator=","
      thousandSeparator="."
      {...props}
    />
  );
};

export default MoneyField;
