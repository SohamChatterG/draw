import { getUser } from "./functions/user";
import { createUser } from "./functions/user";

// Use explicit object structure for public exports
export default {
  user: {
    getUser,
    createUser,
  }
};
