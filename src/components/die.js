export default function Die(props) {
  return (
    <div
      onClick={() => props.changeHeld(props.element.id)}
      className={`die-face ${props.element.isHeld ? "green" : ""}`}
    >
      <h2 className="die-value">{props.element.value}</h2>
    </div>
  );
}
