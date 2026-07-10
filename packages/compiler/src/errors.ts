export function getFunnyError(error: any): string {
  const msg = error?.message || String(error);
  const name = error?.name || "Error";

  if (name === "ReferenceError") {
    return `🤷 Bhai, ye variable kidhar hai? Pehle declare to kar!\n💡 Hint: ${msg}`;
  }
  
  if (name === "TypeError") {
    if (msg.includes("not a function")) {
      return `🤡 Oye! Ye function nahi hai, zabardasti mat call kar!\n💡 Hint: ${msg}`;
    }
    if (msg.includes("Assignment to constant variable")) {
      return `🛑 Arre ustad! 'pakka' (const) variable ko dobara kyu badal raha hai?\n💡 Hint: ${msg}`;
    }
    if (msg.includes("Cannot read properties of undefined") || msg.includes("Cannot read properties of null")) {
      return `🕳️ Bhai kis hawa me teer maar raha hai? Variable khali (null/undefined) hai!\n💡 Hint: ${msg}`;
    }
    return `🥴 Ye kya mix-match kar diya? Type galat hai bhaisaab!\n💡 Hint: ${msg}`;
  }

  if (name === "SyntaxError") {
    return `🤦 Bhai kya likh diya? Syntax ki maa-bahan ek kar di!\n💡 Hint: ${msg}`;
  }

  // Lexer errors usually don't have a name property like JS runtime errors
  if (msg.includes("unexpected character")) {
    return `👽 Ye kaunsa alien character likh diya? Samajh nahi aaya!\n💡 Hint: ${msg}`;
  }

  return `💀 Lo ji, kachra ho gaya. Code phat gaya!\n💡 Hint: ${name}: ${msg}`;
}
