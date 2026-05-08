// source.config.ts
import path from "node:path";
import ts from "typescript";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { transformerTwoslash } from "fumadocs-twoslash";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight
} from "@shikijs/transformers";
import { remarkNpm, remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true
    }
  },
  meta: {
    schema: metaSchema
  }
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [
      remarkMdxMermaid,
      [remarkNpm, { persist: { id: "package-manager" } }]
    ],
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark"
      },
      transformers: [
        ...rehypeCodeDefaultOptions.transformers ?? [],
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
        transformerNotationWordHighlight(),
        transformerTwoslash({
          twoslashOptions: {
            compilerOptions: {
              baseUrl: path.resolve(import.meta.dirname, "."),
              module: ts.ModuleKind.ESNext,
              moduleResolution: ts.ModuleResolutionKind.Bundler,
              target: ts.ScriptTarget.ESNext,
              lib: ["esnext", "dom", "dom.iterable"],
              jsx: ts.JsxEmit.ReactJSX,
              jsxImportSource: "react",
              allowSyntheticDefaultImports: true,
              esModuleInterop: true,
              types: ["node", "react", "react-dom", "bun"],
              paths: {}
            }
          }
        })
      ]
    }
  }
});
export {
  source_config_default as default,
  docs
};
