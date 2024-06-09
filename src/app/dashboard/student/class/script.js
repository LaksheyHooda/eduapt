function renderAssignments(assignments) {
  const assignmentsBody = document.getElementById("assignmentsBody");
  assignmentsBody.innerHTML = "";
  assignments.forEach((assignment) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="border px-4 py-2">${assignment.moduleName}</td>
            <td class="border px-4 py-2">${assignment.assignmentName}</td>
            <td class="border px-4 py-2">${assignment.date}</td>
            <td class="border px-4 py-2">${assignment.grade}</td>
            <td class="border px-4 py-2">${assignment.status}</td>
        `;
    assignmentsBody.appendChild(row);
  });
}

export function sortByModuleName() {
  assignments.sort((a, b) => a.name.localeCompare(b.name));
  renderAssignments(assignments);
}

export function sortByAssignmentName() {
  assignments.sort((a, b) => a.name.localeCompare(b.name));
  renderAssignments(assignments);
}

export function sortByDate() {
  assignments.sort((a, b) => new Date(a.date) - new Date(b.date));
  renderAssignments(assignments);
}

export function sortByGrade() {
  assignments.sort((a, b) => a.grade.localeCompare(b.grade));
  renderAssignments(assignments);
}

export function sortByStatus() {
  assignments.sort((a, b) => a.status.localeCompare(b.status));
  renderAssignments(assignments);
}

// Initial render
renderAssignments(assignments);
