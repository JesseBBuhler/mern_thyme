function LogoutConfirmation({ logout, setConfirmLogout }) {
  const cancel = () => {
    setConfirmLogout(false);
  };

  const confirm = () => {
    logout();
    setConfirmLogout(false);
  };
  return (
    <div className="popup">
      <div className="popup-prompt">Are you sure?</div>
      <div className="popup-options">
        <button onClick={cancel}>cancel</button>
        <span onClick={confirm}>Logout</span>
      </div>
    </div>
  );
}

export default LogoutConfirmation;
