export class DraftAction {
  player: string;
  action: string;
  state: string = 'inactivePlayer';

  private toggleState = function () {
    this.state = this.state === 'activePlayer' ? 'inactivePlayer' : 'activePlayer';
  }
}
