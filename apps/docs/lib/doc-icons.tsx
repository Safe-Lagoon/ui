import type { SVGProps } from "react";

export type DocIcon = (props: SVGProps<SVGSVGElement>) => React.ReactNode;

function makeIcon(render: (props: SVGProps<SVGSVGElement>) => React.ReactNode): DocIcon {
  return (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {render(props)}
    </svg>
  );
}

const Box = makeIcon(() => (
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </>
));

const BoxSquare = makeIcon(() => (
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </>
));

const ImageIcon = makeIcon(() => (
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-5-5L5 21" />
  </>
));

const Shapes = makeIcon(() => (
  <>
    <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <circle cx="17.5" cy="17.5" r="3.5" />
  </>
));

const MousePointerClick = makeIcon(() => (
  <>
    <path d="M14 4.1 12 6" />
    <path d="m5.1 8.2 2.2-2.2" />
    <path d="m6 13 2.2 2.2" />
    <path d="M12 18v2" />
    <path d="M18 12h2" />
    <path d="m17.8 6.2-2.2 2.2" />
    <path d="M12 2v2" />
    <path d="M4.2 4.2l1.4 1.4" />
    <path d="M12 12 2 22" />
  </>
));

const FormInput = makeIcon(() => (
  <>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M12 12h.01" />
    <path d="M17 12h.01" />
    <path d="M7 12h.01" />
  </>
));

const CheckSquare = makeIcon(() => (
  <>
    <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
    <path d="m9 11 2 2 4-4" />
  </>
));

const PanelRight = makeIcon(() => (
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M15 3v18" />
  </>
));

const Rows3 = makeIcon(() => (
  <>
    <path d="M12 3v18" />
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
  </>
));

const Table = makeIcon(() => (
  <>
    <path d="M12 3v18" />
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
    <path d="M9 3v18" />
  </>
));

const LayoutGrid = makeIcon(() => (
  <>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </>
));

const LayoutPanelLeft = makeIcon(() => (
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18" />
  </>
));

const Signpost = makeIcon(() => (
  <>
    <path d="M12 13V3" />
    <path d="M12 21v-2" />
    <path d="M12 13H3" />
    <path d="M12 13h7" />
    <path d="M12 7H3" />
    <path d="M12 7h7" />
  </>
));

const Menu = makeIcon(() => (
  <>
    <path d="M4 5h16" />
    <path d="M4 12h16" />
    <path d="M4 19h16" />
  </>
));

const Calendar = makeIcon(() => (
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </>
));

const Map = makeIcon(() => (
  <>
    <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
    <path d="M15 5.764v15" />
    <path d="M9 3.236v15" />
  </>
));

const Shield = makeIcon(() => (
  <>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </>
));

const UserCircle = makeIcon(() => (
  <>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </>
));

const Timer = makeIcon(() => (
  <>
    <path d="M10 2h4" />
    <path d="M12 14v-4" />
    <path d="M4.93 4.93 7.76 7.76" />
    <path d="M19.07 4.93 16.24 7.76" />
    <circle cx="12" cy="14" r="8" />
  </>
));

const Grid3x3 = makeIcon(() => (
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
    <path d="M9 3v18" />
    <path d="M15 3v18" />
  </>
));

const CreditCard = makeIcon(() => (
  <>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </>
));

const GalleryHorizontal = makeIcon(() => (
  <>
    <path d="M2 3v18" />
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <path d="M22 3v18" />
  </>
));

const Smartphone = makeIcon(() => (
  <>
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M12 18h.01" />
  </>
));

const Film = makeIcon(() => (
  <>
    <rect x="2" y="2" width="20" height="20" rx="2.18" />
    <path d="M7 2v20" />
    <path d="M17 2v20" />
    <path d="M2 12h20" />
    <path d="M2 7h5" />
    <path d="M2 17h5" />
    <path d="M17 17h5" />
    <path d="M17 7h5" />
  </>
));

export const docPageIcons: Record<string, DocIcon> = {
  button: MousePointerClick,
  input: FormInput,
  checkbox: CheckSquare,
  dialog: PanelRight,
  tabs: Rows3,
  table: Table,
  layouts: LayoutGrid,
  "app-shell": LayoutPanelLeft,
  header: Signpost,
  "burger-menu": Menu,
  sidebar: LayoutPanelLeft,
  drawer: PanelRight,
  "date-picker": Calendar,
  map: Map,
  "log-card": Shield,
  "profile-card": UserCircle,
  "rule-card": Timer,
  "schedule-grid": Grid3x3,
  "sign-in-form": CreditCard,
  gallery: GalleryHorizontal,
  "screen-mirror": Smartphone,
  "event-timeline": Film,
};

export const docsSectionIcons: Record<string, DocIcon> = {
  introduction: BoxSquare,
  foundations: ImageIcon,
  icons: Shapes,
};

export function getDocPageIcon(slug: string): DocIcon {
  return docPageIcons[slug] ?? BoxSquare;
}

export function getDocsSectionIcon(slug: string): DocIcon | undefined {
  return docsSectionIcons[slug];
}
