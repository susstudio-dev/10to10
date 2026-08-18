// Maps each editable marketing page to its ContentItem "section" key.
// Shared by the admin sidebar nav and the per-page content editor route.
export const ADMIN_PAGES = [
  { slug: "home", section: "hero", label: "Home" },
  { slug: "about", section: "about", label: "About" },
  { slug: "play-school", section: "play-school", label: "Play School" },
  { slug: "summer-camp", section: "summer-camp", label: "Summer Camp" },
  { slug: "party-planner", section: "party-planner", label: "Party Planner" },
  { slug: "memberships", section: "memberships", label: "Memberships" },
  { slug: "contact", section: "contact", label: "Contact" },
] as const;

export type AdminPageSlug = (typeof ADMIN_PAGES)[number]["slug"];

export function getAdminPage(slug: string) {
  return ADMIN_PAGES.find((p) => p.slug === slug);
}
