import React from "react";
import { useState } from "react";
import Form from "../form/Form";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import FlowerIcon from "../assets/flower-icon.svg";

export default function Nav() {
  const [isActive, setIsActive] = useState(false);

  function loadForm(e) {
    e.preventDefault();
    if (!isActive) {
      setIsActive(true);
    }
  }

  function closeForm(e) {
    e.preventDefault();
    setIsActive(false);
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <NavLink to="/" className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <h1 className="inline-flex items-center px-1 pt-1 text-lg font-medium text-green-600">
                      Habit-at
                    </h1>
                    <img
                      className="h-8 w-auto"
                      src={FlowerIcon}
                      alt="Habit-at Logo"
                    />
                  </div>
                </NavLink>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <NavLink
                    to="/"
                    className="inline-flex items-center border-b-2 border-green-500 px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/calendar"
                    className="inline-flex items-center border-b-2 border-green-500 px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Calendar
                  </NavLink>
                  <button 
                  onClick={e => loadForm(e)}
                  className="inline-flex items-center border-b-2 border-green-500 px-1 pt-1 text-sm font-medium text-gray-900">
                    New Habit
                  </button>
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <NavLink
                to="/"
                className="block border-l-4 border-green-500 bg-green-50 py-2 pl-3 pr-4 text-base font-medium text-green-700"
              >
                Home
              </NavLink>
              <NavLink
                to="/calendar"
                className="block border-l-4 border-green-500 bg-green-50 py-2 pl-3 pr-4 text-base font-medium text-green-700"
              >
                Calendar
              </NavLink>
              <button 
              onClick={e => loadForm(e)}
              className="block border-l-4 border-green-500 bg-green-50 py-2 pl-3 pr-4 text-base font-medium text-green-700">
                New Habit
              </button>
            </div>
          </Disclosure.Panel>
          <Form isActive={isActive} closeForm={closeForm}/>
        </>
      )}
    </Disclosure>
  );
}
