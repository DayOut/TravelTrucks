import CamperCard from "../CamperCard/CamperCard";

export const CamperList = ({ campers }) => {
  if (!Array.isArray(campers)) {
    return <p>No campers available</p>;
  }
  return (
    <ul>
      {campers.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}
    </ul>
  );
};
