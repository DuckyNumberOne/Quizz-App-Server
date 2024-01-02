const checkExistsById = async (schema, id) => {
  try {
    const data = await schema.findById(id);
    return data ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  checkExistsById,
};
