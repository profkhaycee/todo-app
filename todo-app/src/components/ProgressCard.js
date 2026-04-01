

const ProgressCard = ({ progress }) => {
  return (
    <div className="progress-card">
      <div>
        <h2>Task Done</h2>
        <p>Keep it up</p>
      </div>

      <div className="progress-circle">
        <h1>{progress?.progress || "0/0"}</h1>
      </div>
    </div>
  );
};

export default ProgressCard;