import { ThemeSwitch } from "./theme-switch";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import darkLogo from "@/assets/images/darkLogo.svg";
import lightLogo from "@/assets/images/lightLogo.svg";


const navItems = [
  { name: "Home", to: "hero" },
  { name: "Live Now", to: "/live" },
  { name: "Featured", to: "featured" },
  { name: "How It Works", to: "how" },
  { name: "Get Started", to: "cta" },
];

function Header() {
  const navigate = useNavigate();

  // For programmatic navigation (when needed)
  const handleNavigation = (path: string) => {
    if (path.startsWith("/live")) {
      // Regular path navigation
      navigate(path);
    } else {
      // Scroll to section within the page
      navigate("/"); // Ensure we are on live page first
      setTimeout(() => {
        // Scroll to section with a delay
        const element = document.getElementById(path);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100); // Adjust timeout if needed
    }
  };

  return (
    <header className="border-b bg-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold cursor-pointer">
          <img
            src={lightLogo}
            alt="Logo"
            className="h-8 w-120 mr-2 dark:hidden" // hide on dark mode
          />
          <img
            src={darkLogo}
            alt="Logo"
            className="h-8 w-120 mr-2 hidden dark:block" // show on dark mode
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Button
              key={item.to}
              variant="link"
              onClick={() => handleNavigation(item.to)}
              className="text-sm cursor-pointer hover:underline"
            >
              {item.name}
            </Button>
          ))}
          <ThemeSwitch />
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center">
          <ThemeSwitch />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.to}
                    variant="link"
                    onClick={() => handleNavigation(item.to)}
                    className="text-lg font-medium cursor-pointer hover:underline"
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
