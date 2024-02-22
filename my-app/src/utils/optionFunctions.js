function addOption(selectID, userEmail) {
  var option = document.createElement("OPTION");
  option.setAttribute("value", userEmail);
  var text = document.createTextNode(userEmail);
  option.appendChild(text);

  document.getElementById(selectID).appendChild(option);
}

function removeOptions(selectId) {
  let selectElement = document.getElementById(selectId);
  var i,
    L = selectElement.options.length - 1;
  for (i = L; i >= 0; i--) {
    selectElement.remove(i);
  }
}

export { addOption, removeOptions };
