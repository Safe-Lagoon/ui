// Theme & utils
export { ThemeProvider, useTheme, type ThemeProviderProps } from "./components/theme-provider";
export { cn } from "./lib/utils";

// Brand components (Tier 1)
export { Button, buttonVariants, type ButtonProps } from "./components/brand/button";
export { CloseButton, type CloseButtonProps } from "./components/brand/close-button";
export { Input, type InputProps } from "./components/brand/input";
export { Checkbox } from "./components/brand/checkbox";
export { Slider } from "./components/brand/slider";
export { Tag, tagVariants, type TagProps } from "./components/brand/tag";
export { Header, BurgerMenu, type HeaderProps, type HeaderLink } from "./components/brand/header";
export { Footer, type FooterProps, type FooterSection, type FooterLink } from "./components/brand/footer";
export { NavButton, NavPrev, NavNext, type NavButtonProps } from "./components/brand/nav-button";
export { Card, CardImage, CardContent, CardTitle, CardDescription, type CardProps } from "./components/brand/card";
export { CTABlock, type CTABlockProps } from "./components/brand/cta-block";
export { Popup, type PopupProps } from "./components/brand/popup";
export { Avatar, AvatarImage, AvatarFallback } from "./components/brand/avatar";
export { CookieConsent, type CookieConsentProps } from "./components/brand/cookie-consent";

// shadcn UI primitives (Tier 2)
export * from "./components/ui/label";
export * from "./components/ui/textarea";
export * from "./components/ui/select";
export * from "./components/ui/switch";
export * from "./components/ui/radio-group";
export * from "./components/ui/toggle-group";
export * from "./components/ui/dialog";
export * from "./components/ui/alert-dialog";
export * from "./components/ui/sheet";
export * from "./components/ui/popover";
export * from "./components/ui/tooltip";
export * from "./components/ui/dropdown-menu";
export * from "./components/ui/tabs";
export * from "./components/ui/accordion";
export * from "./components/ui/badge";
export * from "./components/ui/separator";
export * from "./components/ui/scroll-area";
export * from "./components/ui/skeleton";
export * from "./components/ui/progress";
export * from "./components/ui/table";
export * from "./components/ui/breadcrumb";
export * from "./components/ui/pagination";
export * from "./components/ui/carousel";
export * from "./components/ui/command";
export * from "./components/ui/hover-card";
export * from "./components/ui/collapsible";
export * from "./components/ui/alert";
export * from "./components/ui/form";
export * from "./components/ui/calendar";
export * from "./components/ui/input-otp";
export * from "./components/ui/sonner";
export * from "./components/ui/search-input";
export * from "./components/ui/password-input";
export * from "./components/ui/phone-input";
export * from "./components/ui/spinner";
export * from "./components/ui/branded-preloader";

// Domain components (Tier 3)
export * from "./components/domain/log-card";
export * from "./components/domain/timeline";
export * from "./components/domain/stat-tile";
export * from "./components/domain/profile-card";
export * from "./components/domain/profile-carousel";
export * from "./components/domain/app-tile";
export * from "./components/domain/rule-card";
export * from "./components/domain/weekday-picker";
export * from "./components/domain/category-icon-picker";
export * from "./components/domain/schedule-grid";
export * from "./components/domain/time-limit-slider";
export * from "./components/domain/alarm-card";
export * from "./components/domain/app-review-card";
export * from "./components/domain/chat-bubble";
export * from "./components/domain/gallery-grid";
export * from "./components/domain/empty-state";
export * from "./components/domain/avatar-uploader";
export * from "./components/domain/stepper";
export * from "./components/domain/pricing-table";
export * from "./components/domain/language-switcher";
