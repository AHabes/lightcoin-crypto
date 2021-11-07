class Account {
  constructor(name) {
    this.name = name;
    this.transactions = [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  get balance() {
    let total = 0;
    for (let tx of this.transactions) {
      total += tx.value;
    }
    return total;
  }

  set balance(amount) {
    this._balance = amount;
  }
}

class Transaction {
  constructor(account, amount) {
    this.account = account;
    this.amount = amount;
  }

  isAllowed() {
    if (this.constructor.name === 'Withdrawal') {
      return this.account.balance >= this.amount;
    }
    return true;

  }

  commit() {
    if (this.isAllowed()) {
      this.account.balance += this.value;
      this.date = new Date();
      this.account.addTransaction(this);
    }
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}


// ------------------------------------------------------------
const account = new Account('investments');
console.log('initial balance', account.balance);


const deposit = new Deposit(account, 10000000);
deposit.commit();
console.log('after deposit', account.balance);
console.log('Transaction 1:', deposit);


const t2 = new Withdrawal(account, 50);
t2.commit();
console.log('Transaction 2:', t2);

const t3 = new Withdrawal(account, 9.99);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Total transactions', account.transactions);
console.log('Balance:', account.balance);
