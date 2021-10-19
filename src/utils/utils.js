export const renderLoading = (isLoading,popup, strApprove,formSelector) => {
  const buttonSubmit = popup.querySelector(formSelector);
  buttonSubmit.textContent = isLoading ? "Saving..." : strApprove;
  return buttonSubmit.textContent;
}



