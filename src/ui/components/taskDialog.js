import '../../styles/taskDialog.css';

export default function createTaskDetailsDialog(todo) {
  // 1. Create the dialog element
  const dialog = document.createElement("dialog");
  dialog.id = "taskDialog";
  dialog.className = "task-dialog";

  // --- Header Section ---
  const header = document.createElement("div");
  header.className = "dialog-header";

  const headerTop = document.createElement("div");
  headerTop.className = "dialog-header-top";

  const projectTag = document.createElement("span");
  projectTag.className = "project-tag";
  projectTag.textContent = `Project: ${todo.projectName}`;

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  // Best practice: Use event listener instead of inline onclick attribute
  closeBtn.addEventListener("click", () => dialog.close());

  const closeIcon = document.createElement("span");
  closeIcon.classList.add("material-symbols-outlined", "filled");
  closeIcon.textContent = "close";

  closeBtn.appendChild(closeIcon);
  headerTop.appendChild(projectTag);
  headerTop.appendChild(closeBtn);

  const title = document.createElement("h1");
  title.className = "task-dialog-title";
  title.textContent = todo.title;

  header.appendChild(headerTop);
  header.appendChild(title);
  dialog.appendChild(header);

  // --- Content Area ---
  const contentArea = document.createElement("div");
  contentArea.className = "content-area";

  // --- Metadata Grid ---
  const metaGrid = document.createElement("div");
  metaGrid.className = "meta-grid";

  // Helper Function: Keeps DOM generation clean for repeating elements
  const createMetaItem = (labelText, iconName, valueText, boxClass) => {
    const metaItem = document.createElement("div");
    metaItem.className = "meta-item";

    const metaLabel = document.createElement("span");
    metaLabel.className = "meta-label";
    metaLabel.textContent = labelText;

    const metaBox = document.createElement("div");
    metaBox.className = `meta-box ${boxClass}`;

    const icon = document.createElement("span");
    icon.classList.add("material-symbols-outlined", "filled");
    // icon.style.cssText = iconStyles; // Apply inline styles for specific icons
    icon.textContent = iconName;

    const text = document.createElement("span");
    text.className = "meta-text";
    text.textContent = valueText;

    metaBox.appendChild(icon);
    metaBox.appendChild(text);
    metaItem.appendChild(metaLabel);
    metaItem.appendChild(metaBox);

    return metaItem;
  };

  // 1. Status Meta Item (Dynamic based on todo.completed)
  const statusText = todo.completed ? "Completed" : "In Progress";
  const statusIcon = todo.completed ? "check_circle" : "sync";
  metaGrid.appendChild(
    createMetaItem(
      "Status",
      statusIcon,
      statusText,
      "status-box"
    )
  );

  // 2. Due Date Meta Item
  metaGrid.appendChild(
    createMetaItem(
      "Due Date",
      "calendar_today",
      todo.dueDate,
      "date-box"
    )
  );

  // 3. Priority Meta Item
  metaGrid.appendChild(
    createMetaItem(
      "Priority",
      "priority_high",
      todo.priority,
      "priority-box"
    )
  );

  contentArea.appendChild(metaGrid);

  // --- Description Section ---
  const descSection = document.createElement("div");
  descSection.className = "desc-section";

  const descHeader = document.createElement("div");
  descHeader.className = "desc-header";

  const descIcon = document.createElement("span");
  descIcon.classList.add("material-symbols-outlined", "filled");
//   descIcon.style.fontSize = "20px";
  descIcon.textContent = "description";

  const descHeaderText = document.createElement("span");
  descHeaderText.className = "desc-header-text";
  descHeaderText.textContent = "Description";

  descHeader.appendChild(descIcon);
  descHeader.appendChild(descHeaderText);

  const descPara = document.createElement("p");
  descPara.className = "task-description";
  descPara.textContent = todo.description;

  descSection.appendChild(descHeader);
  descSection.appendChild(descPara);

  contentArea.appendChild(descSection);
  dialog.appendChild(contentArea);

  return dialog;
}