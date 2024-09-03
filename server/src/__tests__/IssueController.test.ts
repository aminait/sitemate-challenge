import { Request, Response, NextFunction } from 'express';
import issueController from 'src/controllers/IssueController';
import { IssueService } from 'src/services';
import { ApiError, ApiSuccess } from 'src/utils';

jest.mock('src/services/IssueService');

describe('IssueController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully create an issue', async () => {
    const mockIssue = {
      id: '1',
      title: 'Test Issue',
      description: 'This is a test issue',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    req.body = {
      title: 'Test Issue',
      description: 'This is a test issue',
    };

    (IssueService.prototype.createIssue as jest.Mock).mockResolvedValue(mockIssue);

    await issueController.createIssue(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(new ApiSuccess(mockIssue, 'Issue created successfully'));
  });

  it('should handle validation errors', async () => {
    req.body = {
      title: '',
      description: 'This is a test issue',
    };

    await issueController.createIssue(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      new ApiError(400, 'Validation Error', [{ field: 'title', message: 'Title is required' }]),
    );
  });
});
