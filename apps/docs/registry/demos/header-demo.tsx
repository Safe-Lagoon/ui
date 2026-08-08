import { Button, Header } from "@safelagoon/ui";

export default function HeaderDemo() {
  return (
    <div className="overflow-hidden rounded-xl border border-border-soft">
      <Header
        className="relative rounded-t-xl"
        logo={
          <span className="text-xl font-bold text-brand-blue">
            Safe Lagoon
          </span>
        }
        links={[
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Support", href: "#support" },
        ]}
        actions={
          <>
            <Button variant="secondary-blue" size="sm">
              Log in
            </Button>
            <Button variant="primary" size="sm">
              Get started
            </Button>
          </>
        }
      />
      <div className="bg-muted/30 p-8 text-body-16 text-muted-foreground">
        Page content below the header
      </div>
    </div>
  );
}
