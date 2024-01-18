// console.log("reff");

(async function () {
    const data = await fetch("./src/data.json")
    const res = await data.json();
    // console.log(res);
    let employees = res;
    let selectedEmployeesId = employees[0].id
    let selectedEmployeesInfo = employees[0]

    let employeesList = document.querySelector(".data_container")
    let employeesListInfo = document.querySelector(".data_of_single")

    employeesList.addEventListener("click", (e) => {
        if (e.target.tagName === 'SPAN' && selectedEmployeesId !== e.target.id) {
            selectedEmployeesId = e.target.id
            renderList()
            renderEmployeesData()
        }
        // !Employee Delete Logic - START
        if (e.target.tagName === "I") {
            employees = employees.filter(
                (emp) => String(emp.id) !== e.target.parentNode.id
            );
            if (String(selectedEmployeesId) === e.target.parentNode.id) {
                selectedEmployeesId = employees[0]?.id || -1;
                selectedEmployeesInfo = employees[0] || {};
                renderEmployeesData();
            }
            renderList();
        }
        //! Employee Delete Logic - END
    })
    //! add employees 
    const createEmployee = document.querySelector(".createEmployees")
    const addEmployees = document.querySelector(".add_employees")
    const addEmployeesForm = document.querySelector(".addEmployees-create")
    createEmployee.addEventListener("click", () => {
        addEmployees.style.display = "flex"
    })

    addEmployees.addEventListener("click", (e) => {
        if (e.target.className === "add_employees") {
            addEmployees.style.display = "none"
        }
    })
    addEmployeesForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formdata = new FormData(addEmployeesForm);
        const value = [...formdata.entries()]
        console.log(value);
        let empData = {};
        value.forEach((val) => {
            empData[val[0]] = val[1];
        });
        empData.id = employees[employees.length - 1].id + 1;
        empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
        empData.imageUrl =
            empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
        employees.push(empData);
        renderList();
        addEmployeesForm.reset();
        addEmployees.style.display = "none";
    })

    // ! render employee list 
    const renderList = async () => {
        employeesList.innerHTML = "";
        employees.forEach(emp => {
            const employees = document.createElement('span')
            employees.classList.add("employees-item-list");
            if (parseInt(selectedEmployeesId, 10) === emp.id) {
                employees.classList.add("selected");
                selectedEmployeesInfo = emp
            }
            employees.setAttribute("id", emp.id);
            employees.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;
            employeesList.append(employees)
        });
    }
    renderList();
    // ! render employee information 
    const renderEmployeesData = () => {
        // Employee Delete Logic - START
        if (selectedEmployeesId === -1) {
            employeesListInfo.innerHTML = "";
            return;
        } else {
            // Employee Delete Logic - END
            employeesListInfo.innerHTML = `
        <img src="${selectedEmployeesInfo.imageUrl}" />
        <span class="employees__single--heading">
        ${selectedEmployeesInfo.firstName} ${selectedEmployeesInfo.lastName} (${selectedEmployeesInfo.age})
        </span>
        <span>${selectedEmployeesInfo.address}</span>
        <span>${selectedEmployeesInfo.email}</span>
        <span>Mobile - ${selectedEmployeesInfo.contactNumber}</span>
        <span>DOB - ${selectedEmployeesInfo.dob}</span>`;
        }
    };

    if (selectedEmployeesInfo) renderEmployeesData();

})()