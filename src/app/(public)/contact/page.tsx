import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | FOREVER TUNE STUDIOS",
  description: "Get in touch with FOREVER TUNE STUDIOS for business inquiries, collaborations, and bookings",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
