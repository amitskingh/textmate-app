// Define the regex
const regex = /^[a-zA-Z0-9\s]+$/

const validateFilename = (fileName) => {
  if (fileName.length < 1) {
    return { validate: false, error: "Filename cannot be empty." }
  } 
  
  
  if (fileName.length > 50) {
    return {
      validate: false,
      error: "Filename can be at most 50 character long.",
    }
  }

  const validate = regex.test(fileName)

  if (!validate) {
    return {
      validate: false,
      error: "Filename must contain character, numeric and spaces only.",
    }
  }

  return { validate: true, error: "" }
}

export { validateFilename }
