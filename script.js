function processCSV() {
    const fileInput = document.getElementById('fileInput');
    const resultsDiv = document.getElementById('results');

    if (!fileInput.files.length) {
        alert('Please select a file!');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const text = event.target.result;
        const rows = text.split('\n');
        let activeUsers = [];
        let disabledUsers = [];

        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length >= 2) {
                activeUsers.push(columns[0].trim());
                disabledUsers.push(columns[1].trim());
            }
        });

        activeUsers = activeUsers.filter(user => user); // Remove empty entries
        disabledUsers = disabledUsers.filter(user => user); // Remove empty entries

        const duplicateUsers = activeUsers.filter(user => disabledUsers.includes(user));

        let results = `
            <p>Active Users Count: ${activeUsers.length}</p>
            <p>Disabled Users Count: ${disabledUsers.length}</p>
            <p>Total Users Count: ${activeUsers.length + disabledUsers.length}</p>
        `;

        if (duplicateUsers.length) {
            results += `<p style="color: red;">Error: There are disabled users on the active user list!</p>`;
        } else {
            results += `<p style="color: green;">Success: No disabled users found on the active user list.</p>`;
        }

        resultsDiv.innerHTML = results;
    };

    reader.readAsText(file);
}
