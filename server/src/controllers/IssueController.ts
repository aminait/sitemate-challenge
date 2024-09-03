import { Request, Response, NextFunction } from 'express';
import { IssueService } from 'src/services';
import { updateIssueSchema, createIssueSchema } from 'src/validators';
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
      const id = req.params.id;
      const issue = await this.issueService.readIssue(id);

      if (!issue) {
        throw new ApiError(404, 'Issue not found');
      }

      res.status(200).json(new ApiSuccess(issue));
    } catch (err) {
      next(err);
    }
  };

  public updateIssue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const { error, value } = updateIssueSchema.validate(req.body);

      if (error) {
        const validationErrors = error.details.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        throw new ApiError(400, 'Validation Error', validationErrors);
      }

      const updatedIssue = await this.issueService.updateIssue(id, value);

      if (!updatedIssue) {
        throw new ApiError(404, 'Issue not found');
      }

      res.status(200).json(new ApiSuccess(updatedIssue, 'Issue updated'));
    } catch (err) {
      next(err);
    }
  };

  public deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const deletedIssue = await this.issueService.deleteIssue(id);

      if (!deletedIssue) {
        throw new ApiError(404, 'Issue not found');
      }

      res.status(200).json(new ApiSuccess(null, 'Issue deleted.'));
    } catch (err) {
      next(err);
    }
  };
}

export default new IssueController();
