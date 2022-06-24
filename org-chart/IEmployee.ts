interface IEmployee {
  uniqueId: number;
  name: string;
  subordinates: IEmployee[];
}
