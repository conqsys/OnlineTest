import { OnlineTestPage } from './app.po';

describe('online-test App', function() {
  let page: OnlineTestPage;

  beforeEach(() => {
    page = new OnlineTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
