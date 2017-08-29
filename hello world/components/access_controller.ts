import { Component, ILogger, IConfigReader } from 'merapi';

export default class AccessController extends Component {
  constructor(
    private logger: ILogger,
    private config: IConfigReader) {
    super();
  }

  role(role: string[], req: any, res: any, next: any) {
    if (role.find(r => req.query.role == r)) {
      next();
    } else {
      res.status(401).end('unauthorized');
    }
  }
}