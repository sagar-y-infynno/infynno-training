import { Fragment } from 'react';
import { Listbox as ListBox, Transition } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilterMake, changePage, setPage } from '../reducers/carsSlice';

export default function MakeSelect() {
  
  const { cars } = useSelector(state => state);
  const make_list = useSelector((state => state.cars.filter.make));
  const selected = useSelector((state => state.cars.selected_filter.make));
  const dispatch = useDispatch();

  const handleMakeSelect = (selected) => {
    // console.log("make changed : ", selected);
    dispatch(changePage({...cars, selected_filter : {...cars.selected_filter, model: [], make: selected }, exclude: ["make"]})); 
    // dispatch(changePage({...cars, selected_filter : {...cars.selected_filter, make: selected }, exclude: ["make"]})); 
    dispatch(changeFilterMake(selected)); 
    // dispatch(setPage(1));
  };
  
  return (
    <div className="w-72">
      <ListBox value={selected} onChange={handleMakeSelect} multiple>
        <div className="mt-1">
          <ListBox.Button className="make-selector">
            { selected.length === 0 ?
              <span className="block truncate">Select Make</span>
            :
              <span className="block truncate">{selected.map((person) => person.name).join(', ')}</span>
            }
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center mr-[8px]">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.58782 0.745553C0.912214 0.42116 1.43807 0.420873 1.76282 0.744913L4.65262 3.62841C4.84459 3.81997 5.15541 3.81997 5.34738 3.62841L8.23718 0.744914C8.56193 0.420874 9.08779 0.42116 9.41218 0.745553C9.73682 1.0702 9.73682 1.59655 9.41218 1.92119L5.83333 5.50004C5.3731 5.96028 4.6269 5.96028 4.16667 5.50004L0.58782 1.92119C0.263176 1.59655 0.263176 1.0702 0.58782 0.745553Z" fill="#28293D"/>
              </svg>
            </span>
          </ListBox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListBox.Options className="make-options-list">
              {make_list.map((person, personIdx) => (
                <ListBox.Option
                  key={personIdx}
                  className={({ active, selected }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      selected ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        </span>
                      ) : null}
                    </>
                  )}
                </ListBox.Option>
              ))}
            </ListBox.Options>
          </Transition>
        </div>
      </ListBox>
    </div>
  )
}
