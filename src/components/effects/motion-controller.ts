import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { createScrollScenes } from "./scrollScenes";

export function createMotionController(scope: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  let refreshFrame = 0;

  media.add("(prefers-reduced-motion: no-preference)", () => {
    let dialogOpen = false;
    let disposed = false;
    let dialogLayout = { width: 0, height: 0 };
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -90 },
    });
    lenis.on("scroll", () => {
      if (!dialogOpen) ScrollTrigger.update();
    });
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    const modalListener = (event: Event) => {
      const open = (event as CustomEvent<{ open: boolean }>).detail.open;
      dialogOpen = open;
      scope.toggleAttribute("data-motion-paused", open);
      if (open) {
        dialogLayout = {
          width: document.documentElement.clientWidth,
          height: document.documentElement.scrollHeight,
        };
        cancelAnimationFrame(refreshFrame);
        lenis.stop();
        // A scrub tween keeps moving after native scroll has stopped. Hold
        // its current frame; ScrollTrigger restarts it on the next scroll.
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger && scope.contains(trigger.trigger)) {
            const tween = trigger.getTween();
            if (tween) tween.pause();
          }
        });
      } else {
        lenis.start();
        if (
          dialogLayout.width !== document.documentElement.clientWidth ||
          dialogLayout.height !== document.documentElement.scrollHeight
        )
          onLoad();
      }
    };
    window.addEventListener("fason:dialog", modalListener);
    const navigateListener = (event: Event) => {
      const detail = (
        event as CustomEvent<{
          href?: string;
          top?: number;
          immediate?: boolean;
        }>
      ).detail;
      if (typeof detail.top === "number") {
        event.preventDefault();
        lenis.scrollTo(detail.top, { immediate: detail.immediate });
        return;
      }
      const href = detail.href;
      if (!href) return;
      const target = scope.querySelector<HTMLElement>(href);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -100 });
    };
    window.addEventListener("fason:navigate", navigateListener);

    const removeSceneListeners: Array<() => void> = [];
    const context = gsap.context(() => {
      gsap.to(".hero-visual", {
        yPercent: 12,
        scale: 1.07,
        ease: "none",
        scrollTrigger: {
          trigger: "#acasa",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".hero-heading", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: "#acasa",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, scope);

    // Prepare each section shortly before it enters the viewport. Creating
    // every offscreen tween on the first frame delays the hero's first paint.
    const pendingSections = new Set(
      scope.querySelectorAll<HTMLElement>("main > section:not(#acasa)"),
    );
    const prepareSection = (section: HTMLElement) => {
      if (!pendingSections.delete(section)) return;
      context.add(() => {
        section
          .querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((element) => {
            gsap.from(element, {
              y: 22,
              opacity: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 93%",
                once: true,
              },
            });
          });
        removeSceneListeners.push(createScrollScenes(section));
        section
          .querySelectorAll<HTMLElement>("[data-parallax]")
          .forEach((element) => {
            const amount = Number(element.dataset.parallax) || 8;
            gsap.fromTo(
              element,
              { yPercent: -amount },
              {
                yPercent: amount,
                ease: "none",
                scrollTrigger: {
                  trigger: element.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          });
      });
    };
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          prepareSection(entry.target as HTMLElement);
          sectionObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px 25% 0px" },
    );
    pendingSections.forEach((section) => sectionObserver.observe(section));
    const prepareOnFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      for (const section of pendingSections) {
        if (section.contains(target)) {
          prepareSection(section);
          sectionObserver.unobserve(section);
          break;
        }
      }
    };
    scope.addEventListener("focusin", prepareOnFocus, true);

    const onLoad = () => {
      if (disposed || dialogOpen) return;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        if (!disposed && !dialogOpen) ScrollTrigger.refresh();
      });
    };
    window.addEventListener("load", onLoad);
    document.fonts.ready.then(onLoad);
    const images = Array.from(scope.querySelectorAll("img")).filter(
      (image) => !image.closest("dialog"),
    );
    images.forEach((image) => image.addEventListener("load", onLoad));
    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("fason:dialog", modalListener);
      scope.removeAttribute("data-motion-paused");
      window.removeEventListener("fason:navigate", navigateListener);
      images.forEach((image) => image.removeEventListener("load", onLoad));
      sectionObserver.disconnect();
      scope.removeEventListener("focusin", prepareOnFocus, true);
      removeSceneListeners.forEach((remove) => remove());
      context.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  });

  return () => {
    media.revert();
    cancelAnimationFrame(refreshFrame);
  };
}
