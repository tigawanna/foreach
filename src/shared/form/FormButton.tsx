import { LoaderElipse } from "../../shared/loaders/Loaders";

interface PlainFormButtonProps {
  isSubmitting: boolean;
  disabled: boolean;
  label?: string;
}

export const PlainFormButton = ({
  disabled,
  isSubmitting,
  label = "Submit",
}: PlainFormButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled || isSubmitting}
      style={{ opacity: disabled ? "20%" : "100%" }}
      className="p-2 w-[60%] md:w-[30%]
            border-2 dark:border border-slate-700 dark:border-slate-400 dark:bg-slate-800
            flex items-center justify-center m-2 rounded-lg 
            hover:shadow-slate-900 dark:hover:shadow-slate-50 
            hover:shadow-lg dark:hover:shadow
            hover:scale-105"
    >
      {isSubmitting ? (
        <LoaderElipse />
      ) : (
        <div
          // style={{backgroundColor:"ButtonHighlight"}}
          className="text-lg font-bold dark:font-normal "
        >
          {label}
        </div>
      )}
    </button>
  );
};
