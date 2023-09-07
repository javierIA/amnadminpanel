document.addEventListener('DOMContentLoaded', function() {
    const expectedColumns = [
        "first_name", "last_name", "username", "email", "date_birth",
        "email_alt", "tel_num", "tel_num_emergency", "company_name",
        "is_employee", "password", "use_face_recognition", "hash_face_recognition"
    ];

    document.getElementById('readExcel').addEventListener('click', function() {
        const file = document.getElementById('upload').files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const data = e.target.result;
                const workbook = XLSX.read(data, {
                    type: 'binary'
                });
                
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                
                const jsonOutput = XLSX.utils.sheet_to_json(worksheet, {header: 1, raw: true});

                // Check columns
                if (!areColumnsValid(jsonOutput[0])) {
                    alert("El archivo Excel no contiene las columnas esperadas.");
                    return;
                }

                displayData(jsonOutput);
            };

            reader.readAsBinaryString(file);
        }
    });

    function areColumnsValid(columnsInFile) {
        if (!columnsInFile.length) return false;  // No columns

        return expectedColumns.every(column => columnsInFile.includes(column));
    }
    function displayTable(data) {
        const table = document.getElementById('output');
        table.innerHTML = ''; // Clear the table
    
        // Create table headers
        const headers = data[0]; // Using first row as headers
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
    
        // Create table rows
        for (let i = 1; i < data.length; i++) { // Starting from the second row (index 1)
            const tr = document.createElement('tr');
            data[i].forEach(cellValue => {
                const td = document.createElement('td');
                td.textContent = cellValue;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        }
    }
    
    async function displayData(data) {
        displayTable(data); // Display the table first
    
        for (let i = 1; i < data.length; i++) {
            const rowData = {};
            data[0].forEach((header, index) => {
                rowData[header] = header === "date_birth" ? new Date(data[i][index]).toISOString().split('T')[0] : data[i][index];
            });
            // Wait until the data is uploaded before moving to the next one
            await uploadData(rowData);
        }
    }
    
    async function uploadData(data) {
        const url = "https://api.loclx.io/api/v1/users/";
        const headers = {
            "accept": "application/json",
            "Content-Type": "application/json",
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) { 
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();
            console.log("Data uploaded and response received:", json);
        } catch (error) {
            alert("Error al subir los datos a la API. " + error);
        }
    }
    
    document.getElementById('createAdmin').addEventListener('click', function() {
        const adminData = {
            first_name: "Admin",
            last_name: "Admin",
            username: "Admin",
            email: "Admin@admin.com.mx",
            password: "AMNI3CENT3R",
            is_employee: true,
            use_face_recognition: false,
            position: null,
            is_admin: true,
            hash_face_recognition: null,
        };
        
        uploadData(adminData);
    });
});