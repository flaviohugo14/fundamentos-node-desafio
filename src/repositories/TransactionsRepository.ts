import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const outcomes = this.transactions.map(transaction =>
      transaction.type === 'outcome' ? transaction.value : 0,
    );

    const sumOutcomes = outcomes.reduce((total, outcome) => total + outcome, 0);

    const incomes = this.transactions.map(transaction =>
      transaction.type === 'income' ? transaction.value : 0,
    );

    const sumIncomes = incomes.reduce((total, outcome) => total + outcome, 0);

    const total = sumIncomes - sumOutcomes;

    const balance = {
      income: sumIncomes,
      outcome: sumOutcomes,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
