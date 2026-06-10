// @ts-nocheck
import * as __fd_glob_5 from "../content/docs/scoring.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/getting-started.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/faq.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/commands.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/changelog.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"changelog.mdx": __fd_glob_0, "commands.mdx": __fd_glob_1, "faq.mdx": __fd_glob_2, "getting-started.mdx": __fd_glob_3, "index.mdx": __fd_glob_4, "scoring.mdx": __fd_glob_5, });