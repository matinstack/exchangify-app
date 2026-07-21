import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";

function MainPage() {
  return (
    <>
      <header>
        <SiteHeader />
      </header>
      <main>
        <section>
          <Hero />
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default MainPage;
