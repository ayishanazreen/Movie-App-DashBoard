const generateVerificationCode =()=>{
    const randomDigit=Math.random();
    const randomNumber= Math.floor(randomDigit * 9000) + 1000;
    return randomNumber;
};

module.exports={generateVerificationCode};