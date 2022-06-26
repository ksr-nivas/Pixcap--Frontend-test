// Import stylesheets
import { EmployeeOrgApp } from './org-chart/EmployeeOrgApp';
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');

const ceo: IEmployee = {
  name: 'Mark Zuckerberg',
  uniqueId: 1,
  subordinates: [
    {
      name: 'Sarah Donald',
      uniqueId: 2,
      subordinates: [
        {
          name: 'Cassandra',
          uniqueId: 3,
          subordinates: [],
        },
      ],
    },
    {
      name: 'Tyler Simpson',
      uniqueId: 4,
      subordinates: [
        {
          name: 'Harry Tobs',
          uniqueId: 5,
          subordinates: [],
        },
      ],
    },
  ],
};
const app = new EmployeeOrgApp(ceo);

console.log(app);

app.move(5, 3);

appDiv.innerHTML = `<h3>${JSON.stringify(app)}</h3>`;
