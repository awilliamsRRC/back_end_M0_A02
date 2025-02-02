export type Branch = {
    id: string;
    name: string;
    address: string;
    phone:string;
};

const branches: Branch[] = [];

export const serviceGetAllBranches = async (): Promise<Branch[]> => {
    return branches;
};

export const serviceCreateBranches = async (branch: {
    // id: string;
    name: string;
    address: string;
    phone: string;
}): Promise<Branch> => {
    // the ... is the spread operator in js/ts and is the same as writing { name: item.name, description: item.description }
    const newBranch: Branch = { id: Date.now().toString(), ...branch };

    // adding the new item to the global scoped array of Items
    branches.push(newBranch);
    return newBranch;
};

export const serviceUpdateBranches = async (
    id: string,
    branchUpdate: Branch
): Promise<Branch> => {
    // retieve the item's index from the items array by comparing the item ids
    const index: number = branches.findIndex((i) => i.id === id);
    // if the index is not found we expects a -1
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    // assign the new value of the found index
    branches[index] = {   ...branchUpdate, id: branches[index].id };

    return branches[index];
};

export const serviceDeleteBranches = async (id: string): Promise<void> => {
    const index: number = branches.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    // remove the item from the Item array, start the delete form the index and only delete 1 index
    branches.splice(index, 1);
};