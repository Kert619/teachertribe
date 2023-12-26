import type { TestCase } from "@/types/testcase";

export const useNoughtsAndCrosses = (code: string): TestCase[] => {
  const testCases = [
    { name: "H1 heading", passed: false, score: 2 },
    { name: "H1 text-align attribute", passed: false, score: 2 },
    { name: "Table tag", passed: false, score: 2 },
    { name: "Table attributes", passed: false, score: 2 },
    { name: "Table format", passed: false, score: 2 },
    { name: "Figure style", passed: false, score: 2 },
    { name: "Figure dimension", passed: false, score: 2 },
    { name: "Figure background", passed: false, score: 2 },
    { name: "Figure border", passed: false, score: 2 },
    { name: 'Middle box letter "X"', passed: false, score: 2 },
  ];

  const parser = new DOMParser();
  const htmlBody = parser.parseFromString(code, "text/html").body;

  const h1 = htmlBody.querySelector("h1");
  if (h1) {
    if (h1.textContent === "Noughts and crosses") testCases[0].passed = true;

    if (h1.style.textAlign === "center") testCases[1].passed = true;
  }

  const table = htmlBody.querySelector("table");
  if (table) {
    testCases[2].passed = true;
    if (
      (table.getAttribute("border") === "1" ||
        table.getAttribute("border") === "1px") &&
      (table.getAttribute("width") === "100%" ||
        table.style.width === "100%") &&
      table.getAttribute("id") === "mytable"
    )
      testCases[3].passed = true;

    const rows = Array.from(table.querySelectorAll("tr"));
    if (rows.length === 3) {
      let hasThreeColumns = true;
      for (let i = 0; i < rows.length; i++) {
        const columns = Array.from(rows[i].querySelectorAll("td"));
        if (columns.length !== 3) {
          hasThreeColumns = false;
          break;
        }
      }

      if (hasThreeColumns) {
        testCases[4].passed = true;

        let hasCentralizeFigureTag = true;
        let hasFigureTagContainsInlineStyleDimensions = true;
        let hasFigureTagContainsGrayBgColor = true;
        let hasFigureTagContainsBorder = true;

        for (let i = 0; i < rows.length; i++) {
          const columns = Array.from(rows[i].querySelectorAll("td"));
          for (let x = 0; x < columns.length; x++) {
            const centerTag = columns[x].querySelector("center");
            const figureTag = centerTag?.querySelector("figure");
            if (!centerTag || !figureTag) {
              hasCentralizeFigureTag = false;
              break;
            } else {
              if (
                figureTag.style.width !== "200px" ||
                figureTag.style.height !== "200px"
              )
                hasFigureTagContainsInlineStyleDimensions = false;

              if (figureTag.style.backgroundColor !== "gray")
                hasFigureTagContainsGrayBgColor = false;

              if (
                figureTag.style.borderWidth !== "1px" ||
                figureTag.style.borderStyle !== "solid" ||
                figureTag.style.borderColor !== "black"
              )
                hasFigureTagContainsBorder = false;
            }
          }
        }
        if (hasCentralizeFigureTag) testCases[5].passed = true;
        if (hasFigureTagContainsInlineStyleDimensions)
          testCases[6].passed = true;
        if (hasFigureTagContainsGrayBgColor) testCases[7].passed = true;
        if (hasFigureTagContainsBorder) testCases[8].passed = true;

        if ((testCases[5].passed = true)) {
          const middleBox = rows[1]
            .querySelectorAll("td")[1]
            .querySelector("center")
            ?.querySelector("figure");

          if (
            middleBox &&
            middleBox.style.fontSize === "100px" &&
            middleBox.textContent === "X"
          )
            testCases[9].passed = true;
        }
      }
    }
  }

  return testCases;
};
