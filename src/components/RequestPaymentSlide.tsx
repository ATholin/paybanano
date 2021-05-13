import { Dialog, Listbox, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React, {
  forwardRef,
  Fragment,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import UserContext from "../contexts/UserContext";
import classNames from "../lib/classNames";
import { currencySymbols } from "../lib/currency";

const RequestPaymentSlide = forwardRef((props, ref) => {
  const { currency, requestAmount, setRequestAmount, setCurrency } = useContext(UserContext);
  const [open, setOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    setOpen() {
      setOpen(true);
    },
  }));

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 overflow-hidden"
        open={open}
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      Request Payment
                    </Dialog.Title>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    <div>
                      <label className="block mt-4 text-sm font-medium text-gray-700">
                        Amount ({currency})
                      </label>
                      <input
                        type="number"
                        name="amount"
                        placeholder={`Request Amount (${currency})`}
                        value={requestAmount}
                        onChange={(e) =>
                          setRequestAmount(e.target.value)
                        }
                        className="mt-1 form-input relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <Listbox
                        value={currency}
                        onChange={setCurrency}
                      >
                        {({ open }) => (
                          <>
                            <Listbox.Label className="block mt-4 text-sm font-medium text-gray-700">
                              Currency
                            </Listbox.Label>
                            <div className="mt-1 relative">
                              <Listbox.Button disabled className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span className="flex items-center">
                                  <span className="ml-2 block truncate">
                                    {currency}
                                  </span>
                                </span>
                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                  <SelectorIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options
                                  static
                                  className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                >
                                  {currencySymbols.map((c, index) => (
                                    <Listbox.Option
                                      key={index}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "text-white bg-indigo-600"
                                            : "text-gray-900",
                                          "cursor-default select-none relative py-2 pl-2 pr-9"
                                        )
                                      }
                                      value={c}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <div className="flex items-center">
                                            <span
                                              className={classNames(
                                                selected
                                                  ? "font-semibold"
                                                  : "font-normal",
                                                "ml-3 block truncate"
                                              )}
                                            >
                                              {c}
                                            </span>
                                          </div>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? "text-white"
                                                  : "text-indigo-600",
                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                              )}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                    {
                      (Number(requestAmount) && Number(requestAmount) > 0) ? (
                        <Link href="/payment">
                          <a className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-md px-4 py-2 text-base font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                            Request
                      </a>
                        </Link>
                      ) : (
                        <span className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-md px-4 py-2 text-base font-medium text-gray-600 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm cursor-not-allowed">
                          Request
                        </span>
                      )
                    }

                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
});

export default RequestPaymentSlide;
