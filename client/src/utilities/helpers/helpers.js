export const getPathname = (pathname) => {
  let targetPath = "";
  const splitPath = pathname.split("/");
  if (splitPath.includes("places")) {
    targetPath = "places";
  } else if (splitPath.includes("bookings")) {
    targetPath = "bookings";
  } else targetPath = "account";
  return targetPath;
};

export const generateRandomNumber = () => {
  let maxLimit = 100;
  const randomNumber = Math.round(Math.random() * maxLimit);
  return randomNumber;
};
