import { Request, Response, NextFunction } from 'express';
import { IssueService } from 'src/services';
import { createIssueSchema } from 'src/validators';
import { ApiError, ApiSuccess } from 'src/utils';
import Logger from 'src/utils/Logger';

class IssueController {
  private issueService: IssueService;

  constructor() {
    this.issueService = new IssueService();
  }

  public createIssue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = createIssueSchema.validate(req.body, { abortEarly: false });

      if (error) {
        const validationErrors = error.details.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        throw new ApiError(400, 'Validation Error', validationErrors);
      }

      // print the object
      Logger.info(value);

      const issue = await this.issueService.createIssue(value.title, value.description);
      res.status(201).json(new ApiSuccess(issue, 'Issue created successfully'));
    } catch (err) {
      next(err);
    }
  };

  public readIssue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = createIssueSchema.validate(req.body, { abortEarly: false });

      if (error) {
        const validationErrors = error.details.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        throw new ApiError(400, 'Validation Error', validationErrors);
      }

      // print the object
      Logger.info(value);

      const issue = await this.issueService.createIssue(value.title, value.description);
      res.status(201).json(new ApiSuccess(issue, 'Issue created successfully'));
    } catch (err) {
      next(err);
    }
  };

  public updateIssue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = createIssueSchema.validate(req.body, { abortEarly: false });

      if (error) {
        const validationErrors = error.details.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        throw new ApiError(400, 'Validation Error', validationErrors);
      }

      // print the object
      Logger.info(value);

      const issue = await this.issueService.createIssue(value.title, value.description);
      res.status(201).json(new ApiSuccess(issue, 'Issue created successfully'));
    } catch (err) {
      next(err);
    }
  };

  public deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = createIssueSchema.validate(req.body, { abortEarly: false });

      if (error) {
        const validationErrors = error.details.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        throw new ApiError(400, 'Validation Error', validationErrors);
      }

      // print the object
      Logger.info(value);

      const issue = await this.issueService.createIssue(value.title, value.description);
      res.status(201).json(new ApiSuccess(issue, 'Issue created successfully'));
    } catch (err) {
      next(err);
    }
  };
}

export default new IssueController();
