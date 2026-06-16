export const getActivePage = (pathname) => {
  if (pathname.startsWith("/create")) return "create";
  if (/^\/notes\/[^/]+\/edit/.test(pathname)) return "editNote";
  return "home";
};
