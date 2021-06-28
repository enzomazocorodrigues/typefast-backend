module.exports = app => {
    /// EXISTSORERROR
    const existsOrError = (value, err) => {
      if (!value) {
        throw err
      };
  
      if (Array.isArray(value) && value.length === 0) {
        throw err
      };
  
      if (typeof value === 'string' && !value.trim()) {
        throw err
      };
    };
  
    /// NOTEXISTSORERROR
    const notExistsOrError = (value, err) => {
      try {
        existsOrError(value, err);
      } catch (err) {
        return;
      };
  
      throw err;
    }
  
    /// EQUALSORERROR
    const equalsOrError = (a, b, err) => {
      if (a !== b) {
        throw err;
      };
    };
  
    /// NOTEQUALSORERROR
    const notEqualsOrError = (a, b, err) => {
      if (a === b) {
        throw err;
      };
    };
  
    return { existsOrError, notExistsOrError, equalsOrError, notEqualsOrError };
  };
  