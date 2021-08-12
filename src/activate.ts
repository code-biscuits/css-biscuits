import vscode, { Range, TextDocument as RawTextDocument } from "vscode";
import { createActivate } from "biscuits-base";

import * as cssCore from "vscode-css-languageservice";
import { FoldingRange } from "vscode-css-languageservice";

// Needs to be genericized
const CONFIG_PREFIX_KEY = "css-biscuits.annotationPrefix";
const CONFIG_COLOR_KEY = "css-biscuits.annotationColor";
const CONFIG_DISTANCE_KEY = "css-biscuits.annotationMinDistance";
const CONFIG_MAX_LENGTH = "css-biscuits.annotationMaxLength";
const CONFIG_CURSOR_LINE_ONLY_KEY = "css-biscuits.annotationCursorLineOnly";
const COMMAND_TOGGLE_BISCUITS = "css-biscuits.toggleBiscuitsShowing";

export const activate = createActivate(
  CONFIG_COLOR_KEY,
  CONFIG_DISTANCE_KEY,
  CONFIG_PREFIX_KEY,
  CONFIG_CURSOR_LINE_ONLY_KEY,
  COMMAND_TOGGLE_BISCUITS,
  {
    async createDecorations(
      text: string,
      activeEditor: vscode.TextEditor,
      prefix: string,
      minDistance: number,
      cursorLineOnly: boolean,
      cursorLines: any[],
      shouldHideBiscuits: boolean,
      context?: vscode.ExtensionContext
    ) {
      const rawTextDocument = { ...activeEditor.document } as any;
      rawTextDocument.uri = rawTextDocument.uri.toString();
      const textDocument = rawTextDocument as cssCore.TextDocument;

      if (
        ["less", "scss", "css"].indexOf(activeEditor.document.languageId) === -1
      ) {
        // we should only be handling "less", "scss", and "css" files for now
        return [];
      }

      let css = cssCore.getSCSSLanguageService();
      if (activeEditor.document.languageId === "less") {
        css = cssCore.getLESSLanguageService();
      }

      const ranges = css.getFoldingRanges(textDocument);

      const decorations: any[] = [];

      ranges.forEach((range: FoldingRange) => {
        const endLine = range.endLine + 1;
        const startLine = range.startLine;

        let contentText = activeEditor.document.lineAt(startLine).text.trim();

        if (contentText.charAt(0) === "{") {
          contentText = activeEditor.document.lineAt(startLine - 1).text.trim();
        }

        if (contentText.charAt(contentText.length - 1) === "{") {
          contentText = contentText.slice(0, contentText.length - 2);
        }

        let maxLength: number =
          vscode.workspace.getConfiguration().get(CONFIG_MAX_LENGTH) || 0;

        if (maxLength && contentText.length > maxLength) {
          contentText = contentText.substr(0, maxLength) + "...";
        }

        const endOfLine = activeEditor.document.lineAt(endLine).range.end;

        if (
          maxLength > 0 &&
          !shouldHideBiscuits &&
          ((!cursorLineOnly && endLine - startLine >= minDistance) ||
            (cursorLineOnly && cursorLines.indexOf(endLine) > -1))
        ) {
          decorations.push({
            range: new vscode.Range(
              activeEditor.document.positionAt(endLine),
              endOfLine
            ),
            renderOptions: {
              after: {
                contentText: `${prefix} ${contentText}`,
              },
            },
          });
        }
      });

      return decorations;
    },
  }
);
