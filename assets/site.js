
document.addEventListener("click", (event) => {
  const button = event.target.closest(".history-close");
  if (!button) return;

  const details = button.closest("details");
  const card = button.closest(".unit-card");
  if (details) details.open = false;
  if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-sort-column]");
  if (!button) return;

  const table = button.closest("table");
  const tbody = table?.querySelector("tbody");
  if (!table || !tbody) return;

  const column = Number(button.dataset.sortColumn);
  const type = button.dataset.sortType || "text";
  const current = button.getAttribute("aria-sort");
  const direction = current === "ascending" ? "descending" : "ascending";

  table.querySelectorAll("[data-sort-column]").forEach((item) => {
    item.setAttribute("aria-sort", "none");
  });
  button.setAttribute("aria-sort", direction);

  const rows = Array.from(tbody.querySelectorAll("tr"));
  rows.sort((a, b) => {
    const aCell = a.children[column];
    const bCell = b.children[column];
    const aRaw = aCell?.dataset.sortValue ?? aCell?.textContent?.trim() ?? "";
    const bRaw = bCell?.dataset.sortValue ?? bCell?.textContent?.trim() ?? "";

    let result;
    if (type === "number") {
      const aNumber = aRaw === "" ? Number.NEGATIVE_INFINITY : Number(aRaw);
      const bNumber = bRaw === "" ? Number.NEGATIVE_INFINITY : Number(bRaw);
      result = aNumber - bNumber;
    } else {
      result = aRaw.localeCompare(bRaw, "ja", { numeric: true, sensitivity: "base" });
    }

    return direction === "ascending" ? result : -result;
  });

  rows.forEach((row) => tbody.appendChild(row));
});
