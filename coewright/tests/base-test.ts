import { test as applitoolsBaseTestFixture } from '@applitools/eyes-playwright/fixture';
import { test as baseTestFixture } from '@playwright/test';

import { InterstellarHomePage } from '../pages/home.page';
import { InterstellarAboutUsPage } from '../pages/aboutUs.page';
import { InterstellarProblemPage } from '../pages/problem.page';
import { InterstellarWebviewPage } from '../pages/webview';
import { ButtonPage } from '../pages/examples/button.page';
import { TextFieldPage } from '../pages/examples/textField.page';
import { CheckboxPage } from '../pages/examples/checkbox.page';
import { AccordionPage } from '../pages/examples/accordion.page';
import { DropdownPage } from '../pages/examples/dropdown.page';
import { RadioButtonGroupPage } from '../pages/examples/radioButtonGroup.page';
import { CheckboxGroupPage } from '../pages/examples/checkboxGroup.page';
import { SelectPage } from '../pages/examples/select.page';
import { SwitchPage } from '../pages/examples/switch.page';
import { TabsPage } from '../pages/examples/tabs.page';
import { TextInputPage } from '../pages/examples/textInput.page';
import { TextAreaPage } from '../pages/examples/textArea.page';
import { TextAreaFieldPage } from '../pages/examples/textAreaField.page';
import { TooltipPage } from '../pages/examples/tooltip.page';
import { NumberFieldPage } from '../pages/examples/numberField.page';
import { PassCodeFieldPage } from '../pages/examples/passCodeField.page';
import { PostcodePage } from '../pages/examples/postcode.page';
import { DateFieldPage } from '../pages/examples/dateField.page';
import { MemorableDateFieldPage } from '../pages/examples/memorableDateField.page';
import { GenderFieldPage } from '../pages/examples/genderField.page';
import { CurrencyFieldPage } from '../pages/examples/currencyField.page';
import { ConfirmationPage } from '../pages/examples/confirmation.page';
import { DisplayTextPage } from '../pages/examples/displayText.page';
import { HeadingPage } from '../pages/examples/heading.page';
import { ParagraphPage } from '../pages/examples/paragraph.page';
import { LinkPage } from '../pages/examples/link.page';
import { IconPage } from '../pages/examples/icon.page';
import { ListPage } from '../pages/examples/list.page';
import { NotificationPage } from '../pages/examples/notification.page';
import { SpinnerPage } from '../pages/examples/spinner.page';
import { DialogPage } from '../pages/examples/dialog.page';
import { ErrorSummaryPage } from '../pages/examples/errorSummary.page';
import { SummaryBoxPage } from '../pages/examples/summaryBox.page';
import { TablePage } from '../pages/examples/table.page';

// Set a global timeout for element visibility checks, in milliseconds
globalThis.ELEMENT_TIMEOUT = 5000;

// TODO: ok, the name is not that great, but that's all I managed to come up with
const actualFixture =
  process.env.APPLITOOLS_RUN?.trim().toLowerCase() === 'true'
    ? applitoolsBaseTestFixture
    : baseTestFixture;

export const test = actualFixture.extend<{
  interstellarHomePage: InterstellarHomePage;
  interstellarAboutUsPage: InterstellarAboutUsPage;
  interstellarProblemPage: InterstellarProblemPage;
  interstellarWebviewPage: InterstellarWebviewPage;
  buttonPage: ButtonPage;
  textFieldPage: TextFieldPage;
  checkboxPage: CheckboxPage;
  accordionPage: AccordionPage;
  dropdownPage: DropdownPage;
  radioButtonGroupPage: RadioButtonGroupPage;
  checkboxGroupPage: CheckboxGroupPage;
  selectPage: SelectPage;
  switchPage: SwitchPage;
  tabsPage: TabsPage;
  textInputPage: TextInputPage;
  textAreaPage: TextAreaPage;
  textAreaFieldPage: TextAreaFieldPage;
  tooltipPage: TooltipPage;
  numberFieldPage: NumberFieldPage;
  passCodeFieldPage: PassCodeFieldPage;
  postcodePage: PostcodePage;
  dateFieldPage: DateFieldPage;
  memorableDateFieldPage: MemorableDateFieldPage;
  genderFieldPage: GenderFieldPage;
  currencyFieldPage: CurrencyFieldPage;
  confirmationPage: ConfirmationPage;
  displayTextPage: DisplayTextPage;
  headingPage: HeadingPage;
  paragraphPage: ParagraphPage;
  linkPage: LinkPage;
  iconPage: IconPage;
  listPage: ListPage;
  notificationPage: NotificationPage;
  spinnerPage: SpinnerPage;
  dialogPage: DialogPage;
  errorSummaryPage: ErrorSummaryPage;
  summaryBoxPage: SummaryBoxPage;
  tablePage: TablePage;
}>({
  interstellarHomePage: async ({ page }, use) => {
    await use(new InterstellarHomePage(page));
  },
  interstellarAboutUsPage: async ({ page }, use) => {
    await use(new InterstellarAboutUsPage(page));
  },
  interstellarProblemPage: async ({ page }, use) => {
    await use(new InterstellarProblemPage(page));
  },
  interstellarWebviewPage: async ({ page }, use) => {
    await use(new InterstellarWebviewPage(page));
  },
  buttonPage: async ({ page }, use) => {
    await use(new ButtonPage(page));
  },
  textFieldPage: async ({ page }, use) => {
    await use(new TextFieldPage(page));
  },
  checkboxPage: async ({ page }, use) => {
    await use(new CheckboxPage(page));
  },
  accordionPage: async ({ page }, use) => {
    await use(new AccordionPage(page));
  },
  dropdownPage: async ({ page }, use) => {
    await use(new DropdownPage(page));
  },
  radioButtonGroupPage: async ({ page }, use) => {
    await use(new RadioButtonGroupPage(page));
  },
  checkboxGroupPage: async ({ page }, use) => {
    await use(new CheckboxGroupPage(page));
  },
  selectPage: async ({ page }, use) => {
    await use(new SelectPage(page));
  },
  switchPage: async ({ page }, use) => {
    await use(new SwitchPage(page));
  },
  tabsPage: async ({ page }, use) => {
    await use(new TabsPage(page));
  },
  textInputPage: async ({ page }, use) => {
    await use(new TextInputPage(page));
  },
  textAreaPage: async ({ page }, use) => {
    await use(new TextAreaPage(page));
  },
  textAreaFieldPage: async ({ page }, use) => {
    await use(new TextAreaFieldPage(page));
  },
  tooltipPage: async ({ page }, use) => {
    await use(new TooltipPage(page));
  },
  numberFieldPage: async ({ page }, use) => {
    await use(new NumberFieldPage(page));
  },
  passCodeFieldPage: async ({ page }, use) => {
    await use(new PassCodeFieldPage(page));
  },
  postcodePage: async ({ page }, use) => {
    await use(new PostcodePage(page));
  },
  dateFieldPage: async ({ page }, use) => {
    await use(new DateFieldPage(page));
  },
  memorableDateFieldPage: async ({ page }, use) => {
    await use(new MemorableDateFieldPage(page));
  },
  genderFieldPage: async ({ page }, use) => {
    await use(new GenderFieldPage(page));
  },
  currencyFieldPage: async ({ page }, use) => {
    await use(new CurrencyFieldPage(page));
  },
  confirmationPage: async ({ page }, use) => {
    await use(new ConfirmationPage(page));
  },
  displayTextPage: async ({ page }, use) => {
    await use(new DisplayTextPage(page));
  },
  headingPage: async ({ page }, use) => {
    await use(new HeadingPage(page));
  },
  paragraphPage: async ({ page }, use) => {
    await use(new ParagraphPage(page));
  },
  linkPage: async ({ page }, use) => {
    await use(new LinkPage(page));
  },
  iconPage: async ({ page }, use) => {
    await use(new IconPage(page));
  },
  listPage: async ({ page }, use) => {
    await use(new ListPage(page));
  },
  notificationPage: async ({ page }, use) => {
    await use(new NotificationPage(page));
  },
  spinnerPage: async ({ page }, use) => {
    await use(new SpinnerPage(page));
  },
  dialogPage: async ({ page }, use) => {
    await use(new DialogPage(page));
  },
  errorSummaryPage: async ({ page }, use) => {
    await use(new ErrorSummaryPage(page));
  },
  summaryBoxPage: async ({ page }, use) => {
    await use(new SummaryBoxPage(page));
  },
  tablePage: async ({ page }, use) => {
    await use(new TablePage(page));
  },
});

/**
 * The below methods, beforeEach and afterEach, can be used
 * in BaseTest rather writing them in your test.spec.file
 */

// test.beforeEach(async ({ }) => {

// });

// test.afterEach(async ({ }) => {

// });

export { expect } from '@playwright/test';
