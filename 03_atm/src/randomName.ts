
function RandomName() {
  const maleNames = ["Muhammad", "Ali", "Omar", "Ahmed", "Ibrahim", "Yusuf", "Mustafa", "Hassan", "Abdullah", "Khalid"];
  const femaleNames = ["Fatima", "Aisha", "Khadija", "Maryam", "Zainab", "Safia", "Nadia", "Leila", "Sana", "Amina"];
  const lastNames = ["Abdul", "Hassan", "Ali", "Khan", "Ahmed", "Mohammed", "Hussain", "Omar", "Ibrahim", "Rahman"];

  const randomMaleName = maleNames[Math.floor(Math.random() * maleNames.length)];
  const randomFemaleName = femaleNames[Math.floor(Math.random() * femaleNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  // Randomly decide whether to use a male or female name
  const isMale = Math.random() < 0.5;
  if (isMale) {
    return randomMaleName + " " + randomLastName;
  } else {
    return randomFemaleName + " " + randomLastName;
  }
}

export default RandomName