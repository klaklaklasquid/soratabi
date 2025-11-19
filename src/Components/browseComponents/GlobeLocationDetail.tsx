function GlobeLocationDetail({ data, onClose }: GlobeLocationDetailProps) {
  return (
    <div className="rounded-lg p-4">
      <button onClick={onClose} className="">
        &times;
      </button>
      <h3>{data.name}</h3>

      {data.image && (
        <img
          src={data.image}
          alt={`Image of ${data.name}`}
          className="mt-2.5 h-auto w-full rounded-md"
        />
      )}

      <p>
        <strong>Lat/Lon:</strong> {data.latitude},{data.longitude}
      </p>
      <p>{data.description}</p>
    </div>
  );
}

interface GlobeLocationDetailProps {
  data: LocationsData;
  onClose: () => void;
}

export default GlobeLocationDetail;
