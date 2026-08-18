import { prisma } from "@/lib/prisma";
import { MediaManager } from "./media-manager";

export default async function MediaPage() {
  const assets = await prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold">Media</h1>
      <p className="mt-1 text-sm text-slate-500">
        Upload images here, then copy the path into a Content item or component.
      </p>
      <div className="mt-8">
        <MediaManager initialAssets={assets} />
      </div>
    </div>
  );
}
