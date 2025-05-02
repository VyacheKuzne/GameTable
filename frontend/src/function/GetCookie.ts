export const GetCookie = (name: string): boolean => {
    const cookieString = document.cookie; // Get the entire cookie string
    if (!cookieString) {
      // If there are no cookies at all, return false
      return false;
    }
  
    const value = `; ${cookieString}`;
    const parts = value.split(`; ${name}=`);
  
    if (parts.length === 2) {
      const token = parts.pop()?.split(';').shift();
      // Return true if token exists and is not empty, otherwise return false
      return !!token; // !! converts to boolean (true if token, false if null/undefined/empty)
    }
  
    console.log(value, typeof(value)); // Leave console.log for debugging purposes.
  
    return false; // Return false if the cookie is not found
  };