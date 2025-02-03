import { Request, Response, NextFunction } from 'express';
import * as branchController from "../src/api/v1/controllers/branchController"; 
import * as branchService from "../src/api/v1/services/branchService"; 

// Mock the service module
jest.mock("../src/api/v1/services/branchService");

describe('Branches Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
    mockReq = {
      params: {},
      body: {},
      query: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(), // Mock the status method for chainable calls
      json: jest.fn(), // Mock json response
      send: jest.fn(), // Mock send response
    };
    mockNext = jest.fn(); // Mock next middleware function
  });

  describe('GET /api/v1/branches', () => {
    it('should call getAllBranches controller', async () => {
      // Arrange: mock the service method to return a successful response
      const mockBranches = [
        { id: '1', name: 'Branch 1', address: '123 Street', phone: '1234567890' },
        { id: '2', name: 'Branch 2', address: '456 Avenue', phone: '0987654321' },
      ];
      (branchService.getAllBranches as jest.Mock).mockResolvedValue(mockBranches);

      // Act: Call the controller method with the mock request, response, and next function
      await branchController.getAllBranches(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the service method was called
      expect(branchService.getAllBranches).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200); // Expected status code
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Branches Retrieved',
        data: mockBranches,
      }); // Check if the correct response was sent
    });

    it('should handle errors in getAllBranches controller', async () => {
      // Arrange: mock the service method to reject with an error
      const mockError = new Error('Error retrieving branches');
      (branchService.getAllBranches as jest.Mock).mockRejectedValue(mockError);

      // Act: Call the controller method
      await branchController.getAllBranches(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the next function is called with the error
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('POST /api/v1/branches', () => {
    it('should call createBranch controller', async () => {
      // Arrange: mock the service method to return a created branch
      const mockBranch = { id: '3', name: 'New Branch', address: '789 Road', phone: '1122334455' };
      (branchService.createBranch as jest.Mock).mockResolvedValue(mockBranch);

      // Act: Call the controller method with the mock request, response, and next function
      mockReq.body = { name: 'New Branch', address: '789 Road', phone: '1122334455' }; // Simulate incoming data
      await branchController.createBranch(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the service method was called with the correct arguments
      expect(branchService.createBranch).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201); // Expected status for successful creation
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Branch Created',
        data: mockBranch,
      });
    });

    it('should handle errors in createBranch controller', async () => {
      // Arrange: mock the service method to reject with an error
      const mockError = new Error('Error creating branch');
      (branchService.createBranch as jest.Mock).mockRejectedValue(mockError);

      // Act: Call the controller method
      await branchController.createBranch(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the next function is called with the error
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('PUT /api/v1/branches/:id', () => {
    it('should call updateBranch controller', async () => {
      // Arrange: mock the service method to return the updated branch
      const updatedBranch = { id: '1', name: 'Updated Branch', address: '123 Updated Street', phone: '54321' };
      (branchService.updateBranch as jest.Mock).mockResolvedValue(updatedBranch);

      // Act: Call the controller method with mock request, response, and next function
      mockReq.params = { id: '1' }; // Simulate the branch ID in params
      mockReq.body = { name: 'Updated Branch', address: '123 Updated Street', phone: '54321' }; // Simulate incoming data
      await branchController.updateBranch(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the service method was called with the correct arguments
      expect(branchService.updateBranch).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Branch Updated',
        data: updatedBranch,
      });
    });

    it('should handle errors in updateBranch controller', async () => {
      // Arrange: mock the service method to reject with an error
      const mockError = new Error('Error updating branch');
      (branchService.updateBranch as jest.Mock).mockRejectedValue(mockError);

      // Act: Call the controller method
      await branchController.updateBranch(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the next function is called with the error
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('DELETE /api/v1/branches/:id', () => {
    it('should call deleteBranch controller', async () => {
      // Arrange: mock the service method to resolve the deletion
      const mockId = '1'; // Simulate the branch ID to delete
      (branchService.deleteBranch as jest.Mock).mockResolvedValue(undefined);

      // Act: Call the controller method with mock request, response, and next function
      mockReq.params = { id: mockId };
      await branchController.deleteBranch(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the service method was called with the correct arguments
      expect(branchService.deleteBranch).toHaveBeenCalledWith(mockId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Branch Deleted' });
    });

    it('should handle errors in deleteBranch controller', async () => {
      // Arrange: mock the service method to reject with an error
      const mockError = new Error('Error deleting branch');
      (branchService.deleteBranch as jest.Mock).mockRejectedValue(mockError);

      // Act: Call the controller method
      await branchController.deleteBranch(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the next function is called with the error
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
