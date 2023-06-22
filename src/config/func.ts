import bcrypt from "bcryptjs";

function calculPage(totalRecord: number, perPage: number): number {
  let pages = totalRecord / perPage;
  let pageInt = parseInt(pages.toFixed(0));
  return pageInt < pages ? pageInt + 1 : pageInt;
}

function hashPass(pass: string) {
  return bcrypt.hashSync(pass, 12);
}

function checkPass(pass: string) {
  const check = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (pass.length < 6 || !check.test(pass)) {
    return false;
  } else return true;
}
export { calculPage, hashPass, checkPass };
