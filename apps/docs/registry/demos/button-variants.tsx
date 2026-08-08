import { Button } from "@safelagoon/ui";

export default function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary-lilac">Secondary Lilac</Button>
      <Button variant="secondary-blue">Secondary Blue</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
    </div>
  );
}
