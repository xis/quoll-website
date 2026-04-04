import { useState, useEffect } from "react";
import { RiArrowRightLine, RiGithubLine, RiLinkedinLine, RiTwitterXLine, RiSunLine, RiMoonLine, RiComputerLine } from "@remixicon/react";

const team = [
  { name: "Enes Furkan Olcay", role: "Founder / Product Engineer", avatar: "/avatars/enes.png", linkedin: "https://www.linkedin.com/in/enes-furkan-olcay/", x: "https://x.com/xis_xii", github: "https://github.com/xis" },
  { name: "Ahmet Yunus Sevim", role: "Founder / Product", avatar: "/avatars/yunus.png", linkedin: "https://www.linkedin.com/in/ahmetyunussevim/", github: "https://github.com/yunussevim" },
  { name: "Recep Ahmet Kara", role: "Founder / Engineering", avatar: "/avatars/recep.png", linkedin: "https://www.linkedin.com/in/recep-ahmet-kara/", github: "https://github.com/2O77" },
  { name: "Sıla Yurtseven", role: "QA", avatar: "/avatars/sila.png", linkedin: "https://www.linkedin.com/in/s%C4%B1la-yurtseven-a0a241383/", github: "https://github.com/elloniser" },
];

function Hero() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mt-4 text-6xl tracking-wide sm:text-8xl">
          Quoll
          <br />
        </h1>
        <p className="mx-auto mt-6 max-w-xl border-l-2 border-muted-foreground/30 pl-4 text-left text-lg italic leading-relaxed text-muted-foreground">
          four friends, a coffee shop, and a terrible idea that might just work.
          <span className="not-italic text-muted-foreground/40"> (no promises)</span>
        </p>
        <p className="mx-auto mt-4 max-w-xl border-l-2 border-muted-foreground/30 pl-4 text-left text-lg leading-relaxed text-muted-foreground">
          we build software. flowbaker is the first thing we shipped. what&apos;s
          next? apps, games, maybe something weird — we don&apos;t plan too far
          ahead.
        </p>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="flex justify-center px-6 pb-24">
      <a
        href="https://flowbaker.io"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-4xl px-4 py-4 hover:bg-accent/20"
      >
        <img
          src="/flowbaker-logo.svg"
          alt="Flowbaker"
          className="h-12 w-12 rounded-xl"
        />
        <div>
          <p className="text-lg">Flowbaker</p>
          <p className="text-base text-muted-foreground">
            Workflow automation platform
          </p>
        </div>
        <RiArrowRightLine className="ml-4 h-4 w-4 text-muted-foreground" />
      </a>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-lg uppercase tracking-widest text-muted-foreground">
          Crew
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-10 sm:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <img
                src={member.avatar}
                alt={member.name}
                className="h-24 w-24 rounded-3xl object-cover"
              />
              <p className="mt-4 text-lg">{member.name}</p>
              <p className="mt-1 text-base text-muted-foreground">{member.role}</p>
              <div className="mt-2 flex gap-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RiLinkedinLine className="h-3.5 w-3.5" />
                </a>
                {"x" in member && member.x && (
                  <a
                    href={member.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <RiTwitterXLine className="h-3.5 w-3.5" />
                  </a>
                )}
                {"github" in member && member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <RiGithubLine className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="px-6 py-12">
      <div className="mx-auto flex max-w-5xl items-center justify-between text-base">
        <span className="text-muted-foreground">
          &copy; {new Date().getFullYear()} Quoll LLC
        </span>
        <a
          href="mailto:hello@quollhq.com"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          hello@quollhq.com
        </a>
      </div>
    </footer>
  );
}

type Theme = "system" | "light" | "dark";

function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      localStorage.removeItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    } else {
      localStorage.setItem("theme", theme);
      root.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle("dark", e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const next = () => setTheme((t) => (t === "system" ? "light" : t === "light" ? "dark" : "system"));

  const Icon = theme === "system" ? RiComputerLine : theme === "light" ? RiSunLine : RiMoonLine;

  return (
    <button
      onClick={next}
      className="fixed right-4 top-4 cursor-pointer rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

export function App() {
  return (
    <div className="min-h-svh">
      <ThemeSwitcher />
      <Hero />
      <Showcase />
      <Team />
      <Footer />
    </div>
  );
}

export default App;
