export default function loadMainTemplate(pageName) {
  const contentContainer = document.createElement("div");
  contentContainer.className = "content-container";

  const pageHeader = document.createElement("header");
  pageHeader.className = "page-header";

  const h1 = document.createElement("h1");
  h1.textContent = pageName;

  const subtitle = document.createElement("p");
  subtitle.className = "subtitle";
  subtitle.textContent = `Manage your primary ${pageName.toLowerCase()} backlog.`;

  pageHeader.appendChild(h1);
  pageHeader.appendChild(subtitle);

  const taskList = document.createElement("div");
  taskList.className = "task-list";

  contentContainer.appendChild(pageHeader);
  contentContainer.appendChild(taskList);

  return contentContainer;
}
