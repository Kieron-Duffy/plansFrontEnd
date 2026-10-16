interface TaskContent {
  category: string;
  title: string;
  description: string;
}

export const tasks: TaskContent[] = [
  {
    category: 'FIRST_HOME_COST',
    title: 'Understand the costs of buying your first home',
    description:
      'Explore the costs involved in buying your first home, from your deposit and mortgage fees to legal fees, surveys and moving costs. Budgeting for these early can help you understand how much you need to save.',
  },
  {
    category: 'STAMP_DUTY',
    title: 'Check your property tax costs',
    description:
      'Find out whether you will need to pay tax when buying your home. The amount depends on the property price, where in the UK you are buying and your circumstances. Check whether you qualify for first-time buyer relief.',
  },
  {
    category: 'CREATE_DEPOSIT_GOAL',
    title: 'Set your deposit savings goal',
    description:
      'Set a deposit target based on the price of the home you would like to buy. Review what you have already saved and work out how much you could put aside each month, keeping other home-buying costs separate.',
  },
  {
    category: 'SPENDING_INSIGHTS',
    title: 'Review your spending',
    description:
      'Take a look at your regular spending to understand where your money goes. Reviewing bills, subscriptions and everyday purchases can help you identify opportunities to save towards your first home.',
  },
  {
    category: 'PROTECTION_NEEDS_FINDER',
    title: 'Explore your protection needs',
    description:
      'Consider how you would cover your mortgage and essential bills if your circumstances changed. Explore whether life insurance, critical illness cover or income protection could help meet your needs.',
  },
  {
    category: 'GIFTED_DEPOSITS',
    title: 'Understand gifted deposits',
    description:
      'Learn how money gifted by family or others could contribute towards your deposit. Lenders may have different requirements, including evidence of where the money came from and confirmation that it does not need to be repaid.',
  },
];

export function getTaskContent(category: string): TaskContent | undefined {
  return tasks.find((task) => task.category === category);
}
