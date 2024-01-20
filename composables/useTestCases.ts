import type { ProblemTestCase, TestCase } from "@/types/testcase";
import { parse, type Rule, type Declaration } from "css";

export function useTestCases() {
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
          { name: "Centralized figure", passed: false, score: 2 },
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
                    hasFigureTagContainsInlineStyleDimensions = false;
                    hasFigureTagContainsGrayBgColor = false;
                    hasFigureTagContainsBorder = false;
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

              testCases[5].passed = hasCentralizeFigureTag;
              testCases[6].passed = hasFigureTagContainsInlineStyleDimensions;
              testCases[7].passed = hasFigureTagContainsGrayBgColor;
              testCases[8].passed = hasFigureTagContainsBorder;

              if (testCases[5].passed === true) {
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
          { name: "H1 heading", passed: false, score: 1 },
          { name: "Italic tag", passed: false, score: 1 },
          { name: "Table format ok", passed: false, score: 1 },
          { name: "Date input", passed: false, score: 1 },
          { name: "Color input", passed: false, score: 1 },
          { name: "Number input", passed: false, score: 1 },
          { name: "Search input", passed: false, score: 1 },
          { name: "H2 heading", passed: false, score: 1 },
          { name: "Anchor link", passed: false, score: 1 },
          { name: "Unordered list", passed: false, score: 1 },
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
    {
      problem_name: "UNIVERSAL",
      validate(code: string): TestCase[] {
        const testCases = [
          {
            name: "All elements margin",
            passed: false,
            score: 3,
          },
          {
            name: "All elements padding",
            passed: false,
            score: 3,
          },
          {
            name: "All elements within div color",
            passed: false,
            score: 3,
          },
          {
            name: "All elements within div display",
            passed: false,
            score: 3,
          },
          {
            name: "All elements within div bg color",
            passed: false,
            score: 3,
          },
          {
            name: "Div immediate child p font weight",
            passed: false,
            score: 3,
          },
          {
            name: "Div immediate child p color",
            passed: false,
            score: 3,
          },
          {
            name: "Div immediate child p bg color",
            passed: false,
            score: 3,
          },
          {
            name: "Div direct child p color",
            passed: false,
            score: 3,
          },
          {
            name: "Div direct child p bg color",
            passed: false,
            score: 3,
          },
        ];

        try {
          const rulesTestCases = [
            `*{
              margin: 0px;
            }`,
            `*{
              padding: 2px;
            }`,
            `div#div1 *{
              color: rgb(255,0,0);
            }`,
            `div#div1 *{
              display: block;
            }`,
            `div#div1 *{
              background-color: rgb(0,128,0);
            }`,
            `div#div1 + p{
              font-weight: bold;
            }`,
            `div#div1 + p{
              color: rgb(0,128,0);
            }`,
            `div#div1 + p{
              background-color: rgb(255,0,0);
            }`,
            `div#div2 > p{
              color: rgb(255,255,0);
            }`,
            `div#div2 > p{
              background-color: rgb(0,0,255);
            }`,
          ];

          const userRules = parse(code).stylesheet!.rules;
          for (let i = 0; i < rulesTestCases.length; i++) {
            const testCaseRules = parse(rulesTestCases[i]).stylesheet!.rules;
            const isMatch = compareRules(userRules, testCaseRules);
            testCases[i].passed = isMatch;
          }
        } catch (error) {}

        return testCases;
      },
    },
    {
      problem_name: "Integers Sum",
      validate(code: string): TestCase[] {
        const testCases = [
          {
            name: "[1]",
            passed: false,
            score: 4,
          },
          {
            name: "[1,2,3]",
            passed: false,
            score: 4,
          },
          {
            name: "[]",
            passed: false,
            score: 4,
          },
          {
            name: "[5, -6, 7, -4, 2]",
            passed: false,
            score: 4,
          },
          {
            name: "[0]",
            passed: false,
            score: 4,
          },
        ];

        code = sanatizeCode(code);

        const regexPattern = /function\s+sum\(\)\s*\{[\s\S]*\}/;
        const isMatch = regexPattern.test(code);
        if (!isMatch) return testCases;

        try {
          let testCase;
          let testFunction;
          let result;

          const functionTestCases = [
            {
              testCases: [1],
              expected: 1,
            },
            {
              testCases: [1, 2, 3],
              expected: 6,
            },
            {
              testCases: [],
              expected: 0,
            },
            {
              testCases: [5, -6, 7, -4, 2],
              expected: 4,
            },
            {
              testCases: [0],
              expected: 0,
            },
          ];

          for (let i = 0; i < functionTestCases.length; i++) {
            testCase = code + `return sum(${functionTestCases[i].testCases})`;
            testFunction = new Function(testCase);
            result = testFunction();
            if (result === functionTestCases[i].expected)
              testCases[i].passed = true;
          }
        } catch (error) {}

        return testCases;
      },
    },
    {
      problem_name: "STATIC PAGE",
      validate(code: string): TestCase[] {
        const testCases = [
          {
            name: "Body bg color",
            passed: false,
            score: 1,
          },
          {
            name: "H1 alignment and color",
            passed: false,
            score: 1,
          },
          {
            name: "Textarea font family and color",
            passed: false,
            score: 1,
          },
          {
            name: "Anchor tag decoration",
            passed: false,
            score: 1,
          },
          {
            name: "Div padding",
            passed: false,
            score: 1,
          },
          {
            name: "Class alignment",
            passed: false,
            score: 1,
          },
          {
            name: "Div minimum height",
            passed: false,
            score: 1,
          },
          {
            name: "Div maximum height",
            passed: false,
            score: 1,
          },
          {
            name: "Div overflow",
            passed: false,
            score: 1,
          },
          {
            name: "Div width and border",
            passed: false,
            score: 1,
          },
        ];

        try {
          const rulesTestCases = [
            `body{
              background-color: rgb(128,128,128);
            }`,
            `h1{
              text-align:center;
              color: rgb(0,255,255);
              }`,
            `textarea#textarea1{
              font-family: Arial;
              color: rgb(0,0,255);
              }`,
            `a{
              text-decoration:none;
              }`,
            `div#div1{
              padding:20px;
              }`,
            `.class1{
              text-align:right;
              }
              `,
            `div#div2{
              min-height:10px;
              }`,
            `div#div3{
              max-height:20px;
              }
              `,
            `div#div4{
              overflow:scroll;
              }`,
            `div#div5{
              width:250px;
              border-width:2px;
              border-style:solid;
              }`,
          ];

          const userRules = parse(code).stylesheet!.rules;
          for (let i = 0; i < rulesTestCases.length; i++) {
            const testCaseRules = parse(rulesTestCases[i]).stylesheet!.rules;
            const isMatch = compareRules(userRules, testCaseRules);
            testCases[i].passed = isMatch;
          }
        } catch (error) {}

        return testCases;
      },
    },
    {
      problem_name: "Form Page",
      validate: (code: string): TestCase[] => {
        const testCases = [
          { name: "Dropdown list", passed: false, score: 2 },
          { name: "Editable list", passed: false, score: 2 },
          { name: "Form action", passed: false, score: 2 },
          { name: "Form input", passed: false, score: 2 },
          { name: "Form input pattern", passed: false, score: 2 },
          { name: "Form input color", passed: false, score: 2 },
          { name: "Form input date", passed: false, score: 2 },
          { name: "Form input email", passed: false, score: 2 },
          { name: "Form input file", passed: false, score: 2 },
          { name: "Form input hidden", passed: false, score: 2 },
        ];

        const parser = new DOMParser();
        const htmlBody = parser.parseFromString(code, "text/html").body;

        const select = htmlBody.querySelector("select");
        if (select?.name === "selectgroup") {
          const optGroup = Array.from(select.querySelectorAll("optgroup"));
          if (optGroup.length === 3) {
            const groupA = optGroup[0];
            const groupB = optGroup[1];
            const groupC = optGroup[2];

            const groupAOptions = Array.from(groupA.querySelectorAll("option"));
            const groupBOptions = Array.from(groupB.querySelectorAll("option"));
            const groupCOptions = Array.from(groupC.querySelectorAll("option"));

            if (
              groupA.label === "Group A" &&
              groupAOptions.length === 2 &&
              groupB.label === "Group B" &&
              groupBOptions.length === 2 &&
              groupC.label === "Group C" &&
              groupCOptions.length === 2
            ) {
              const aa = groupAOptions[0];
              const ab = groupAOptions[1];
              const ba = groupBOptions[0];
              const bb = groupBOptions[1];
              const ca = groupCOptions[0];
              const cb = groupCOptions[1];
              if (
                aa.textContent === "AA" &&
                ab.textContent === "AB" &&
                ba.textContent === "BA" &&
                bb.textContent === "BB" &&
                ca.textContent === "CA" &&
                cb.textContent === "CB"
              )
                testCases[0].passed = true;
            }
          }
        }

        const ul = htmlBody.querySelector("ul");
        if (ul) {
          const li = Array.from(ul.querySelectorAll("li"));
          if (li.length === 3) {
            const a = li[0];
            const b = li[1];
            const c = li[2];
            if (
              a.contentEditable === "true" &&
              a.textContent === "A" &&
              b.contentEditable === "true" &&
              b.textContent === "B" &&
              c.contentEditable === "true" &&
              c.textContent === "C"
            )
              testCases[1].passed = true;
          }
        }

        const form = htmlBody.querySelector<HTMLFormElement>("form");
        if (form) {
          if (
            form.method.toUpperCase().trim() === "POST" &&
            form.getAttribute("action")?.trim() === "" &&
            form.id === "form1"
          ) {
            const button = form.querySelector("button");
            if (button?.type === "submit") testCases[2].passed = true;
          }

          const inputRequired =
            form.querySelector<HTMLInputElement>("input#textid1");

          if (inputRequired?.type === "text" && inputRequired.required)
            testCases[3].passed = true;

          const inputPatternRequired =
            form.querySelector<HTMLInputElement>("input#textid2");

          if (
            inputPatternRequired?.type === "text" &&
            inputPatternRequired.required &&
            (inputPatternRequired.pattern === "[A-Za-z]{6,10}" ||
              inputPatternRequired.pattern === "[a-zA-Z]{6,10}")
          )
            testCases[4].passed = true;

          const inputColor =
            form.querySelector<HTMLInputElement>("input#icolor1");

          if (inputColor?.type === "color") testCases[5].passed = true;

          const inputDate =
            form.querySelector<HTMLInputElement>("input#idate1");

          if (inputDate?.type === "date") testCases[6].passed = true;

          const inputEmail =
            form.querySelector<HTMLInputElement>("input#iemail1");

          if (inputEmail?.type === "email") testCases[7].passed = true;

          const inputFile =
            form.querySelector<HTMLInputElement>("input#ifile1");

          if (inputFile?.type === "file") testCases[8].passed = true;

          const inputHidden =
            form.querySelector<HTMLInputElement>("input#ihidden1");

          if (inputHidden?.type === "hidden") testCases[9].passed = true;
        }

        return testCases;
      },
    },
  ];

  const selectProblem = (problem: string) => {
    return testCases.find((x) => x.problem_name === problem);
  };

  return { selectProblem };
}

const compareRules = (userRules: Rule[], testCaseRules: Rule[]) => {
  try {
    let isMatch = false;
    testCaseRules.forEach((testCaseRule) => {
      const testCaseSelector = normalizeWhitespace(
        testCaseRule.selectors!
      ).trim();
      userRules.forEach((userRule) => {
        const userSelector = normalizeWhitespace(userRule.selectors!).trim();
        if (userSelector!.trim() === testCaseSelector!.trim()) {
          isMatch = !!testCaseRule.declarations?.every((x: Declaration) =>
            userRule.declarations?.some(
              (y: Declaration) =>
                x.property!.trim() === y.property!.trim() &&
                removeWhitespace(x.value!) === removeWhitespace(y.value!)
            )
          );
        }
      });
    });

    return isMatch;
  } catch (error) {
    return false;
  }
};

const normalizeWhitespace = (str: string[]): string => {
  return str.map((s) => s.replace(/\s+/g, " ").trim()).join(", ");
};

const removeWhitespace = (str: string) => {
  return str.replace(/\s/g, "");
};

const sanatizeCode = (code: string) => {
  const keywords = [
    "document\\..*;*",
    "window\\..*;*",
    "alert\\(.*\\);*",
    "eval\\(.*\\);*",
    "new Function\\(.*\\);*",
    "XMLHttpRequest\\(.*\\);*",
    "fetch\\(.*\\);*",
    "setTimeout\\(.*\\);*",
    "setInterval\\(.*\\);*",
    "location\\..*",
    "history\\..*",
    "localStorage\\..*",
    "sessionStorage\\..*",
    "close\\(.*\\);*",
    "open\\(.*\\);*",
    "confirm\\(.*\\);*",
    "prompt\\(.*\\);*",
    "navigator\\..*",
    "indexedDB\\..*",
    "console\\..*",
  ];

  // Combine the keywords into a single regex pattern
  const regexPattern = new RegExp(keywords.join("|"), "g");

  // Remove occurrences of specified keywords
  const modifiedCode = code.replace(regexPattern, "");

  return modifiedCode;
};
