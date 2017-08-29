import { Component, ILogger, IConfigReader } from 'merapi';

export default class Controller extends Component {
  constructor(
    private logger: ILogger,
    private config: IConfigReader) {
    super();

  }

  getHello(req: any, res: any) {
    res.send('Hello world');
  }

  helloWorld(req: any, res: any) {
    res.json({ method: req.method, url: req.baseUrl });
  }
}