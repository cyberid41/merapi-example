import { Component, ILogger, IConfigReader } from 'merapi';

export default class FirstComponent extends Component {
  constructor(
    private logger: ILogger,
    private config: IConfigReader,
    private secondComponent: { add(a: number, b: number): number }
  ) {
    super();
  }
  start(args: string[]) {
    let c = this.secondComponent.add(1, 2);
    this.logger.log(c);
    this.logger.log(`${this.config('greeting')} ${args[2]}`);
  }

}