import { Button } from "@safelagoon/ui";

export default function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <Button variant="primary" size="sm">
        Small (48px)
      </Button>
      <Button variant="primary" size="default">
        Default (52px)
      </Button>
      <Button variant="primary" size="lg">
        Large
      </Button>
      <Button variant="primary" size="icon" aria-label="Settings">
        ⚙
      </Button>
    </div>
  );
}
