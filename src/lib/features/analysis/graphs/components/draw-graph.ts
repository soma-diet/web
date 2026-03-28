const GRAPH_WIDTH_PX = 400;
const GRAPH_HEIGHT_PX = 300;
const BAR_SPACE_PX = 10;
const GRAPH_TOP_SPACING_PX = 30;
const GRAPH_BOTTOM_SPACING_PX = 30;

// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
const createSvgElement = (element: string) =>
  document.createElementNS("http://www.w3.org/2000/svg", element);

function createBarGraphSvg(dates: string[], data: number[]): SVGElement {
  if (dates.length !== data.length) {
    throw new Error("Dates and data must have the same amount of items!");
  }

  const max = Math.max(...data); // rozbali data a vybere max hodnotu
  const barWidth = GRAPH_WIDTH_PX / data.length - BAR_SPACE_PX;

  const svg = createSvgElement("svg");
  svg.setAttribute("width", GRAPH_WIDTH_PX.toString());
  svg.setAttribute("height", GRAPH_HEIGHT_PX.toString());
  svg.setAttribute("viewBox", `0 0 ${GRAPH_WIDTH_PX} ${GRAPH_HEIGHT_PX}`);

  data.forEach((value, i) => {
    const barHeight =
      (value / max) *
      (GRAPH_HEIGHT_PX - GRAPH_TOP_SPACING_PX - GRAPH_BOTTOM_SPACING_PX);

    const x = i * (barWidth + BAR_SPACE_PX) + BAR_SPACE_PX / 2;
    const y = GRAPH_HEIGHT_PX - barHeight - GRAPH_BOTTOM_SPACING_PX;

    const group = createSvgElement("g"); // svg varianta div

    const valText = createSvgElement("text");
    const valTextX = x + barWidth / 2; // stred baru
    const valTextY = y - GRAPH_TOP_SPACING_PX / 2; // umisteni textu nad bar
    valText.setAttribute("x", valTextX.toString());
    valText.setAttribute("y", valTextY.toString());
    valText.classList.add("value");
    valText.textContent = value.toString();

    const rect = createSvgElement("rect");
    rect.setAttribute("x", x.toString());
    rect.setAttribute("y", y.toString());
    rect.setAttribute("width", barWidth.toString());
    rect.setAttribute("height", barHeight.toString());

    const dateText = createSvgElement("text");
    const dateTextX = valTextX; // stred baru
    const dateTextY = GRAPH_HEIGHT_PX - GRAPH_BOTTOM_SPACING_PX / 2;
    dateText.setAttribute("x", dateTextX.toString());
    dateText.setAttribute("y", dateTextY.toString());
    dateText.classList.add("date");
    dateText.textContent = dates[i]!;

    // general styling
    valText.setAttribute("text-anchor", "middle");
    dateText.setAttribute("text-anchor", "middle");

    group.append(rect, valText, dateText);
    svg.append(group);
  });

  return svg;
}

export default createBarGraphSvg;
