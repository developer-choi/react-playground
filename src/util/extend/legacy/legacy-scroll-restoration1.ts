import {useEffect} from "react";
import {useRouter} from "next/router";

// https://coffeeandcakeandnewjeong.tistory.com/94
export function useScrollRestorationSolution1() {
  const router = useRouter();

  useEffect(() => {
    window.history.scrollRestoration = "auto";

    const cacheScrollPositions: Array<[number, number]> = [];
    let shouldScrollRestore: null | {x: number; y: number};

    router.events.on("routeChangeStart", () => {
      cacheScrollPositions.push([window.scrollX, window.scrollY]);
    });

    router.events.on("routeChangeComplete", () => {
      if (shouldScrollRestore) {
        const {x, y} = shouldScrollRestore;
        setTimeout(() => window.scrollTo({top: y, left: x, behavior: "smooth"}), 0);
        shouldScrollRestore = null;
      }
      window.history.scrollRestoration = "auto";
    });

    router.beforePopState(() => {
      if (cacheScrollPositions.length > 0) {
        const scrollPosition = cacheScrollPositions.pop();
        if (scrollPosition) {
          shouldScrollRestore = {
            x: scrollPosition[0],
            y: scrollPosition[1]
          };
        }
      }
      window.history.scrollRestoration = "manual";
      return true;
    });
  }, [router]);
}
