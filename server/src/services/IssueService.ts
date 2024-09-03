import { IssueModel, IIssue } from 'src/models';

export class IssueService {
  public async createIssue(title: string, description: string): Promise<IIssue> {
    const issue = new IssueModel({ title, description });
    return issue.save();
  }

  public async readIssue(id: string): Promise<IIssue | null> {
    return IssueModel.findById(id);
  }

  public async updateIssue(id: string, updateData: Partial<IIssue>): Promise<IIssue | null> {
    return IssueModel.findByIdAndUpdate(id, updateData, { new: true }); // to return the entire document with the latest change
  }

  public async deleteIssue(id: string): Promise<IIssue | null> {
    return IssueModel.findByIdAndDelete(id);
  }
}
