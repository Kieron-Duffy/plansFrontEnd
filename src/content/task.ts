interface TaskContent {
  category: string;
  title: string;
  description: string;
}

export const tasks: TaskContent[] = [
  {
    category: 'UNDERSTAND_BUDGET',
    title: 'Understand your budget',
    description:
      'Start by comparing your monthly take-home income with your regular spending, including bills, food, travel and any debt repayments. Allow for occasional expenses and keep some money aside for unexpected costs. This can help you work out how much you could comfortably save towards your first home each month.',
  },
  {
    category: 'SAVE_FOR_DEPOSIT',
    title: 'Save for a deposit',
    description:
      'You will typically need a deposit of at least 5% to 10% of the property price, depending on the mortgage and your circumstances. For a £200,000 home, that would be £10,000 to £20,000. A larger deposit may give you access to more mortgage options. Remember to budget separately for legal fees, moving costs and any property taxes that apply.',
  },
];

export function getTaskContent(category: string): TaskContent | undefined {
  return tasks.find((task) => task.category === category);
}
