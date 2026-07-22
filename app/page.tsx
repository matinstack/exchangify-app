import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";

function MainPage() {
  return (
    <>
      <header>
        <SiteHeader />
      </header>
      <main>
        <Hero />
        <Features />
      </main>
      <footer></footer>
    </>
  );
}

export default MainPage;
