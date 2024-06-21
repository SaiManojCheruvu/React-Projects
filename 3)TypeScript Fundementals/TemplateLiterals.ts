interface Car{
    brand: string;
    model: string;
    year: number;
    startEngine(): void;
}
const mycar: Car = {
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    startEngine() {
        console.log(`Starting the engine of ${this.brand} ${this.model}`);
    },
}
mycar.startEngine();
