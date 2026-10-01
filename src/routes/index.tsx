import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abrielle Jasmin — Visual Communication & Technology" },
      {
        name: "description",
        content:
          "Abrielle Jasmin is an emerging creative, Spelman computer science student, and AI and extended reality researcher exploring social media and visual communication.",
      },
      { property: "og:title", content: "Abrielle Jasmin — Visual Communication & Technology" },
      {
        property: "og:description",
        content:
          "Making complex ideas feel approachable. Selected campaign and technology communication concepts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Portfolio,
});

type ProjectImage = { src: string; alt: string; width: number; height: number };
type Project = {
  title: string;
  collection: string;
  thumbnail?: ProjectImage;
  category: string;
  description: string;
  embedUrl?: string;
  video?: { src: string; kind: "embed" | "file" };
  brief?: string;
  audience?: string;
  approach?: string;
  contribution?: string;
  tools: string[];
  images: ProjectImage[];
};

// Single source for project copy and galleries. Add only supplied artwork here.
// Image src can point to /work/filename.webp in public/work. Use its actual dimensions.
const projects: Project[] = [
  {
    title: "Corriente",
    collection: "Digital Products",
    category: "Live website",
    description: "Explore Corriente below or open the website in a new tab.",
    embedUrl: "https://corriente-azure.vercel.app/",
    tools: [],
    images: [],
  },
  {
    title: "InnoPlasticity — In motion",
    collection: "Digital Products",
    category: "Product video",
    description: "A closer look at InnoPlasticity.",
    // Paste a YouTube/Vimeo embed URL below, or use kind: "file" with /work/video.mp4.
    video: { src: "", kind: "embed" },
    tools: [],
    images: [],
  },
  {
    title: "Money Has a Backend",
    collection: "Campaigns & Events",
    category: "Independent workshop concept",
    description:
      "An everyday payment. A world of technology behind it. A proposed fintech careers workshop campaign for AUC Tech Collective.",
    brief: "Make the technology and careers behind everyday payments feel approachable.",
    audience:
      "AUC students curious about fintech and the careers that connect money with technology.",
    approach:
      "A green-and-ivory payment screen with a peeled corner revealing circuitry connects a familiar interaction to the systems beneath it.",
    contribution:
      "Workshop campaign concept and visual communication. This is an independent proposal, not a launched event.",
    tools: ["Adobe Illustrator"],
    images: [
      {
        src: "/work/money-has-a-backend.png",
        alt: "Money Has a Backend fintech careers workshop poster",
        width: 1080,
        height: 1350,
      },
    ],
  },
  {
    title: "InnoPlasticity",
    collection: "Product storytelling",
    category: "System + advertisement concept",
    description:
      "A second brain for ideas worth keeping. An advertisement concept for a system I created to capture, organize, and retrieve information.",
    brief:
      "Encourage interest in the system by explaining how saved information can become easier to find and use.",
    audience: "People who collect information in Slack and want a clearer way to revisit it.",
    approach:
      "Explain the journey: information enters through Slack, moves through Zapier into databases, is categorized with AI, and returns to Slack. Users can also ask questions about saved information.",
    contribution:
      "Created the second-brain system and developed the advertisement concept around its benefits.",
    tools: ["Adobe Illustrator", "Slack", "Zapier", "AI categorization (system workflow)"],
    images: [
      {
        src: "/work/innoplasticity.png",
        alt: "InnoPlasticity second-brain product advertisement",
        width: 1080,
        height: 1350,
      },
    ],
  },
  {
    title: "Make Room for Ideas",
    collection: "Product storytelling",
    category: "Concept ad + illustrative interface",
    description:
      "A bold visual campaign concept for InnoPlasticity that turns an abstract second-brain workflow into an immediate, memorable product promise.",
    brief:
      "Show how InnoPlasticity gives saved ideas a place to land, become organized, and return when they are needed.",
    audience:
      "Idea-driven students, researchers, and creative teams looking for a clearer way to retrieve what they save.",
    approach:
      "Oversized typography and a dimensional laptop interface create a high-energy composition, while the capture, categorize, ask, and retrieve language explains the workflow at a glance.",
    contribution:
      "Developed the campaign concept, copy hierarchy, illustrative product interface, and final advertisement design.",
    tools: ["Adobe Illustrator"],
    images: [
      {
        src: "/work/innoplasticity-make-room.png",
        alt: "InnoPlasticity Make Room for Ideas concept advertisement",
        width: 1080,
        height: 1350,
      },
    ],
  },
  {
    title: "The Founder Chat",
    collection: "Social Media Posts",
    thumbnail: {
      src: "/work/the-founder-chat.png",
      alt: "The Founder Chat seven-slide LinkedIn carousel overview",
      width: 4411,
      height: 2730,
    },
    category: "LinkedIn carousel concept",
    description:
      "A seven-slide startup storytelling series about protecting a product promise when a launch conversation begins to expand the scope.",
    brief:
      "Turn a familiar founder-team conversation into a concise visual story about scope, ownership, and a realistic release.",
    audience:
      "Early-stage founders, product teams, and startup communities navigating launch decisions.",
    approach:
      "A navy-and-ivory editorial system pairs oversized type, message bubbles, notes, and release checklists to move the reader from ambiguity to a clear shared plan.",
    contribution:
      "Developed the carousel concept, narrative sequence, copy, art direction, and final visual design.",
    tools: ["Adobe Illustrator"],
    images: Array.from({ length: 7 }, (_, index) => ({
      src: `/work/founder-chat-${String(index + 1).padStart(2, "0")}.png`,
      alt: `The Founder Chat carousel slide ${index + 1} of 7`,
      width: 540,
      height: 675,
    })),
  },
];

// Leave unprovided contact details unset: no placeholder links are rendered.
const contact: { email?: string; linkedin?: string; resume?: string } = {
  email: "abriellejasmin@gmail.com",
};

function Portfolio() {
  const hasContact = Boolean(contact.email || contact.linkedin || contact.resume);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const collections = useMemo(
    () =>
      ["Social Media Posts", "Campaigns & Events", "Product storytelling", "Digital Products"].map((title) => ({
        title,
        projects: projects.filter((project) => project.collection === title),
      })),
    [],
  );

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
      if (selectedProject.images.length > 1 && event.key === "ArrowLeft") {
        setActiveImageIndex((current) =>
          current === 0 ? selectedProject.images.length - 1 : current - 1,
        );
      }
      if (selectedProject.images.length > 1 && event.key === "ArrowRight") {
        setActiveImageIndex((current) =>
          current === selectedProject.images.length - 1 ? 0 : current + 1,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const openProject = (project: Project) => {
    setShowCaseStudy(false);
    setActiveImageIndex(0);
    setSelectedProject(project);
  };

  const showPreviousImage = () => {
    if (!selectedProject) return;
    setActiveImageIndex((current) =>
      current === 0 ? selectedProject.images.length - 1 : current - 1,
    );
  };

  const showNextImage = () => {
    if (!selectedProject) return;
    setActiveImageIndex((current) =>
      current === selectedProject.images.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="section-wrap header-inner">
          <a className="wordmark" href="#top" aria-label="Abrielle Jasmin, back to top">
            aj<span>.</span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">
              Contact <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>
      <main id="main">
        <section id="top" className="section-wrap intro">
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <p className="eyebrow">Abrielle Jasmin / Creative portfolio</p>
          <h1>
            Complex ideas.
            <br />
            <span className="serif">Clear connections.</span>
          </h1>
          <div className="intro-bottom">
            <p>
              I’m Abrielle, an emerging creative with a technical background. I explore social media
              and visual communication to make technology feel more human.
            </p>
            <div className="intro-links">
              <a className="primary-link" href="#work">
                View my work <ArrowDown aria-hidden="true" />
              </a>
              <a className="text-link" href="#contact">
                Contact <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="intro-caption">
            <span>Computer Science + Economics</span>
            <span>Spelman College</span>
          </div>
        </section>
        <section id="work" className="section-wrap work-section">
          <div className="section-heading">
            <h2 className="eyebrow">01 / Selected work</h2>
            <p>Browse by format, then open any project for its story and full-size work.</p>
          </div>
          <div className="collection-list">
            {collections.map((collection, collectionIndex) => (
              <section
                className="collection reveal-section"
                data-reveal
                key={collection.title}
                style={{ "--reveal-delay": `${collectionIndex * 70}ms` } as React.CSSProperties}
              >
                <div className="collection-heading">
                  <div>
                    <p className="eyebrow">0{collectionIndex + 1}</p>
                    <h3>{collection.title}</h3>
                  </div>
                  <p>{collection.projects.length} project{collection.projects.length === 1 ? "" : "s"}</p>
                </div>
                <div className={collection.projects.some((project) => project.embedUrl || project.video) ? "embedded-projects" : "project-carousel"} aria-label={`${collection.title} projects`}>
                  {collection.projects.map((project) => (
                    project.video ? (
                      <article className="embedded-project" key={project.title}>
                        <div className="embedded-project-heading">
                          <div>
                            <p className="eyebrow">{project.category}</p>
                            <h4>{project.title}</h4>
                            <p>{project.description}</p>
                          </div>
                        </div>
                        <div className="project-video">
                          {!project.video.src ? (
                            <div className="project-video-placeholder">
                              <span className="eyebrow">InnoPlasticity</span>
                              <p>Video coming soon</p>
                            </div>
                          ) : project.video.kind === "file" ? (
                            <video controls playsInline preload="metadata" src={project.video.src} aria-label={`${project.title} video`}>
                              <a href={project.video.src}>Watch video</a>
                            </video>
                          ) : (
                            <iframe
                              src={project.video.src}
                              title={`${project.title} video`}
                              loading="lazy"
                              allow="fullscreen; picture-in-picture; encrypted-media"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            />
                          )}
                        </div>
                      </article>
                    ) : project.embedUrl ? (
                      <article className="embedded-project" key={project.title}>
                        <div className="embedded-project-heading">
                          <div>
                            <p className="eyebrow">{project.category}</p>
                            <h4>{project.title}</h4>
                            <p>{project.description}</p>
                          </div>
                          <a className="text-link" href={project.embedUrl} target="_blank" rel="noopener noreferrer">
                            Open website <ArrowUpRight aria-hidden="true" />
                          </a>
                        </div>
                        <iframe
                          src={project.embedUrl}
                          title={`${project.title} live website`}
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </article>
                    ) : (
                    <button
                      type="button"
                      className="project-tile"
                      key={project.title}
                      onClick={() => openProject(project)}
                    >
                      <span className="project-tile-image">
                        <img
                          src={(project.thumbnail ?? project.images[0])?.src}
                          alt=""
                          width={(project.thumbnail ?? project.images[0])?.width}
                          height={(project.thumbnail ?? project.images[0])?.height}
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <span className="project-tile-copy">
                        <span className="eyebrow">{project.category}</span>
                        <strong>{project.title}</strong>
                        <span className="tile-action">Preview project <ArrowRight aria-hidden="true" /></span>
                      </span>
                    </button>
                    )
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
        <section id="about" className="about-section">
          <div className="section-wrap about-grid reveal-section" data-reveal>
            <h2 className="eyebrow">02 / A little about me</h2>
            <div className="about-portrait">
              <img
                src="/about/abrielle-jasmin-headshot.jpeg"
                alt="Portrait of Abrielle Jasmin"
                width="819"
                height="1024"
                loading="lazy"
                decoding="async"
              />
              <p className="eyebrow">Abrielle Jasmin</p>
            </div>
            <div className="about-copy">
              <h3>
                Curious about the systems.
                <br />
                <span className="serif">Thoughtful about the story.</span>
              </h3>
              <p>
                I’m a Computer Science major and Economics minor at Spelman College, a researcher
                working with AI and extended reality, and the newly appointed Events
                Coordinator for AUC Tech Collective.
              </p>
              <p>
                My interests sit where technology, business, and communication meet. I want to help
                people understand complex ideas through clear language and thoughtful visuals,
                bringing a research mindset to the stories I tell.
              </p>
              <p className="about-note">
                Learning, building, and finding clearer ways to communicate.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer id="contact" className="section-wrap footer reveal-section" data-reveal>
        <p className="eyebrow">03 / Contact</p>
        <h2>
          Let’s make ideas
          <br />
          <span className="serif">connect.</span>
        </h2>
        <p className="contact-intro">
          Interested in opportunities across social media, visual communication, and technology
          storytelling.
        </p>
        {hasContact && (
          <div className="contact-links">
            {contact.email && (
              <a className="text-link" href={`mailto:${contact.email}`}>
                {contact.email}
                <ArrowUpRight aria-hidden="true" />
              </a>
            )}
            {contact.linkedin && (
              <a className="text-link" href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
                <ArrowUpRight aria-hidden="true" />
              </a>
            )}
            {contact.resume && (
              <a className="text-link" href={contact.resume} download>
                Download résumé
                <ArrowDown aria-hidden="true" />
              </a>
            )}
          </div>
        )}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Abrielle Jasmin</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelectedProject(null);
          }}
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close project"
              onClick={() => setSelectedProject(null)}
            >
              <X aria-hidden="true" />
            </button>
            <div
              className="modal-preview"
              onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
              onTouchEnd={(event) => {
                if (touchStartX === null || selectedProject.images.length < 2) return;
                const endX = event.changedTouches[0]?.clientX ?? touchStartX;
                const distance = endX - touchStartX;
                if (Math.abs(distance) > 45) {
                  if (distance > 0) showPreviousImage();
                  else showNextImage();
                }
                setTouchStartX(null);
              }}
            >
              <img
                key={selectedProject.images[activeImageIndex]?.src}
                src={selectedProject.images[activeImageIndex]?.src}
                alt={selectedProject.images[activeImageIndex]?.alt}
                width={selectedProject.images[activeImageIndex]?.width}
                height={selectedProject.images[activeImageIndex]?.height}
              />
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="carousel-control carousel-control-left"
                    aria-label="Previous slide"
                    onClick={showPreviousImage}
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="carousel-control carousel-control-right"
                    aria-label="Next slide"
                    onClick={showNextImage}
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>
                  <div className="modal-slide-count" aria-live="polite">
                    {activeImageIndex + 1} / {selectedProject.images.length}
                  </div>
                </>
              )}
            </div>
            <div className="modal-copy">
              <p className="eyebrow">{selectedProject.collection}</p>
              <h2 id="project-modal-title">{selectedProject.title}</h2>
              <p className="modal-synopsis">{selectedProject.description}</p>
              <div className="modal-actions">
                <button
                  type="button"
                  className="primary-link modal-learn"
                  onClick={() => setShowCaseStudy((current) => !current)}
                >
                  {showCaseStudy ? "Show less" : "Read the case study"}
                  <ArrowDown aria-hidden="true" />
                </button>
                <a
                  className="text-link"
                  href={selectedProject.images[activeImageIndex]?.src}
                  target="_blank"
                  rel="noreferrer"
                >
                  Full-size artwork <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
              {showCaseStudy && (
                <div className="modal-case-study">
                  <dl className="modal-details">
                    {[
                      ["Brief", selectedProject.brief],
                      ["Intended audience", selectedProject.audience],
                      ["Design approach", selectedProject.approach],
                      ["My contribution", selectedProject.contribution],
                      ["Tools", selectedProject.tools.join(" · ")],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
