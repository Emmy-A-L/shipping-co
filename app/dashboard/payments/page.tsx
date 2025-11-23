import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, History } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Payments</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Make a Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border bg-slate-50 p-4">
                <div className="mb-2 text-sm font-medium text-slate-500">Outstanding Balance</div>
                <div className="text-3xl font-bold text-slate-900">₦ 450,000.00</div>
                <div className="text-sm text-slate-500">Invoice #INV-2025-001</div>
              </div>
              <Button className="w-full text-lg">
                <CreditCard className="mr-2 h-5 w-5" />
                Pay with Paystack
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Secured by Paystack. We accept cards, bank transfers, and USSD.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "PAY-9921", date: "Oct 10, 2025", amount: "₦ 120,000.00", status: "Successful" },
                { id: "PAY-9920", date: "Sep 28, 2025", amount: "₦ 85,000.00", status: "Successful" },
                { id: "PAY-9919", date: "Sep 15, 2025", amount: "₦ 250,000.00", status: "Successful" },
              ].map((payment) => (
                <div key={payment.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <History className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">{payment.id}</div>
                      <div className="text-xs text-muted-foreground">{payment.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{payment.amount}</div>
                    <div className="text-xs text-green-600">{payment.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
