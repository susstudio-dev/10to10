-- Editable text fields shown on the marketing pages. `type` drives which
-- admin input renders: "text" | "richtext" | "list" (JSON-encoded array).
CREATE TABLE ContentItem (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'text',
  value TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
CREATE INDEX ContentItem_section_idx ON ContentItem (section);

-- Admin-created custom pages, served at /pages/[slug].
CREATE TABLE Page (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  blocks TEXT NOT NULL DEFAULT '[]',
  published INTEGER NOT NULL DEFAULT 1,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Metadata for images uploaded through the admin. The file bytes live in
-- the MEDIA R2 bucket under `path` as the object key.
CREATE TABLE MediaAsset (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  path TEXT NOT NULL,
  altText TEXT NOT NULL DEFAULT '',
  uploadedAt TEXT NOT NULL
);

-- Ready to receive rows once a payment provider (Razorpay, Stripe, etc.)
-- is wired up — nothing writes here yet.
CREATE TABLE PaymentRecord (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  reference TEXT NOT NULL,
  customerName TEXT NOT NULL,
  customerPhone TEXT NOT NULL,
  amountPaise INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

-- Singleton row (id is always 'default') holding site-wide theme controls
-- editable from /admin/appearance — brand colors and the animation toggle.
CREATE TABLE SiteSettings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  colorPrimary TEXT NOT NULL DEFAULT '#2c3873',
  colorTurquoise TEXT NOT NULL DEFAULT '#00d4c8',
  colorYellow TEXT NOT NULL DEFAULT '#ffd93d',
  colorOrange TEXT NOT NULL DEFAULT '#ff8a3d',
  colorGrape TEXT NOT NULL DEFAULT '#8b5cf6',
  colorMint TEXT NOT NULL DEFAULT '#7ce2b5',
  colorSky TEXT NOT NULL DEFAULT '#7cc5ff',
  colorInk TEXT NOT NULL DEFAULT '#1a1033',
  colorCloud TEXT NOT NULL DEFAULT '#fff9f2',
  animationsEnabled INTEGER NOT NULL DEFAULT 1,
  updatedAt TEXT NOT NULL
);
