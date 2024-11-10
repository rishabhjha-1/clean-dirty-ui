interface NotificationProps {
  count: number;
}

const Notification = ({ count }: NotificationProps) => {
  return (
    <div className="relative md:top-0 -top-10">
      {/* Bell Icon */}
      <span className="text-xl cursor-pointer" role="img" aria-label="Notification Bell">
        🔔
      </span>
      {/* Notification Badge */}
      {count > 0 && (
        <div className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
          {count}
        </div>
      )}
    </div>
  );
};

export default Notification;
