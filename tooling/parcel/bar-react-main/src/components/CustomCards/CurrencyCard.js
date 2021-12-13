import { number } from "../../App";
import Card from "../Card";
import Flash from "react-reveal/Flash";

const CurrencyCard = ({ amount, subtitle, flash = false }) => {
  return (
    <Card>
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Flash spy={flash && amount}>
            <div className="text-4xl font-bold">
              {amount || amount === 0 ? `€ ${number(amount)}` : "..."}
            </div>
          </Flash>
          <div className="text-sm text-extra_minimal">{subtitle}</div>
        </div>
      </div>
    </Card>
  );
};

export default CurrencyCard;
