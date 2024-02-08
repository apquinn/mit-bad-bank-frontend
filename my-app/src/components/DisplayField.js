export default function DisplayAccountField({
  type,
  id,
  value,
  name,
  handleChange,
}) {
  return (
    <>
      <label htmlFor={id}>{name}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={"Enter " + id}
        value={value}
        onChange={handleChange}
      />
      <br />
    </>
  );
}
