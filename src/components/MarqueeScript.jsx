import React, { useEffect } from 'react';

const MarqueeScript = () => {
  useEffect(() => {
    // Define the horizontalLoop function
    window.horizontalLoop = function(items, config) {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({
          repeat: config.repeat,
          paused: config.paused,
          defaults: { ease: "none" },
          onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
        totalWidth,
        curX,
        distanceToStart,
        distanceToLoop,
        item,
        i;
      gsap.set(items, {
        xPercent: (i, el) => {
          let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
              gsap.getProperty(el, "xPercent")
          );
          return xPercents[i];
        },
      });
      gsap.set(items, { x: 0 });
      totalWidth =
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        items[length - 1].offsetWidth *
          gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0);
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop =
          distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      function toIndex(index, vars) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 &&
          (index += index > curIndex ? -length : length);
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
          vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
      }
      tl.next = (vars) => toIndex(curIndex + 1, vars);
      tl.previous = (vars) => toIndex(curIndex - 1, vars);
      tl.current = () => curIndex;
      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.times = times;
      tl.progress(1, true).progress(0, true);
      if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
      }
      return tl;
    };

    // Set up media queries for responsive behavior
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => restartMarquee(1, 0));
    mm.add("(min-width: 768px) and (max-width: 1024px) and (prefers-reduced-motion: no-preference)", () => restartMarquee(1, 0));
    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => restartMarquee(0.8, 0));
    
    function restartMarquee(speed, paddingRight) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        console.log("🛑 prefers-reduced-motion detected! Marquee will NOT start.");
        if (window.loop) {
          window.loop.kill();
          window.loop = null;
        }
    
        gsap.killTweensOf(".marquee-item");
        gsap.set(".marquee-item", { clearProps: "all" });
    
        document.querySelectorAll(".marquee-item").forEach(item => {
          item.style.transform = "translate(0, 0)";
          item.style.animation = "none";
        });
    
        return;
      }
    
      if (window.loop) {
        window.loop.kill();
        window.loop = null;
      }
    
      let direction = 1;
      const marqueeContainer = document.querySelector(".marquee-container");
    
      if (marqueeContainer) {
        marqueeContainer.addEventListener("mouseenter", () => {
          if (window.loop) window.loop.pause();
        });
    
        marqueeContainer.addEventListener("mouseleave", () => {
          if (window.loop) {
            direction *= -1;
            gsap.to(window.loop, { timeScale: direction, overwrite: true });
            window.loop.play();
          }
        });
    
        marqueeContainer.addEventListener("touchstart", (e) => {
          e.preventDefault();
          if (window.loop) window.loop.pause();
        });
    
        marqueeContainer.addEventListener("touchend", () => {
          if (window.loop) {
            direction *= -1;
            gsap.to(window.loop, { timeScale: direction, overwrite: true });
            window.loop.play();
          }
        });
    
        const marqueeItems = marqueeContainer.querySelectorAll(".marquee-item");
        if (marqueeItems.length) {
          window.loop = window.horizontalLoop(marqueeItems, {
            repeat: -1,
            speed: speed,
            paddingRight: paddingRight
          });
        }
      }
    }
  }, []);

  return null;
};

export default MarqueeScript;