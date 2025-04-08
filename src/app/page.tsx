

import { createClient } from "@/utils/supabase/server";
import { SignInButton, SignUpButton} from "@/components/auth-buttons";
import { UserDropdown } from "@/components/home/user-dropdown";
import Hero from "@/components/home/hero";
import Image from "next/image";
import Navbar from "@/components/home/NavBar";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/TestimonialsHome";
import Footer from "@/components/home/Footer";

export default async function Home() {

  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col">
        <Hero />
    </div>
  );
}
