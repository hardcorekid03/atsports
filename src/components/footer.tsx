import { Link } from "react-router-dom";
interface LandingPageProps {
    onGetStarted: () => void;
  }
function Footer({ onGetStarted }: LandingPageProps)  {
  return (
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">ATSports</h3>
              <p className="text-sm text-muted-foreground">
                Your premier destination for live sports streaming from around
                the world.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onGetStarted();
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Basketball
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onGetStarted();
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Football
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onGetStarted();
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Baseball
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onGetStarted();
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Ice Hockey
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Help</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    YouTube
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} ATSports. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer