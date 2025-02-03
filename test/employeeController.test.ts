import { Request, Response, NextFunction } from "express";
import * as employeeController from "../src/api/v1/controllers/employeesController";  
import * as employeeService from "../src/api/v1/services/employeesService"; 

jest.mock("../src/api/v1/services/employeesService");  // Mock the service module

describe("Employee Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();  // Clear mocks before each test
        mockReq = { params: {}, body: {}, query: {} };  // Mock the request object
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };  // Mock response methods
        mockNext = jest.fn();  // Mock the next function (middleware)
    });

    describe("getAllEmployees", () => {
        it("should handle successful operation", async () => {
            const mockEmployees = [
                { id: "1", name: "John Doe", role: "Developer", department: "Engineering" },
                { id: "2", name: "Jane Smith", role: "Manager", department: "HR" },
            ];

            (employeeService.serviceGetAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);  // Mock the service method

            await employeeController.controllerGetAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);  // Check if status 200 is returned
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees Retrieved",
                data: mockEmployees,
            });  // Verify the response format
        });

        it("should handle errors in getAllEmployees", async () => {
            const mockError = new Error("Error retrieving employees");
            (employeeService.serviceGetAllEmployees as jest.Mock).mockRejectedValue(mockError);  // Mock the error

            await employeeController.controllerGetAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);  // Ensure that the error is passed to the next middleware
        });
    });

    describe("createEmployee", () => {
        it("should create an employee successfully", async () => {
            const mockEmployee = {
                id: "3",
                name: "Alice Green",
                role: "Designer",
                department: "Design",
            };

            const mockEmployeeData = {
                name: "Alice Green",
                role: "Designer",
                department: "Design",
            };

            (employeeService.serviceCreateEmployee as jest.Mock).mockResolvedValue(mockEmployee);  // Mock service call

            mockReq.body = mockEmployeeData;  // Simulate the request body

            await employeeController.controllerCreateEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(employeeService.serviceCreateEmployee).toHaveBeenCalledWith(mockEmployeeData);  // Verify service method call
            expect(mockRes.status).toHaveBeenCalledWith(201);  // Verify the correct status code for creation
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Created",
                data: mockEmployee,
            });  // Verify the response format
        });

        it("should handle errors in createEmployee", async () => {
            const mockError = new Error("Error creating employee");
            (employeeService.serviceCreateEmployee as jest.Mock).mockRejectedValue(mockError);  // Mock error

            await employeeController.controllerCreateEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);  // Ensure the error is passed to next middleware
        });
    });

    describe("updateEmployee", () => {
        it("should update an employee successfully", async () => {
            const mockId = "1";  // Simulate employee ID
            const mockUpdatedEmployee = {
                id: "1",
                name: "John Doe Updated",
                role: "Senior Developer",
                department: "Engineering",
            };
            const updateData = {
                name: "John Doe Updated",
                role: "Senior Developer",
                department: "Engineering",
            };

            (employeeService.serviceUpdateEmployee as jest.Mock).mockResolvedValue(mockUpdatedEmployee);  // Mock service call

            mockReq.params = { id: mockId };  // Simulate employee ID in the request params
            mockReq.body = updateData;  // Simulate update data in the request body

            await employeeController.controllerUpdateEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(employeeService.serviceUpdateEmployee).toHaveBeenCalledWith(mockId, updateData);  // Verify the service call with params and body
            expect(mockRes.status).toHaveBeenCalledWith(200);  // Verify the correct status code for update
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Updated",
                data: mockUpdatedEmployee,
            });  // Verify response format
        });

        it("should handle errors in updateEmployee", async () => {
            const mockError = new Error("Error updating employee");
            (employeeService.serviceUpdateEmployee as jest.Mock).mockRejectedValue(mockError);  // Mock error

            await employeeController.controllerUpdateEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);  // Ensure the error is passed to next middleware
        });
    });

    describe("deleteEmployee", () => {
        it("should delete an employee successfully", async () => {
            const mockId = "1";  // Simulate employee ID

            (employeeService.serviceDeleteEmployee as jest.Mock).mockResolvedValue(undefined);  // Mock successful deletion

            mockReq.params = { id: mockId };  // Simulate employee ID in the request params

            await employeeController.controllerDeleteEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(employeeService.serviceDeleteEmployee).toHaveBeenCalledWith(mockId);  // Verify the service call
            expect(mockRes.status).toHaveBeenCalledWith(200);  // Verify the correct status code for deletion
            expect(mockRes.send).toHaveBeenCalledWith({ message: "Employee Deleted" });  // Verify the response message
        });

        it("should handle errors in deleteEmployee", async () => {
            const mockError = new Error("Error deleting employee");
            (employeeService.serviceDeleteEmployee as jest.Mock).mockRejectedValue(mockError);  // Mock error

            await employeeController.controllerDeleteEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);  // Ensure the error is passed to next middleware
        });
    });
});
