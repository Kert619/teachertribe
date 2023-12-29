import type { ProblemTestCase, TestCase } from "@/types/testcase";

export function useTestCases(problem: string) {
  const testCases: ProblemTestCase[] = [
    {
      problem_name: "Noughts and Crosses",
      validate: (code: string): TestCase[] => {
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
          { name: "Middle box letter", passed: false, score: 2 },
        ];

        const parser = new DOMParser();
        const htmlBody = parser.parseFromString(code, "text/html").body;

        const h1 = htmlBody.querySelector("h1");
        if (h1) {
          if (h1.textContent === "Noughts and crosses")
            testCases[0].passed = true;

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
      },
    },
    {
      problem_name: "General HTML",
      validate: (code: string): TestCase[] => {
        const testCases = [
          { name: "H1 heading", passed: false, score: 2 },
          { name: "Italic tag", passed: false, score: 2 },
          { name: "Table format ok", passed: false, score: 2 },
          { name: "Date input", passed: false, score: 2 },
          { name: "Color input", passed: false, score: 2 },
          { name: "Number input", passed: false, score: 2 },
          { name: "Search input", passed: false, score: 2 },
          { name: "H2 heading", passed: false, score: 2 },
          { name: "Anchor link", passed: false, score: 2 },
          { name: "Unordered list", passed: false, score: 2 },
        ];

        const parser = new DOMParser();
        const htmlBody = parser.parseFromString(code, "text/html").body;

        const h1 = htmlBody.querySelector("h1");
        if (h1 && h1.textContent === "Page Title") testCases[0].passed = true;

        const italic = htmlBody.querySelector("i");
        if (italic && italic.textContent === "page body")
          testCases[1].passed = true;

        const table = htmlBody.querySelector("table");
        if (table) {
          const rows = Array.from(table.querySelectorAll("tr"));
          if (rows.length === 2) {
            const rowOne = rows[0];
            const rowTwo = rows[1];

            const rowOneColumns = Array.from(rowOne.querySelectorAll("td"));
            const rowTwoColumns = Array.from(rowTwo.querySelectorAll("td"));

            if (rowOneColumns.length === 2 && rowTwoColumns.length === 2) {
              const rowOneColumnOne = rowOneColumns[0];
              const rowOneColumnTwo = rowOneColumns[1];
              const rowTwoColumnOne = rowTwoColumns[0];
              const rowTwoColumnTwo = rowTwoColumns[1];

              if (
                rowOneColumnOne.textContent === "C11" &&
                rowOneColumnTwo.textContent === "C12" &&
                rowTwoColumnOne.textContent === "C21" &&
                rowTwoColumnTwo.textContent === "C22"
              )
                testCases[2].passed = true;
            }
          }
        }

        const dateInput = htmlBody.querySelector('input[type="date"]');
        if (dateInput && dateInput.getAttribute("name") === "bday")
          testCases[3].passed = true;

        const colorInput = htmlBody.querySelector('input[type="color"]');
        if (colorInput && colorInput.getAttribute("name") === "icolor")
          testCases[4].passed = true;

        const numberInput = htmlBody.querySelector('input[type="number"]');
        if (
          numberInput &&
          numberInput.getAttribute("min") === "10" &&
          numberInput.getAttribute("max") === "12"
        )
          testCases[5].passed = true;

        const searchInput = htmlBody.querySelector('input[type="search"]');
        if (searchInput && searchInput.getAttribute("name") === "searchengine")
          testCases[6].passed = true;

        const h2Heading = htmlBody.querySelector("h2");
        if (
          h2Heading &&
          h2Heading.textContent === "Heading" &&
          h2Heading.style.backgroundColor === "rgb(30, 30, 255)"
        )
          testCases[7].passed = true;

        const anchorTag = htmlBody.querySelector("a");
        if (
          anchorTag &&
          anchorTag.textContent === "link url" &&
          anchorTag.getAttribute("href") === "url"
        )
          testCases[8].passed = true;

        const unorderedList = htmlBody.querySelector("ul");
        if (unorderedList) {
          const lists = Array.from(unorderedList.querySelectorAll("li"));
          if (lists.length === 3) {
            const listOne = lists[0];
            const listTwo = lists[1];
            const listThree = lists[2];

            if (
              listOne.textContent === "A" &&
              listTwo.textContent === "B" &&
              listThree.textContent === "C"
            )
              testCases[9].passed = true;
          }
        }

        return testCases;
      },
    },
  ];

  return testCases.find((x) => x.problem_name === problem);
}
