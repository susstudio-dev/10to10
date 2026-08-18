import { PageForm } from "../page-form";

export default function NewCustomPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">New page</h1>
      <p className="mt-1 text-sm text-slate-500">
        Creates a new page published at /pages/&lt;slug&gt;.
      </p>
      <div className="mt-8">
        <PageForm />
      </div>
    </div>
  );
}
