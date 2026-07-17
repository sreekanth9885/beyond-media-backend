import bcrypt from "bcrypt";

(async () => {
    const hash = await bcrypt.hash("admin@123", 10);
    console.log(hash);
})();