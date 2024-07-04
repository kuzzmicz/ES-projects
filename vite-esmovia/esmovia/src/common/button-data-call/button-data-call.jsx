import "./button-data-call.css";

export const ButtonDataCall = ({ criteria, emitFunction }) => {
  return (
    <div
      className="button-design"
      onClick={() => emitFunction(criteria)}
    >
      {criteria}
    </div>
  );
};