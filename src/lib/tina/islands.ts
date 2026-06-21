import type { IslandRegistry } from "@tinacms/astro/experimental";
import type { QueryResult } from "@tinacms/astro/data";
import type { HomeQuery } from "../../../tina/__generated__/types";
import type { HomeContent } from "@/data/home";
import HomePage from "@/components/tina/HomePage.astro";
import { getHome } from "./data";

export const islands: IslandRegistry = {
  home: {
    fetch: () => getHome(),
    component: HomePage,
    wrapper: { tag: "div" },
    propsFromData: (result) => ({
      home: (result as QueryResult<HomeQuery>).data.home as unknown as HomeContent,
    }),
  },
};
