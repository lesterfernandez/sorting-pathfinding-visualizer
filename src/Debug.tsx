export default () => {
  let dragging = false;
  let placing = false;
  const processed = new Set<string>();

  const print = (e: React.PointerEvent<HTMLDivElement>) => {
    document.getElementById(
      "status"
    )!.innerText = `${e.type} , dragging:${dragging} ${processed.size} placing:${placing} id:${e.currentTarget.id}`;
  };

  const pointerOver = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    print(e);
    if (!dragging || processed.has(target.id)) return;
    setBlock(target);
    processed.add(target.id);
    print(e);
  };

  const pointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    placing = isBlockEmpty(target);
    dragging = true;
    processed.add(target.id);
    print(e);
    setBlock(target);
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
  };

  function setBlock(element: HTMLDivElement) {
    element.style.background = placing ? "green" : "white";
  }

  function isBlockEmpty(element: HTMLDivElement) {
    return element.style.background === "white";
  }

  const disableDrawing = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget && e.type === "pointerleave") return;
    if (!dragging) return;
    document.getElementById("disabled")!.innerText = `${e.type} + ${new Date().getMilliseconds()}`;
    dragging = false;
    processed.clear();
  };

  return (
    <>
      <p id="disabled"></p>
      <p id="status">
        dragging:{dragging}, {processed.size}, placing:{placing}
      </p>
      <main
        onPointerUp={disableDrawing}
        onPointerCancel={disableDrawing}
        onPointerLeave={disableDrawing}
        id="main"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 50px)",
          userSelect: "none",
          touchAction: "none",
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          KhtmlUserSelect: "none",
          MozUserSelect: "none",
        }}
      >
        {Array.from({ length: 200 }, (_, i) => (
          <div
            id={`${i}`}
            key={i}
            style={{
              background: "white",
              width: "50px",
              height: "50px",
              outline: "black solid 1px",
              userSelect: "none",
              touchAction: "none",
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              KhtmlUserSelect: "none",
              MozUserSelect: "none",
            }}
            onPointerOver={pointerOver}
            onPointerDown={pointerDown}
            // onPointerLeave={e => e.stopPropagation()}
          ></div>
        ))}
      </main>
    </>
  );
};
