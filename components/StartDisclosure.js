import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

export default function StartDisclosure() {
  return (
    <div className="w-full py-8">
      <div className="w-full mx-auto bg-white rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-yellow-900 bg-yellow-100 rounded-lg hover:bg-yellow-200 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75">
                <span>What is this?</span>
                <ChevronUpIcon
                  className={`${open ? "transform rotate-180" : ""
                    } w-5 h-5 text-yellow-500`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel static className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  An easy way to accept payments using the amazing potassium-rich cryptocurrency <a target="_blank" href="https://banano.cc" className="underline text-yellow-500">banano</a>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-yellow-900 bg-yellow-100 rounded-lg hover:bg-yellow-200 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75">
                <span>Are any temporary accounts used?</span>
                <ChevronUpIcon
                  className={`${open ? "transform rotate-180" : ""
                    } w-5 h-5 text-yellow-500`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel static className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  No, all transactions are sent directly to the account specified. The application only checks the public account transactions through the public key.
              </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-yellow-900 bg-yellow-100 rounded-lg hover:bg-yellow-200 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75">
                <span>How do you separate payments?</span>
                <ChevronUpIcon
                  className={`${open ? "transform rotate-180" : ""
                    } w-5 h-5 text-yellow-500`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel static className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  Payments are distinguished by the time and the amount paid. It is possible for identical payments to come at the same time, which might cause issues. Depending on your use case, this may or may not be a problem.
              </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div >
  );
}