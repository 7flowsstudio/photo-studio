import About from "@/components/Sections/About/About";
import Hero from "@/components/Sections/Hero/Hero";
import Reviews from "@/components/Sections/Reviews/Reviews";
import { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { Portfolio } from "@/components/Sections/Portfolio/Portfolio";

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
      <Reviews />
    </>
  );
}
