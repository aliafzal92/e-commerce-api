const createTokenUser = (user) => {
  return { name: user.name, id: user._id, role: user.role };
}

export default createTokenUser;