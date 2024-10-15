document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById('form'); //Get the form
    const studentTable = document.getElementById('student-table').getElementsByTagName('tbody')[0]; //Get the table body

    // Load existing students from localStorage or set an empty array if no data exists
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Function to update the localStorage with the latest student data
    const updateLocalStorage = () => {
        localStorage.setItem('students', JSON.stringify(students));
    };

    // Function to render the table with student data
    const renderTable = () => {
        studentTable.innerHTML = '';

        // Loop through each student and create a row for them in the table
        students.forEach((student, index) => {
            const row = studentTable.insertRow(); // Insert a new row
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            // Each row will have Edit and Delete buttons linked to the corresponding student index
        });
    };

    // Event listener for form submission
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        // Get the values entered in the form fields
        const name = document.getElementById('Name').value.trim();
        const id = document.getElementById('Id').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contactNo').value.trim();

        // Check if all fields have values before adding the student
        if (name && id && email && contact) {
            // Add the new student to the students array
            students.push({ name, id, email, contact });

            // Save the updated array to localStorage
            updateLocalStorage();

            // Re-render the table to show the new student
            renderTable();

            // Reset the form fields after submission
            studentForm.reset();
        }
    });

    // Function to edit a student's details
    window.editStudent = (index) => {
        // Get the student data for the selected index
        const student = students[index];

        // Populate the form fields with the selected student's details
        document.getElementById('Name').value = student.name;
        document.getElementById('Id').value = student.id;
        document.getElementById('email').value = student.email;
        document.getElementById('contactNo').value = student.contact;

        // Remove the selected student from the array temporarily (will be added again after editing)
        students.splice(index, 1);

        // Update the localStorage and re-render the table without the selected student
        updateLocalStorage();
        renderTable();
    };

    // Function to delete a student
    window.deleteStudent = (index) => {
        // Remove the student at the selected index from the array
        students.splice(index, 1);

        // Update localStorage and re-render the table after deletion
        updateLocalStorage();
        renderTable();
    };

    // Initial rendering of the student table when the page loads
    renderTable();
});
