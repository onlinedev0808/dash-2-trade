import mfkdf from "mfkdf";

const setupMFA = async (password, mfa = false) => {
  let setup: any = {};

  if (mfa) {
    setup = await mfkdf.policy.setup(
      await mfkdf.policy.and(
        await mfkdf.setup.factors.password(password),
        await mfkdf.setup.factors.totp({ label: "Dash2Trade" })
      ),
      { size: 16 }
    );
  } else {
    setup = await mfkdf.policy.setup(
      await mfkdf.setup.factors.password(password),
      { size: 16 }
    );
  }

  return { setup };
};

export default setupMFA;
