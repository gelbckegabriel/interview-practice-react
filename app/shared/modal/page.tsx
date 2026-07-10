import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function ModalComponent({
  maxWidth,
  isOpen,
  setIsOpen,
  title,
  children,
  closeText = "Close",
}: {
  maxWidth: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: ReactNode;
  closeText?: string;
}) {
  return (
    <>
      <Dialog open={isOpen} className="relative z-10 focus:outline-none" onClose={() => setIsOpen(!isOpen)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className={`w-full ${maxWidth} rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0`}
            >
              {/* Modal Title */}
              <DialogTitle className="text-2xl text-white text-shadow-lg font-bold">{title}</DialogTitle>

              {/* Modal Content / Children */}
              <div className="mt-4">{children}</div>

              {/* Modal Close Button */}
              <div className="mt-10 w-full flex justify-center">
                <Button
                  className="cursor-pointer rounded-md bg-slate-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-slate-600 data-open:bg-slate-700"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {closeText}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
