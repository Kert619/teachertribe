import type { TestCase } from "@/types/testcase";

export const useGeneralHtml = (code: string): TestCase[] => {
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
  if (italic && italic.textContent === "page body") testCases[1].passed = true;

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
};
