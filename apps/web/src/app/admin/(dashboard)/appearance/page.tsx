import { getSiteSettings } from "@/lib/settings";
import { AppearanceForm } from "./appearance-form";

export default async function AppearancePage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold">Appearance</h1>
      <p className="mt-1 text-sm text-slate-500">
        Configure the site&apos;s brand colors and motion, live, without a code deploy.
      </p>
      <div className="mt-8">
        <AppearanceForm initial={settings} />
      </div>
    </div>
  );
}
