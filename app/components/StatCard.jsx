
const StatCard = ({ title, value, icon: Icon, iconColor, iconBg }) => {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/90 p-6 shadow-md shadow-green-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-2xl font-bold text-slate-800">
            {value}
          </h3>
        </div>

        <div className={`rounded-xl p-3 ${iconBg}`}>
          <Icon size={23} className={iconColor} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
