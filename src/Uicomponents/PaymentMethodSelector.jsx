import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Wallet, Building2, Smartphone } from "lucide-react";

const PAYMENT_METHODS = [
  {
    id: "CREDIT_CARD",
    label: "Credit Card",
    description: "Pay securely with your credit card",
    icon: CreditCard,
  },
  {
    id: "DEBIT_CARD",
    label: "Debit Card",
    description: "Pay directly from your bank account",
    icon: Wallet,
  },
  {
    id: "UPI",
    label: "UPI",
    description: "Pay using any UPI app",
    icon: Smartphone,
  },
  {
    id: "NET_BANKING",
    label: "Net Banking",
    description: "Pay through your bank's website",
    icon: Building2,
  },
];

export function PaymentMethodSelector({ selected, onChange }) {
  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Payment Method</h3>

      <RadioGroup
        value={selected}
        onValueChange={(value) => onChange(value)}
        className="grid grid-cols-2 gap-4"
      >
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon;
          return (
            <Label
              key={method.id}
              className={`flex items-start space-x-4 p-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors ${selected === method.id ? 'border-primary' : ''}`}
              htmlFor={method.id}
            >
              <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{method.label}</span>
                </div>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </Label>
          );
        })}
      </RadioGroup>
    </Card>
  );
}
