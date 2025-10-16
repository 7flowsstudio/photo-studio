import About from "@/components/Sections/About/About";
import Hero from "@/components/Sections/Hero/Hero";
import Reviews from "@/components/Sections/Reviews/Reviews";
import Blog from '@/components/Sections/Blog/Blog';
import { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { Portfolio } from "@/components/Sections/Portfolio/Portfolio";
import Contacts from "@/components/Sections/Contacts/Contacts";
import {Prices} from "@/components/Sections/Prices/Prices";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function IndexPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  // console.log("LOCKALE", locale);

  return (
    <>
      <Hero />
      <About />
      <Portfolio />
        <Prices />
      <Reviews />
      <Contacts />
      <Blog />
    </>
  );
}
