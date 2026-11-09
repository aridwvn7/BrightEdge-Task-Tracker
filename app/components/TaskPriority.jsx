
const TaskPriority = ({ value, onChange }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Task Priority
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3
         text-sm text-slate-800 outline-none transition focus:border-green-500 
         focus:ring-2 focus:ring-green-100"
      >
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>
    </div>
  );
};

export default TaskPriority;
