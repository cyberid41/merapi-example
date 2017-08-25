import { Component, ILogger, IConfigReader } from 'merapi';

export default class FirstComponent extends Component {
  constructor(
    private logger: ILogger,
    private config: IConfigReader) {
    super();

  }
  start(args: string[]) {
    this.logger.log(`${this.config('greeting')} ${args[2]}`);
  }
}