let number;
number = process.argv.slice(2)[0];
let flag = true;
for (let i = 2; i * i <= number; i++) {
    if (number % i == 0) {
        flag = false;
        break;
    }

}
if (flag == false) {
    console.log(number, "is not prime");

} else console.log(number, "is prime");