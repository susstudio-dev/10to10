import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  name: "10to10 Adventures",
  tagline: "Non-stop play. Endless fun. For everyone.",
  description:
    "Khammam's all-in-one family playground — play school, soft play arena, gaming, private theatre, birthday parties and summer camp under one roof. Open 10 AM – 10 PM, all 7 days.",
  url: "https://10to10adventures.com",
  phone: "+91 92567 87788",
  phoneHref: "tel:+919256787788",
  whatsapp: "https://wa.me/919256787788",
  email: "contactus@10to10adventures.com",
  address: "Mamatha College Road, Above Just Bake, Khammam, Telangana",
  instagram: "https://instagram.com/10to10play",
};
