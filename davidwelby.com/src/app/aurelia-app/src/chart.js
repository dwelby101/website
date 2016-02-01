export class Chart {
    heading = 'Welcome to my Chart App!';
    firstName = 'Dave';
    lastName = 'Welby';

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    submit() {
        alert(`Welcome, ${this.fullName}!`);
    }
}

  