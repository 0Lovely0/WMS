function StopPropagationWrapper({ children }) {
  const stopEvent = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={stopEvent}
      onWheel={stopEvent}
      onTouchStart={stopEvent}
      onTouchMove={stopEvent}
      onTouchEnd={stopEvent}
      onMouseDown={stopEvent}
      onKeyDown={stopEvent}
    >
      {children}
    </div>
  );
}
export default StopPropagationWrapper