import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function ModalComponent({
  isOpen,
  setIsOpen,
  title,
  children,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(!isOpen)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              {/* Modal Title */}
              <DialogTitle className="text-base/7 font-medium text-white">{title}</DialogTitle>

              {/* Modal Content / Children */}
              <div className="mt-4">{children}</div>

              {/* Modal Close Button */}
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-slate-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-slate-600 data-open:bg-slate-700"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
