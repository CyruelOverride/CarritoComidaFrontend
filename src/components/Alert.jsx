import './Alert.css';

function Alert({ mensaje, tipo }) {
  if (!mensaje) return null;
  
  return (
    <div className={`alert alert-${tipo}`}>
      {mensaje}
    </div>
  );
}

export default Alert;

