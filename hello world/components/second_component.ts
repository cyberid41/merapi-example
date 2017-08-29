import { Component, ILogger, IConfigReader } from 'merapi';

export default class SecondComponent extends Component {
  constructor(
    private logger: ILogger,
    private config: IConfigReader) {
    super();

  }

  add(a: number, b: number) {
    return a + b;
  }
  // start(args: string[]) {
  //   this.logger.log(`${this.config('greeting')} ${args[2]}`);
  // }
}