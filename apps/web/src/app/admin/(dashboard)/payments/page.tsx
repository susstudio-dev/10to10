import { prisma } from "@/lib/prisma";

export default async function PaymentsPage() {
  const payments = await prisma.paymentRecord.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold">Payments</h1>
      <p className="mt-1 text-sm text-slate-500">
        No payment provider is connected yet. Once you pick Razorpay, Stripe, or another
        processor, transactions will land in this table automatically — the database and
        this page are already built to receive them.
      </p>

      {payments.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-400">
          No payments recorded yet.
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Provider</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3">{p.customerName}</td>
                  <td className="px-4 py-3">
                    {(p.amountPaise / 100).toLocaleString("en-IN", { style: "currency", currency: p.currency })}
                  </td>
                  <td className="px-4 py-3">{p.provider}</td>
                  <td className="px-4 py-3">{p.status}</td>
                  <td className="px-4 py-3">{new Date(p.createdAt).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
