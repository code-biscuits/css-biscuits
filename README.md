# css-biscuits README

Use css-biscuits to make css soup and spaghetti more digestible. Annotate ALL the end brackets!!!

Watch the text by the end brackets to see Biscuits in action.

![](./example.gif)

Note: The explosion you see is [Power Mode](https://marketplace.visualstudio.com/items?itemName=hoovercj.vscode-power-mode)

## Warning! Potential Plugin Conflict

In the current implementation, code-biscuits prevent seeing GitLens annotations. Issue can be tracked here:
[https://github.com/code-biscuits/html-biscuits/issues/2](https://github.com/code-biscuits/html-biscuits/issues/2)

The HTML extension getting fixed will be the blueprint for fixing other extensions in the same way.

## Configuration

- `css-biscuits.annotationColor` _string_ : Determines the color of annotation. Accepts any valid CSS color string.

  - default: vscode.ThemeColor("editorLineNumber.foreground"),

- `css-biscuits.annotationPrefix` _string_ : Determines beginning of the annotation text. Empty string is acceptable.

  - default: `"// "`,

- `css-biscuits.annotationMinDistance` _number_ : Determines the minimum amount of lines between start and end tag used to decide to show the annotations.

  - default: `0`,

- `css-biscuits.annotationMaxLength` _number_ : What is the longest annotation you should see before we cut it off ewith a `...`? A 0 value shows the full string.

  - default: `80`,

- `html-biscuits.annotationCursorLineOnly` _boolean_ : Determines whether to show the biscuits on all lines or only the current cursor line. (Supports multi cursor editing)
  - default: `false`,

## Commands

As we add more commands to change functionality on the fly, we will document them here.

### Toggle Biscuits

You are now able to toggle the biscuits on and off using the VSCode Command `HTML Biscuits: Toggle Biscuits Showing`.

## Release Notes

### 0.0.7

Allow biscuits to be toggled and add option for cursorLineOnly.

### 0.0.5

Make sure this plugin only kicks in for css, less, and scss.

### 0.0.3

Use max length for biscuits

### 0.0.2

Update README

### 0.0.1

First tested public launch

## Attributions

- Logo: biscuit by Bartama Graphic from the Noun Project

## License

Copyright 2020 code-biscuits

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
