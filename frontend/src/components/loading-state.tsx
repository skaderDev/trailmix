type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="rounded-xl border border-white/70 bg-white/85 p-5 text-zinc-700 shadow-sm backdrop-blur">
      {message}
    </div>
  );
}
