export default function generateRandomNumber() {
    const RNG = Math.ceil(Math.random() * 20)
    console.log(RNG)
    return RNG;
}