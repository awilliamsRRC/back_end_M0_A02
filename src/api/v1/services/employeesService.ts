export type Employee = {
    id: string;
    name: string;
    position: string;
    email:string;
    phone:string;
    branchId: number;
    department: string;
};

const employees: Employee[] = [];

export const serviceGetAllEmployees = async (): Promise<Employee[]> => {
    return employees;
};

export const serviceCreateEmployee = async (employee: {
    // id: string;
    name: string;
    position: string;
    email:string;
    phone:string;
    branchId: number;
    department: string;
}): Promise<Employee> => {
    // the ... is the spread operator in js/ts and is the same as writing { name: item.name, description: item.description }
    const newEmployee: Employee = { id: Date.now().toString(), ...employee };

    // adding the new item to the global scoped array of Items
    employees.push(newEmployee);
    return newEmployee;
};

export const serviceUpdateEmployee = async (
    id: string,
    employeeUpdate: Employee
): Promise<Employee> => {
    // retieve the item's index from the items array by comparing the item ids
    const index: number = employees.findIndex((i) => i.id === id);
    // if the index is not found we expects a -1
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    // assign the new value of the found index
    employees[index] = {   ...employeeUpdate, id: employees[index].id };

    return employees[index];
};

export const serviceDeleteEmployee = async (id: string): Promise<void> => {
    const index: number = employees.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    // remove the item from the Item array, start the delete form the index and only delete 1 index
    employees.splice(index, 1);
};