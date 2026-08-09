import { HomeCta } from "@/components/home-cta";
import { LogoHeader } from "@safelagoon/ui/icons";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <LogoHeader className="h-10" />
      </div>
      <p className="text-body-20 max-w-2xl text-muted-foreground">
        SafeLagoon design system, based on React and shadcn
      </p>
      <HomeCta />
    </main>
  );
}
