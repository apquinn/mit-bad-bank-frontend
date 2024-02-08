export function findCurrentAttribute(attribute, ctx) {
  let selectedItem = "";
  ctx.users.forEach((user) => {
    if (user.type === "user" && user.loggedin === true) {
      if (attribute === "name") selectedItem = user.name;
      else if (attribute === "balance") selectedItem = user.balance;
    }
  });
  if (selectedItem !== "") return selectedItem;
  else return "";
}

export function findEmail(email, ctx) {
  let found = false;
  ctx.users.forEach((user) => {
    if (user.type === "user" && user.email === email) {
      found = true;
    }
  });
  return found;
}
