
const Alert = ({ alert }) => {
  return (
    <div className={`bg-linear-65 ${alert.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'}  text-gray-50 text-center font-bold p-3 rounded-xl uppercase mb-4 text-sm`}>
      {alert.message}
    </div>
  )
}

export default Alert